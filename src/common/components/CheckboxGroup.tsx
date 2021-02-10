import React from "react";
import { Checkbox } from "antd";

type Props = {
  disabled?: boolean;
  value: string[];
  options: string[];
  onChange: (value: string[]) => void;
};

export const CheckboxGroup: React.FC<Props> = ({
  disabled,
  value,
  options,
  onChange,
}) => {
  return (
    <Checkbox.Group
      options={options}
      disabled={disabled}
      value={value}
      onChange={(selectedItems) => {
        onChange(selectedItems as string[]);
      }}
    />
  );
};
