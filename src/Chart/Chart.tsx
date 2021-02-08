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
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax",
    bottom: "dataMin",
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.data !== prevProps.data) {
      const visibleData = throttleData(this.props.data);
      const [bottom, top] = this.getAxisYDomain(visibleData);
      this.setState({ visibleData, bottom, top });
    }
  }

  getAxisYDomain = (refData: dataItem[]) => {
    const { lineKeys } = this.props;
    let bottom = Number(refData[0][lineKeys[0]]);
    let top = bottom;
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

  zoomOut = () => {
    const visibleData = throttleData(this.props.data);
    const [bottom, top] = this.getAxisYDomain(visibleData);
    this.setState({
      visibleData,
      refAreaLeft: "",
      refAreaRight: "",
      top,
      bottom,
    });
  };

  render() {
    const { refAreaLeft, refAreaRight, top, bottom, visibleData } = this.state;
    const { xAxisKey, lineKeys } = this.props;

    return (
      <div>
        <button onClick={this.zoomOut}>Zoom Out</button>

        {visibleData.length > 0 && (
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis allowDataOverflow dataKey={xAxisKey} type="category" />
            <YAxis
              allowDataOverflow
              domain={[bottom, top]}
              type="number"
              yAxisId="1"
            />
            <Tooltip />
            {lineKeys.map((key) => (
              <Line
                key={key}
                yAxisId="1"
                type="natural"
                dataKey={key}
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
        )}
      </div>
    );
  }
}
