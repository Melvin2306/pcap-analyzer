import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Helper function to generate a random color in hex format
export function getRandomColor() {
  // Generate a random color and return as hex
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
