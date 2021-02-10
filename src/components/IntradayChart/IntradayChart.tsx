import React from "react";
import { useRecoilValue } from "recoil";
import { Chart } from "../../common/components/Chart";
import "antd/dist/antd.css";
import { useChartsData } from "../../common/customHooks/useChartsData";
import {
  activeEntitiesAtom,
  normalizedDataAtom,
  dateRangeAtom,
  cachedEntitiesAtom,
} from "./state";
import { getControlPanel } from "../../common/components/ControlPanel";

const ControlPanel = getControlPanel(activeEntitiesAtom, dateRangeAtom);
const entities = ["IBM", "BABA"];
const dateOptions = [
  { value: 1, label: "1 hour" },
  { value: 3, label: "3 hours" },
  { value: 6, label: "6 hours" },
  { value: 0, label: "All data" },
];

export const IntradayChart: React.FC = () => {
  const activeEntities = useRecoilValue(activeEntitiesAtom);
  const dateLimit = useRecoilValue(dateRangeAtom);
  const [data, isLoading] = useChartsData(
    "TIME_SERIES_INTRADAY&interval=5min",
    "Time Series (5min)",
    activeEntities,
    normalizedDataAtom,
    cachedEntitiesAtom
  );

  return (
    <section>
      <h2>Intraday Chart</h2>
      <ControlPanel
        dateOptions={dateOptions}
        entities={entities}
        disabled={isLoading}
        showDateRange={data.length > 0}
      />
      <p>
        For better performance the chart always shows{" "}
        <b>not more than 100 values</b> per line at once. Real data size is{" "}
        <b>~{data.length}</b> points (possibly per entity).
      </p>
      <p>
        It also <b>caches</b> already fetched data and refetches it once per 15
        minutes.
      </p>
      <Chart
        precision="hour"
        data={data}
        dateLimit={dateLimit}
        xAxisKey="date"
        lineKeys={activeEntities}
      />
    </section>
  );
};
