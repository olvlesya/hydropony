import React, { useEffect, useState } from "react";
import { Chart } from "./Chart";
import { dataItem } from "./Chart/types";
import "./App.css";

const throttleData = (data: dataItem[], limit = 100) => {
  if (data.length < limit) {
    return data;
  }
  const everyIndex = Math.floor(data.length / limit);
  return data.filter((_i, id) => id % everyIndex === 0);
};

const sortData = (data: dataItem[]) =>
  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

function App() {
  const [testData, setTestData] = useState<dataItem[]>([]);

  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo"
    )
      .then((r) => r.json())
      .then((series) => {
        const daily = series["Time Series (Daily)"];
        const data = Object.keys(daily).map((date) => ({
          date,
          IBM: Number(daily[date]["4. close"]),
        }));

        setTestData(sortData(throttleData(data)));
      });
  }, []);

  return (
    <div>
      <Chart data={testData} xAxisKey="date" lineKeys={["IBM"]} />
    </div>
  );
}

export default App;
