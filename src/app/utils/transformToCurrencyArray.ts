import { Currency } from "../types/types";

export default function transformToCurrencyArray(currenciesObject: { [key: string]: { name: string, symbol: string } }): Currency[] {
    return Object.entries(currenciesObject).map(([code, details]) => ({
      value: code,   
      label: details.name,
      symbol: details.symbol,
    }));
  }