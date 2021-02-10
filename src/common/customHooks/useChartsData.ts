import { useEffect, useState } from "react";
import { notification } from "antd";
import { RecoilState, SetterOrUpdater, useRecoilState } from "recoil";
import { dataItem } from "../components/Chart/types";
import { apiKey } from "../constants";

type normalized = {
  [key: string]: {
    [key: string]: string | number;
  };
};

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

const refreshData = (
  func: string,
  dataKey: string,
  setData: React.Dispatch<dataItem[]>,
  setIsLoading: React.Dispatch<boolean>,
  [cachedEntities, setCachedEntities]: [string[], SetterOrUpdater<string[]>],
  [normalizedData, setNormalizedData]: [normalized, SetterOrUpdater<normalized>]
) => (entityToFetch: string) => {
  setIsLoading(true);
  return fetch(
    `https://www.alphavantage.co/query?function=${func}&symbol=${entityToFetch}&apikey=${apiKey}`
  )
    .then((r) => r.json())
    .then((series) => {
      const daily = series[dataKey];
      if (!daily) {
        notification.error({
          message: `Cannot fetch data for ${entityToFetch}`,
        });
        return;
      }
      const ndCopy = { ...normalizedData };
      Object.keys(daily).forEach((date) => {
        const value = Number(daily[date]["4. close"]);
        ndCopy[date] = {
          ...(ndCopy[date] || {}),
          [entityToFetch]: value,
        };
      });
      setNormalizedData(ndCopy);
      setCachedEntities(cachedEntities.concat(entityToFetch));
      setData(normalizedDataToArray(ndCopy));
    })
    .then(() => {
      setIsLoading(false);
    });
};

export const useChartsData = (
  func: string,
  dataKey: string,
  activeEntities: string[],
  normalizedDataAtom: RecoilState<normalized>,
  cachedEntitiesAtom: RecoilState<string[]>
): [dataItem[], boolean] => {
  const [data, setData] = useState<dataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [normalizedData, setNormalizedData] = useRecoilState(
    normalizedDataAtom
  );
  const [cachedEntities, setCachedEntities] = useRecoilState(
    cachedEntitiesAtom
  );

  const refresh = refreshData(
    func,
    dataKey,
    setData,
    setIsLoading,
    [cachedEntities, setCachedEntities],
    [normalizedData, setNormalizedData]
  );

  useEffect(() => {
    // We don't request what was already requested
    const entityToFetch = activeEntities.find(
      (entity) => !cachedEntities.includes(entity)
    );
    if (!entityToFetch) {
      return;
    }

    refresh(entityToFetch);
  }, [activeEntities]);

  // refresh active data every 15 mins
  useEffect(() => {
    const intervalId = setInterval(() => {
      activeEntities.forEach(refresh);
    }, 15 * 60 * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [activeEntities]);

  return [data, isLoading];
};
