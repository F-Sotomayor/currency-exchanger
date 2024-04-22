"use client";

import { ICurrencyInput } from "../../types/types";
import "./index.css";
export default function CurrencyInput({
  inputType,
  label,
  inputValue,
  currencies,
  value,
  onAmountChange,
  onChangeSelect,
}: ICurrencyInput) {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) < 1) return 1;
    if (e.target.value === "") return 1;
    const newValue = parseFloat(e.target.value);
    if (onAmountChange) {
      onAmountChange(newValue);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChangeSelect) {
      const value = e.target.value;
      onChangeSelect(value);
    }
  };

  return (
    <div className="currency-input">
      <label>{label}</label>
      {inputType === "number" ? (
        <input
          min={1}
          type="text"
          value={inputValue}
          onChange={handleAmountChange}
        ></input>
      ) : (
        <select onChange={handleSelectChange} value={value}>
          {currencies?.map((currency) => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
