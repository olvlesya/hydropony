import React from "react";
import { useRecoilState } from "recoil";
import { activeEntitiesAtom } from "../state/activeEntitiesAtom";
import { CheckboxGroup } from "../../../common/components/CheckboxGroup";

const entities = ["IBM", "TSCO.LON"];

type Props = {
  disabled?: boolean;
};

export const EntitySelector: React.FC<Props> = ({ disabled }) => {
  const [activeEntities, setActiveEntities] = useRecoilState(
    activeEntitiesAtom
  );
  return (
    <CheckboxGroup
      options={entities}
      disabled={disabled}
      value={activeEntities}
      onChange={setActiveEntities}
    />
  );
};
