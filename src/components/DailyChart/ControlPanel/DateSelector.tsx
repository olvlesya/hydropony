import React from "react";
import { useRecoilState } from "recoil";
import { Radio } from "antd";
import { dateRangeAtom } from "../state/dateRangeAtom";

type Props = {
  disabled?: boolean;
};

export const DateSelector: React.FC<Props> = ({ disabled }) => {
  const [dateLimit, setDateLimit] = useRecoilState(dateRangeAtom);

  return (
    <Radio.Group
      disabled={disabled}
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
  );
};
