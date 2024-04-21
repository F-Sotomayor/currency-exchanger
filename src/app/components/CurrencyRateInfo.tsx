// CurrencyRateInfo.tsx
interface CurrencyRateInfoProps {
    dataFrom?: { label: string };
    dataTo?: { label: string };
    rate?: number;
  }
  
  export default function CurrencyRateInfo({ dataFrom, dataTo, rate }: CurrencyRateInfoProps) {
    return (
      <div className="rates-data-container">
        <div className="rate-information">
          <p>1 {dataFrom?.label} =</p>
          <p>
            {rate} {dataTo?.label}
          </p>
        </div>
        <div className="rate-disclaimer">
          <p>
            1 {dataFrom?.label} = {rate} {dataTo?.label}
          </p>
        </div>
      </div>
    );
  }