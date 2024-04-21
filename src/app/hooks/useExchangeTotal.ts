// useExchangeTotal.ts
import { useEffect, useState } from "react";
import { ICurrencyRates } from "../types/types";

export default function useExchangeTotal(
  amount: number,
  ratesFromCurrency: ICurrencyRates[] | undefined,
  to: string
) {
  const [exchangeTotal, setExchangeTotal] = useState<number>(0);

  useEffect(() => {
    if (ratesFromCurrency) {
      const filteredRate = ratesFromCurrency.find((rate) => rate.code === to);
      if (filteredRate) {
        setExchangeTotal(filteredRate.rate * amount);
      }
    }
  }, [amount, ratesFromCurrency, to]);

  return exchangeTotal;
}