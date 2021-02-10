import React from "react";
import { Radio } from "antd";
import { RecoilState, useRecoilState } from "recoil";

type Props = {
  disabled?: boolean;
  options: Array<{ label: string; value: number }>;
};

export const getDateSelector = (
  recoilState: RecoilState<number>
): React.FC<Props> => ({ disabled, options }) => {
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
      {options.map(({ value, label }) => (
        <Radio.Button key={value} value={value}>
          {label}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
