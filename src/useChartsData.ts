import { useEffect, useState } from "react";
import { dataItem } from "./Chart/types";

type normalized = {
  [key: string]: {
    [key: string]: string | number;
  };
};
const cachedEntities: string[] = [];
const normalizedData: normalized = {};

const normalizedDataToArray = (data: normalized): dataItem[] =>
  Object.keys(data)
    .map((date) => {
      return {
        date,
        ...data[date],
      };
    })
    // keys are sorted in a wrong order
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

export const useChartsData = (activeEntities: string[]) => {
  const [data, setData] = useState<dataItem[]>([]);

  useEffect(() => {
    // We don't request what was already requested
    const entityToFetch = activeEntities.find(
      (entity) => !cachedEntities.includes(entity)
    );
    if (!entityToFetch) {
      return;
    }

    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${entityToFetch}&outputsize=full&apikey=demo`
    )
      .then((r) => r.json())
      .then((series) => {
        const daily = series["Time Series (Daily)"];
        Object.keys(daily).forEach((date) => {
          const value = Number(daily[date]["4. close"]);
          normalizedData[date] = {
            ...(normalizedData[date] || {}),
            [entityToFetch]: value,
          };
        });
        const data = normalizedDataToArray(normalizedData);
        cachedEntities.push(entityToFetch);
        setData(data);
      });
  }, [activeEntities]);

  console.log(data, normalizedData);

  return data;
};
