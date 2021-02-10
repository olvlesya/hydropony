import React from "react";
import { RecoilState } from "recoil";
import { getCheckboxGroup } from "../getCheckboxGroup";
import { getDateSelector } from "../getDateSelector";
import styles from "./ControlPanel.module.css";

type Props = {
  disabled?: boolean;
  showDateRange?: boolean;
  entities: string[];
  dateOptions: Array<{ label: string; value: number }>;
};

export const getControlPanel = (
  entityAtom: RecoilState<string[]>,
  dateAtom: RecoilState<number>
): React.FC<Props> => {
  const EntitySelector = getCheckboxGroup(entityAtom);
  const DateSelector = getDateSelector(dateAtom);

  return ({ disabled, showDateRange, entities, dateOptions }) => {
    return (
      <section className={styles.controlPanel}>
        <EntitySelector options={entities} disabled={disabled} />
        {showDateRange && (
          <DateSelector options={dateOptions} disabled={disabled} />
        )}
      </section>
    );
  };
};
