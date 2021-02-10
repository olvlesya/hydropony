import React from "react";
import { useRecoilValue } from "recoil";
import { Chart } from "../../common/components/Chart";
import "antd/dist/antd.css";
import { useChartsData } from "../../common/customHooks/useChartsData";
import {
  activeEntitiesAtom,
  cachedEntitiesAtom,
  dateRangeAtom,
  normalizedDataAtom,
} from "./state";
import { getControlPanel } from "../../common/components/ControlPanel";

const ControlPanel = getControlPanel(activeEntitiesAtom, dateRangeAtom);
const entities = ["IBM", "TSCO.LON", "TESO", "BABA"];
const dateOptions = [
  { value: 1, label: "Last month" },
  { value: 12, label: "Last year" },
  { value: 36, label: "3 years" },
  { value: 0, label: "All data" },
];

export const DailyChart: React.FC = () => {
  const activeEntities = useRecoilValue(activeEntitiesAtom);
  const dateLimit = useRecoilValue(dateRangeAtom);
  const [data, isLoading] = useChartsData(
    "TIME_SERIES_DAILY&outputsize=full",
    "Time Series (Daily)",
    activeEntities,
    normalizedDataAtom,
    cachedEntitiesAtom
  );

  return (
    <section>
      <h2>Daily Chart</h2>
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
        precision="month"
        data={data}
        dateLimit={dateLimit}
        xAxisKey="date"
        lineKeys={activeEntities}
      />
    </section>
  );
};
