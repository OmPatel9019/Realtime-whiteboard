export type Color = {
    r: number;
    g: number;
    b: number;
};

export type Camera = {
    x: number;
    y: number;
};

export enum LayerType {
    Note,
    Text,
    Ellipse,
    Rectangle,
    Path,
};

export type RectangleLayer = {
    type: LayerType.Rectangle;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
};

export type TextLayer = {
    type: LayerType.Text;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    fill: Color;
};

export type NoteLayer = {
    type: LayerType.Note;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
};

export type StickyNoteLayer = {
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
};

export type Point = {
    x: number;
    y: number;
};

export type XYWH = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type EllipseLayer = {
    type: LayerType.Ellipse;
    x: number;
    y: number;
    width: number;
    height: number;
    fill: Color;
    value?: string;
};

export type PathLayer = {
    type: LayerType.Path;
    x: number;
    y: number;
    width: number;
    height: number;
    path: string;
    fill: Color;
    points?: number[][];
    value?: string;
};

export enum Side {
    Left= 8,
    Right = 4,
    Top = 1,
    Bottom = 2,
};

export type Layer = 
    | RectangleLayer
    | TextLayer
    | NoteLayer
    | EllipseLayer
    | PathLayer;

export type CanvasState= 
| {
    mode: CanvasMode.None;
}
| {
    mode: CanvasMode.Pencil;
}
| {
    mode: CanvasMode.Inserting,
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Note | LayerType.Text;
}
| {
    mode: CanvasMode.Translating,
    origin: Point;
}
| {
    mode: CanvasMode.Resizing,
    initialBounds: XYWH,
    corner: Side;
}
| {
    mode: CanvasMode.SelectionNet,
    origin: Point;
    current: Point;
}
|{ 
    mode: CanvasMode.Pressing,
    origin: Point;
}

export enum CanvasMode {
    None,
    Pressing,
    Pencil,
    Translating,
    Resizing,
    SelectionNet,
    Inserting
}

export type layer = RectangleLayer | TextLayer | NoteLayer | EllipseLayer | PathLayer;