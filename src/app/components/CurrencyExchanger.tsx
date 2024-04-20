"use client";
import { useEffect, useState } from "react";
import CurrencyInput from "./CurrencyInput";
import ExchangeButton from "../assets/icons/exchange-button.svg";
import Image from "next/image";
import { ICurrencyRates } from "../types/types";

export default function CurrencyExchanger({
  currencies,
}: {
  currencies: Array<{ value: string; label: string; symbol: string }>;
}) {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("EUR");
  const [ratesFromCurrency, setRatesFromCurrency] =
    useState<ICurrencyRates[]>();
  const [exchangeTotal, setExchangeTotal] = useState<number>(0);
  const handleFromChange = (newCurrency: string) => {
    setFrom(newCurrency);
  };

  const handleToChange = (newCurrency: string) => {
    setTo(newCurrency);
  };

  const handleTextChange = (newValue: number) => {
    setAmount(newValue); // Correcto para `number`
  };

  useEffect(() => {
    const ratesFromCurrency = async () => {
      await fetch(`https://api.vatcomply.com/rates?base=${from}`)
        .then((response) => response.json())
        .then((data) => {
          const formattedData = Object.entries(data.rates).map(
            ([code, rate]) => ({
              code,
              rate: Number(rate),
            })
          );
          setRatesFromCurrency(formattedData);
        });
    };
    ratesFromCurrency();
  }, [from]);

  useEffect(() => {
    const filteredRate = ratesFromCurrency?.filter(
      (currencies) => currencies.code === to
    );
    if (filteredRate) {
      setExchangeTotal(filteredRate[0].rate * amount);
    }
  }, [amount, ratesFromCurrency, to, from]);

  console.log(exchangeTotal)


  return (
    <div className="exchanger-wrapper">
      <div className="inputs-container">
        <CurrencyInput
          inputType="text"
          label="Amount"
          inputValue={amount}
          onChangeText={handleTextChange}
        />
        <CurrencyInput
          inputType="select"
          label="From"
          currencies={currencies}
          onChangeSelect={handleFromChange}
        />
        <div className="currency-icon">
          <Image src={ExchangeButton} alt="exchange-button" />
        </div>
        <CurrencyInput
          inputType="select"
          label="To"
          currencies={currencies}
          onChangeSelect={handleToChange}
        />
      </div>
    </div>
  );
}
