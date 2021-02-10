import React from "react";
import "antd/dist/antd.css";
import { DailyChart } from "./components/DailyChart";
import { IntradayChart } from "./components/IntradayChart";

function App() {
  return (
    <section>
      <DailyChart />
      <hr />
      <IntradayChart />
    </section>
  );
}

export default App;
