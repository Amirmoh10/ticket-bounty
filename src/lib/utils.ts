import Big from "big.js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

Big.DP = 2;
Big.RM = Big.roundHalfEven;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toCent = (amount: number) =>
  new Big(amount).mul(100).round(2).toNumber();

export const fromCent = (amount: number) =>
  new Big(amount).div(100).round(2).toNumber();

export const toCurrencyFromCent = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(fromCent(amount));
