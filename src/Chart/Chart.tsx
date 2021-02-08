import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
} from "recharts";
import { State, Props, dataItem } from "./types";

const colorPalette = ["#364f6b", "#fc5185"];

const throttleData = (data: dataItem[], limit = 100) => {
  if (data.length < limit) {
    return data;
  }
  const everyIndex = Math.floor(data.length / limit);
  return data.filter((_i, id) => id % everyIndex === 0);
};
export class Chart extends React.Component<Props, State> {
  state = {
    visibleData: throttleData(this.props.data),
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax",
    bottom: "dataMin",
  };

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.data !== prevProps.data ||
      this.props.dateLimit !== prevProps.dateLimit
    ) {
      this.setState(this.calculateVisibleDataAndLimits());
    }
    if (this.props.lineKeys !== prevProps.lineKeys) {
      const [bottom, top] = this.getAxisYDomain(this.state.visibleData);
      this.setState({ bottom, top });
    }
  }

  calculateVisibleDataAndLimits() {
    const { dateLimit } = this.props;
    let { data } = this.props;
    if (dateLimit) {
      const date = new Date();
      date.setMonth(date.getMonth() - dateLimit);
      data = this.props.data.filter((d) => new Date(d.date) > date);
    }

    const visibleData = throttleData(data);
    const [bottom, top] = this.getAxisYDomain(visibleData);
    return { visibleData, bottom, top, refAreaLeft: "", refAreaRight: "" };
  }

  getAxisYDomain = (refData: dataItem[]) => {
    const { lineKeys } = this.props;
    let bottom = Infinity;
    let top = -Infinity;
    refData.forEach((d) => {
      lineKeys.forEach((key) => {
        const value = Number(d[key]);
        if (value > top) {
          top = value;
        }
        if (value < bottom) {
          bottom = value;
        }
      });
    });

    return [(bottom - 20) | 0, (top + 20) | 0];
  };

  zoom = () => {
    let { refAreaLeft, refAreaRight } = this.state;
    const { xAxisKey, data } = this.props;

    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      this.setState(() => ({
        refAreaLeft: "",
        refAreaRight: "",
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) {
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];
    }

    // yAxis domain
    // FIXME: fromIndex < toIndex
    const fromIndex =
      data.findIndex((entry) => entry[xAxisKey] === refAreaLeft) - 1;
    const toIndex = data.findIndex((entry) => entry[xAxisKey] === refAreaRight);
    const refData = data.slice(fromIndex, toIndex);
    const [bottom, top] = this.getAxisYDomain(refData);

    this.setState(() => ({
      visibleData: throttleData(refData),
      refAreaLeft: "",
      refAreaRight: "",
      bottom,
      top,
    }));
  };

  render() {
    const { refAreaLeft, refAreaRight, top, bottom, visibleData } = this.state;
    const { xAxisKey, lineKeys } = this.props;

    return (
      visibleData.length > 0 &&
      lineKeys.length > 0 && (
        <LineChart
          width={800}
          height={400}
          data={visibleData}
          onMouseDown={(e: { activeLabel: string }) =>
            this.setState({ refAreaLeft: e.activeLabel })
          }
          onMouseMove={(e: { activeLabel: string }) =>
            this.state.refAreaLeft &&
            this.setState({ refAreaRight: e.activeLabel })
          }
          onMouseUp={this.zoom}
        >
          <CartesianGrid fill="#f5f5f5" strokeDasharray="3 3" />
          <XAxis allowDataOverflow dataKey={xAxisKey} type="category" />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
          />
          <Tooltip />
          {lineKeys.map((key, id) => (
            <Line
              key={key}
              yAxisId="1"
              type="natural"
              dataKey={key}
              stroke={colorPalette[id]}
              animationDuration={300}
            />
          ))}

          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      )
    );
  }
}
