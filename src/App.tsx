import React, { useState } from "react";
import { Checkbox, Radio } from "antd";
import { useRecoilState } from "recoil";
import { Chart } from "./Chart";
import "antd/dist/antd.css";
import { useChartsData } from "./customHooks/useChartsData";
import { activeEntitiesAtom } from "./state/activeEntitiesAtom";
import styles from "./App.module.css";

const entities = ["IBM", "TSCO.LON"];
const defaultDateLimit = 1;

function App() {
  const [activeEntities, setActiveEntities] = useRecoilState(
    activeEntitiesAtom
  );
  const [data, isLoading] = useChartsData(activeEntities);
  const [dateLimit, setDateLimit] = useState<number>(defaultDateLimit);

  return (
    <section>
      <section className={styles.appControlPanel}>
        <Checkbox.Group
          options={entities}
          disabled={isLoading}
          value={activeEntities}
          onChange={(selectedItems) => {
            setActiveEntities(selectedItems as string[]);
          }}
        />
        {data.length > 0 && (
          <Radio.Group
            disabled={isLoading}
            defaultValue={defaultDateLimit}
            buttonStyle="solid"
            onChange={(e) => {
              setDateLimit(e.target.value);
            }}
            value={dateLimit}
          >
            <Radio.Button value={1}>Last month</Radio.Button>
            <Radio.Button value={12}>Last year</Radio.Button>
            <Radio.Button value={36}>3 years</Radio.Button>
            <Radio.Button value={0}>All data</Radio.Button>
          </Radio.Group>
        )}
      </section>

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
