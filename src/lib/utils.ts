import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind class merger helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Nigerian Currency Formatter
export const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
};

// Input parser (removes commas for math)
export const parseCurrencyInput = (val: string): number => {
  return parseInt(val.replace(/[^0-9]/g, '') || '0');
};