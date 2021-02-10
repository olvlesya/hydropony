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
      <ControlPanel
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
        data={data}
        dateLimit={dateLimit}
        xAxisKey="date"
        lineKeys={activeEntities}
      />
    </section>
  );
};
