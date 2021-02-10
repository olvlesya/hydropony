import React from "react";
import { useRecoilState } from "recoil";
import { Checkbox } from "antd";
import { activeEntitiesAtom } from "../../state/activeEntitiesAtom";

const entities = ["IBM", "TSCO.LON"];

type Props = {
  disabled?: boolean;
};

export const EntitySelector: React.FC<Props> = ({ disabled }) => {
  const [activeEntities, setActiveEntities] = useRecoilState(
    activeEntitiesAtom
  );
  return (
    <Checkbox.Group
      options={entities}
      disabled={disabled}
      value={activeEntities}
      onChange={(selectedItems) => {
        setActiveEntities(selectedItems as string[]);
      }}
    />
  );
};
