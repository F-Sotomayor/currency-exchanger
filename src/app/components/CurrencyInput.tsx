"use client";

import { ICurrencyInput } from "../types/types";

export default function CurrencyInput({
  inputType,
  label,
  inputValue,
  currencies,
  onChangeText,
  onChangeSelect,
}: ICurrencyInput) {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value); // Convertir a número
        if (onChangeText) {
          onChangeText(newValue); // Pasar el valor numérico
        }
      };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChangeSelect) {
      const value = e.target.value;
      onChangeSelect(value); // Trigger the select input change handler
    }
  };

  return (
    <div className="currency-input">
      <label>{label}</label>
      {inputType === "text" ? (
        <input
        min={1}
          type="number"
          value={inputValue}
          onChange={handleTextChange} // Correct `onChange` for text input
        />
      ) : (
        <select onChange={handleSelectChange}>
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
