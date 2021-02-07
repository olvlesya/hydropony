export type dataItem = Record<string, number | string>;

export type Props = {
  data: dataItem[];
  xAxisKey: string;
  lineKeys: string[];
};

export type State = {
  visibleData: dataItem[];
  refAreaLeft: string;
  refAreaRight: string;
  top: string | number;
  bottom: string | number;
};
