"use client";

import { ICurrencyInput } from "../types/types";

export default function CurrencyInput({
  inputType,
  label,
  inputValue,
  currencies,
  value,
  onChangeText,
  onChangeSelect,
}: ICurrencyInput) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value)
        if (onChangeText) {
          onChangeText(newValue); 
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
      <label style={{width: "100%", paddingLeft: "18px"}}>{label}</label>
      {inputType === "text" ? (
        <input
        min={1}
          type="number"
          value={inputValue}
          onChange={handleTextChange}
        />
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
