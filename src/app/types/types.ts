export interface Currency {
    value: string; 
    label: string;  
    symbol: string; 
  }

  export interface SelectOption {
    value: string;
    label: string;
  }
  
  export interface ICurrencyInput {
    inputType: "number" | "select";
    label: string;
    inputValue?: number;
    currencies?: { value: string; label: string }[];
    value?: string
    currencySymbol?: string
    onAmountChange?: (newValue: number) => void; // For text input
    onChangeSelect?: (selectedValue: string) => void; // For select input
  }

  export interface ICurrencyRates {
    code: string
    rate: number
  }