import React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Camera, Color, Point, Side, XYWH, Layer, PathLayer, LayerType } from "@/types/canvas";

const COLORS = ["#DC2626", "#ff8017", "#059669", "#7C3AED", "#d97178"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
}

export function pointerEventToCanvasPoint(e: React.PointerEvent, camera: Camera) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
};

export function colorTocss(color: Color) {
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`
}

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
};

/**
 * Converts a list of [x, y, pressure?] points into a smooth SVG path string.
 */
export function getSvgPathFromPoints(points: number[][]): string {
  if (points.length < 2) return "";
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const midX = (points[i][0] + points[i + 1][0]) / 2;
    const midY = (points[i][1] + points[i + 1][1]) / 2;
    d += ` Q ${points[i][0]} ${points[i][1]} ${midX} ${midY}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

export function findInterSectingLayers(
  layerIds: string[],
  layers: ReadonlyMap<string, Layer>,
  a: Point,
  b: Point,
) {
  const rect = {
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  };

  const ids = [];
  for (const layerId of layerIds) {
    const layer = layers.get(layerId);
    if (layer == null) {
      continue;
    }
    const { x, y, height, width } = layer;

    if (
      rect.x + rect.width > x &&
      rect.x < x + width &&
      rect.y + rect.height > y &&
      rect.y < y + height
    ) {
      ids.push(layerId);
    }
  }
  return ids;
}

export const getContrastingTextColor = (fill: Color) => {
  const luminance = (0.299 * fill.r + 0.587 * fill.g + 0.114 * fill.b) / 255;
  return luminance > 0.5 ? "#000000ff" : "#000000ff";
}

export const penPointsToPathLayer = (points: number[][], color: Color) : PathLayer => {
  if(points.length < 2) {
    throw new Error("Not enough points to create a path");
  }
 let left = Number.POSITIVE_INFINITY;
 let top = Number.POSITIVE_INFINITY;
 let right = Number.NEGATIVE_INFINITY;
 let bottom = Number.NEGATIVE_INFINITY;

 for(const point of points){
  const [x, y] = point;
  if(x < left) {
    left = x;
  }
  if(y < top) {
    top = y;
  }
  if(x > right) {
    right = x;
  }
  if(y > bottom) {
    bottom = y;
  }
 }

 return {
  type: LayerType.Path,
  x: left,
  y: top,
  width: right - left,
  height: bottom - top,
  fill: color,
  points: points.map(([x, y, pressure]) => [x - left, y - top, pressure])
 };
};

export function getSvgPathFromStroke(stroke: number[][]): string {
  if (!stroke.length) return "";

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    },
    ["M", ...stroke[0], "Q"]
  );

  d.push("Z");
  return d.join(" ");
}
