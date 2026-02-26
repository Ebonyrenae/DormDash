import { clsx, type ClassValue } from "clsx";

// Provide a minimal local declaration for 'tailwind-merge' to satisfy TypeScript
// when the package doesn't ship its own type definitions.


import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
