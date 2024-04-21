// useExchangeRates.ts
import { useEffect, useState } from "react";
import { ICurrencyRates } from "../types/types";

export default function useExchangeRates(from: string) {
  const [ratesFromCurrency, setRatesFromCurrency] = useState<ICurrencyRates[]>();

  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch(`https://api.vatcomply.com/rates?base=${from}`);
      const data = await response.json();
      const formattedData = Object.entries(data.rates).map(([code, rate]) => ({
        code,
        rate: Number(rate),
      }));
      setRatesFromCurrency(formattedData);
    };

    fetchRates();
  }, [from]);

  return ratesFromCurrency;
}