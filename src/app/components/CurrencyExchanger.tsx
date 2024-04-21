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

  const handleSwapCurrencies = () => {
    const fromDraft = from;
    const toDraft = to;
    setFrom(toDraft);
    setTo(fromDraft);
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

  const dataFrom = currencies.find((currency) => currency.value === from);
  const dataTo = currencies.find((currency) => currency.value === to);
  const rate = ratesFromCurrency?.find((rates) => rates.code === to);

  return (
    <div className="currency-exchange-container">
      <h1>
        {amount} {dataFrom?.label} to {dataTo?.label} - Convert{" "}
        {dataFrom?.label}s to {dataTo?.label}s
      </h1>
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
            value={from}
          />
          <div className="currency-icon">
            <Image
              src={ExchangeButton}
              alt="exchange-button"
              onClick={handleSwapCurrencies}
            />
          </div>
          <CurrencyInput
            inputType="select"
            label="To"
            currencies={currencies}
            onChangeSelect={handleToChange}
            value={to}
          />
        </div>
        <div className="rates-container">
          <div className="rates-data-container">
            <div className="rate-information">
              <p>1 {dataFrom?.label} =</p>
              <p>
                {rate?.rate} {dataTo?.label}
              </p>
            </div>
            <div className="rate-disclaimer">
              <p>
                1 {from} = {rate?.rate} {to}
              </p>
            </div>
          </div>
          <div className="legal-information">
            <div className="legal-box">
              <div>
                We use the mid-market rate for our Converter. This is for
                informational purposes only. You won’t receive this rate when
                sending money.
              </div>
            </div>
          </div>
        </div>
        <div className="last-updated">
          <p>
            {dataFrom?.label} to {dataTo?.label} conversion — Last updated Dec
            15, 2022, 19:17 UTC
          </p>
        </div>
      </div>
    </div>
  );
}
