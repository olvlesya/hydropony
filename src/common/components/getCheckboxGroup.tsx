import React from "react";
import { Checkbox } from "antd";
import { RecoilState, useRecoilState } from "recoil";

type Props = {
  disabled?: boolean;
  options: string[];
};

export const getCheckboxGroup = (
  recoilState: RecoilState<string[]>
): React.FC<Props> => ({ disabled, options }) => {
  const [value, setValue] = useRecoilState(recoilState);

  return (
    <Checkbox.Group
      options={options}
      disabled={disabled}
      value={value}
      onChange={(selectedItems) => {
        setValue(selectedItems as string[]);
      }}
    />
  );
};
