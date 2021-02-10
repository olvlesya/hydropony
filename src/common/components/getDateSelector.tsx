import React from "react";
import { Radio } from "antd";
import { RecoilState, useRecoilState } from "recoil";

type Props = {
  disabled?: boolean;
};

export const getDateSelector = (
  recoilState: RecoilState<number>
): React.FC<Props> => ({ disabled }) => {
  const [value, setValue] = useRecoilState(recoilState);

  return (
    <Radio.Group
      disabled={disabled}
      buttonStyle="solid"
      onChange={(e) => {
        setValue(e.target.value);
      }}
      value={value}
    >
      <Radio.Button value={1}>Last month</Radio.Button>
      <Radio.Button value={12}>Last year</Radio.Button>
      <Radio.Button value={36}>3 years</Radio.Button>
      <Radio.Button value={0}>All data</Radio.Button>
    </Radio.Group>
  );
};
