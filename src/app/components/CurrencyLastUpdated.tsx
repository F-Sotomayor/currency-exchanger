interface CurrencyLastUpdatedProps {
    dataFrom?: { label: string };
    dataTo?: { label: string };
    lastUpdated: string;
  }
  
  export default function CurrencyLastUpdated({ dataFrom, dataTo, lastUpdated }: CurrencyLastUpdatedProps) {
    return (
      <div className="last-updated">
        <p>
          {dataFrom?.label} to {dataTo?.label} conversion — Last updated {lastUpdated}
        </p>
      </div>
    );
  }