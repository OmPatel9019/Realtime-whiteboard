"use client"

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import {
    useHistory,
    useCanUndo,
    useCanRedo,
    useSelf,
    useMutation,
    useMyPresence,
    useStorage,
    useOther,
    useOthersMapped
} from "@liveblocks/react";

import React, { useState, useCallback, useMemo } from "react";
import {
    CanvasState,
    CanvasMode,
    Camera,
    Color,
    LayerType,
    Point,
    Layer,
    Side,
    XYWH,
} from "@/types/canvas";

import { CursorPresence } from "./cursor-presence";
import { nanoid } from "nanoid";
import { connectionIdToColor, findInterSectingLayers, pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { Layerpreview } from "./layer-preview";
import { SelectionBox } from "./selection-box";
import { SelectionTools } from "./selection-tools";


const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string;
};

export const Canvas = ({ boardId }: CanvasProps) => {
    const layerIds = useStorage((root) => root.layerIds);
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });

    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 0,
        g: 0,
        b: 0
    });

    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Rectangle | LayerType.Ellipse | LayerType.Note | LayerType.Text,
        position: Point
    ) => {
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LAYERS) {
            return;
        }
        const liveLayerIds = storage.get("layerIds");
        const layerId = nanoid();
        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            width: 100,
            height: 100,
            fill: lastUsedColor,
        } as Layer);

        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({ mode: CanvasMode.None });
    }, [lastUsedColor]);

    const translateSelectedLayer = useMutation((
        { storage, self },
        point: Point,
    ) => {
        if (canvasState.mode !== CanvasMode.Translating) {
            return;
        }

        const offset = {
            x: point.x - canvasState.origin.x,
            y: point.y - canvasState.origin.y,
        };

        const liveLayers = storage.get("layers");
        for (const layerId of self.presence.selection) {
            const layer = liveLayers.get(layerId);
            if (layer) {
                layer.update({
                    x: layer.get("x") + offset.x,
                    y: layer.get("y") + offset.y,
                });
            }
        }

        setCanvasState({ mode: CanvasMode.Translating, origin: point });
    }, [canvasState]);

    // Log our own cursor to the console so we can see it working locally!
    const [myPresence, updateMyPresence] = useMyPresence();

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => (
            {
                x: camera.x - e.deltaX,
                y: camera.y - e.deltaY
            }));
    }, []);

    const unselectLayers = useMutation((
        { self, setMyPresence },
    ) => {
        if(self.presence.selection.length > 0){
            setMyPresence({ selection: [] }, { addToHistory: true });
        }
    }, []);

    const updateSelectionNet = useMutation((
        { storage, setMyPresence },
        current: Point,
        origin: Point,
    ) => {
        if (!layerIds) return;

        const layers = storage.get("layers").toImmutable();
        setCanvasState({
            mode: CanvasMode.SelectionNet,
            origin,
            current,
        })
        const ids = findInterSectingLayers(
            [...layerIds],
            layers,
            origin,
            current,
        );
        setMyPresence({ selection: ids });
    }, [layerIds]);


    const startMultiSelection = useCallback((
        current: Point,
        origin: Point,
    ) => {
        if(Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5){
            setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
        }
    }, []);

    const resizeSelectedLayer = useMutation((
        { storage, self },
        point: Point,
    ) => {
        if (canvasState.mode !== CanvasMode.Resizing) {
            return;
        }

        const bounds = resizeBounds(
            canvasState.initialBounds,
            canvasState.corner,
            point,
        );

        const liveLayers = storage.get("layers");
        const layer = liveLayers.get(self.presence.selection[0]);

        if (layer) {
            layer.update(bounds);
        }
    }, [canvasState]);

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();

        const current = pointerEventToCanvasPoint(e, camera);

        if (canvasState.mode === CanvasMode.Pressing) {
            startMultiSelection(current, canvasState.origin);
        }else if (canvasState.mode === CanvasMode.Translating) {
            translateSelectedLayer(current);
        }else if (canvasState.mode === CanvasMode.Resizing) {
            resizeSelectedLayer(current);
        }else if (canvasState.mode === CanvasMode.SelectionNet) {
           updateSelectionNet(current, canvasState.origin); 
        }

        setMyPresence({ cursor: current });
    }, 
    [
     camera, 
     canvasState, 
     resizeSelectedLayer,
     translateSelectedLayer
    ]);

    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({ cursor: null });
    }, []);

    const onPointerUp = useMutation(({ }, e) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if(
            canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing
        ){
            unselectLayers();
            setCanvasState({ mode: CanvasMode.None });
        } else if (
            canvasState.mode === CanvasMode.Inserting
        ) {
            insertLayer(canvasState.layerType, point);
        } else {
            setCanvasState({ mode: CanvasMode.None });
        }
        history.resume();
    }, [canvasState, camera, history, insertLayer, unselectLayers]);

    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const point = pointerEventToCanvasPoint(e, camera);

        if (
            canvasState.mode === CanvasMode.Inserting
        ) {
            insertLayer(canvasState.layerType, point);
        }
        setCanvasState({ origin: point, mode: CanvasMode.Pressing})
    }, [canvasState.mode, camera, setCanvasState, insertLayer]);

    const selections = useOthersMapped((other) => other.presence.selection);

    const onLayerPointerDown = useMutation(({ self, setMyPresence }, e: React.PointerEvent, layerId: string,) => {
        if (
            canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting
        ) {
            return;
        }
        history.pause();
        e.stopPropagation();

        const point = pointerEventToCanvasPoint(e, camera);

        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection: [layerId] }, { addToHistory: true })
        };
        setCanvasState({ mode: CanvasMode.Translating, origin: point })
    }, [
        setCanvasState,
        camera,
        history,
        canvasState.mode
    ]);

    const onResizeHandlePointerDown = useCallback((
        corner: Side,
        initialBounds: XYWH,
    ) => {
        history.pause();
        setCanvasState({
            mode: CanvasMode.Resizing,
            initialBounds,
            corner,
        });
    }, [history]);

    const layerIdToColorSelection = useMemo(() => {
        const layerIdToColorSelection: Record<string, string> = {};

        for (const user of selections) {
            const [connectionId, selection] = user;

            for (const layerId of selection) {
                layerIdToColorSelection[layerId] = connectionIdToColor(connectionId);
            }
        }

        return layerIdToColorSelection;
    }, [selections]);

    return (
        <main className="h-screen w-full relative bg-neutral-100">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                undo={history.undo}
                redo={history.redo}
                canUndo={canUndo}
                canRedo={canRedo}
            />
            <SelectionTools
                camera={camera}
                setLastUsedColor={setLastUsedColor}
            />
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
                onPointerDown={onPointerDown}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`
                    }}
                >
                    {layerIds?.map((layerId) => (
                        <Layerpreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={layerIdToColorSelection[layerId]}
                        />
                    ))}
                    <SelectionBox
                        onResizeLayerPointerDown={onResizeHandlePointerDown}
                    />
                    {canvasState.mode === CanvasMode.SelectionNet && canvasState.current !== null && (
                        <rect
                            className="fill-blue-500/5 stroke-blue-500 stroke-1 pointer-events-none"
                            x={Math.min(canvasState.origin.x, canvasState.current.x)}
                            y={Math.min(canvasState.origin.y, canvasState.current.y)}
                            width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                            height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                        />
                    )}
                    <CursorPresence />
                </g>
            </svg>
        </main>
    )
}
