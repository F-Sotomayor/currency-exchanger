import CurrencyExchanger from "./components/CurrencyExchanger/CurrencyExchanger";
import transformToCurrencyArray from "./utils/transformToCurrencyArray";

async function getCurrencies() {
  const res = await fetch("https://api.vatcomply.com/currencies").then((res) =>
    res.json()
  );
  return transformToCurrencyArray(res);
}

export default async function Home() {
  const currencies = await getCurrencies();
  console.log(currencies)
  return (
      <CurrencyExchanger currencies={currencies} />
    
  );
}
