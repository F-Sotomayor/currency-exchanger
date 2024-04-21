"use client";
import CurrencyInput from "../CurrencyInput/CurrencyInput";
import ExchangeButton from "../../assets/icons/exchange-button.svg";
import Image from "next/image";
import { useState } from "react";
import CurrencyRateInfo from "../CurrencyRateInfo/CurrencyRateInfo";
import CurrencyDisclaimer from "../CurrencyDisclaimer/CurrencyDisclaimer";
import CurrencyLastUpdated from "../CurrencyLastUpdated/CurrencyLastUpdated";
import useExchangeRates from "../../hooks/useExchangeRates";
import useExchangeTotal from "../../hooks/useExchangeTotal";
import "./index.css"

export default function CurrencyExchanger({
  currencies,
}: {
  currencies: Array<{ value: string; label: string; symbol: string }>;
}) {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState<string>("USD");
  const [to, setTo] = useState<string>("EUR");

  const ratesFromCurrency = useExchangeRates(from);
  const exchangeTotal = useExchangeTotal(amount, ratesFromCurrency, to);

  const handleAmountChange = (newValue: number) => setAmount(newValue);

  const handleFromChange = (newCurrency: string) => setFrom(newCurrency);

  const handleToChange = (newCurrency: string) => setTo(newCurrency);

  const handleSwapCurrencies = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const dataFrom = currencies.find((currency) => currency.value === from);
  const dataTo = currencies.find((currency) => currency.value === to);
  const rate = ratesFromCurrency?.find((rates) => rates.code === to);
  return (

    <div className="currency-exchange-container">
      <h1 style={{textAlign: "center"}}>
        {amount} {dataFrom?.label} converts to {exchangeTotal.toFixed(4)} {dataTo?.label}s
      </h1>
      <div className="exchanger-wrapper">
        <div className="inputs-container">
          <div className="amount-wrapper">
          <CurrencyInput
            inputType="number"
            label="Amount"
            inputValue={amount}
            onAmountChange={handleAmountChange}
            currencySymbol={dataFrom?.symbol}
          />
          </div>
       <div className="from-to-wrapper">
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
       </div>
       <div className="rates-container">
       <CurrencyRateInfo
          dataFrom={dataFrom}
          dataTo={dataTo}
          rate={rate?.rate}
        />
        <CurrencyDisclaimer />
       </div>
        <CurrencyLastUpdated
          dataFrom={dataFrom}
          dataTo={dataTo}
          lastUpdated="Dec 15, 2022, 19:17 UTC"
        />
      </div>
    </div>
  );
}
