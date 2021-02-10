import React from "react";
import { useRecoilValue } from "recoil";
import { Chart } from "./components/Chart";
import "antd/dist/antd.css";
import { useChartsData } from "./customHooks/useChartsData";
import { activeEntitiesAtom } from "./state/activeEntitiesAtom";
import { dateRangeAtom } from "./state/dateRangeAtom";
import { ControlPanel } from "./components/ControlPanel";

function App() {
  const activeEntities = useRecoilValue(activeEntitiesAtom);
  const dateLimit = useRecoilValue(dateRangeAtom);
  const [data, isLoading] = useChartsData(activeEntities);

  return (
    <section>
      <ControlPanel disabled={isLoading} showDateRange={data.length > 0} />

      <Chart
        data={data}
        dateLimit={dateLimit}
        xAxisKey="date"
        lineKeys={activeEntities}
      />
    </section>
  );
}

export default App;
