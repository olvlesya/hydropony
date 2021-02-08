import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { dataItem } from "./Chart/types";
import "./App.css";

const entities = ["IBM", "TSCO.LON"] as const;

function App() {
  const [testData, setTestData] = useState<dataItem[]>([]);
  const [activeEntities, setActiveEntities] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo"
    )
      .then((r) => r.json())
      .then((series) => {
        const daily = series["Time Series (Daily)"];
        const data = Object.keys(daily)
          .map((date) => ({
            date,
            IBM: Number(daily[date]["4. close"]),
          }))
          // keys are sorted in a wrong order
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );

        setTestData(data);
      });
  }, []);

  return (
    <div>
      {entities.map((entity) => (
        <label key={entity}>
          {entity}
          <input type="checkbox" value={entity} />
        </label>
      ))}
      <Chart data={testData} xAxisKey="date" lineKeys={["IBM"]} />
    </div>
  );
}

export default App;
