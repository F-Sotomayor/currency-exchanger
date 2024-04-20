import CurrencyExchanger from "./components/CurrencyExchanger";
import transformToCurrencyArray from "./utils/transformToCurrencyArray";

async function getCurrencies() {
  const res = await fetch("https://api.vatcomply.com/currencies").then((res) =>
    res.json()
  );
  return transformToCurrencyArray(res);
}

export default async function Home() {
  const currencies = await getCurrencies();
  return (
    <div className="currency-exchange-container">
      <h1>100 EUR to USD - Convert Euros to US Dollars </h1>
      <CurrencyExchanger currencies={currencies} />
    </div>
  );
}
