import React, { useState } from "react";
import { Checkbox } from "antd";
import { Chart } from "./Chart";
import "antd/dist/antd.css";
import { useChartsData } from "./useChartsData";
import "./App.css";

const entities = ["IBM", "TSCO.LON"];

function App() {
  const [activeEntities, setActiveEntities] = useState<string[]>([]);
  const data = useChartsData(activeEntities);

  return (
    <div>
      <Checkbox.Group
        options={entities}
        value={activeEntities}
        onChange={(selectedItems) => {
          setActiveEntities(selectedItems as string[]);
        }}
      />
      <Chart data={data} xAxisKey="date" lineKeys={activeEntities} />
    </div>
  );
}

export default App;
