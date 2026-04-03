import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = ["#DC2626", "#ff8017", "#059669", "#7C3AED", "#d97178"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function connectionIdToColor(connectionId: number):string{
  return COLORS[connectionId % COLORS.length]
}
