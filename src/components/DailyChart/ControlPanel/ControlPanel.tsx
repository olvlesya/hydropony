import React from "react";
import { DateSelector } from "./DateSelector";
import { EntitySelector } from "./EntitySelector";
import styles from "./ControlPanel.module.css";

type Props = {
  disabled?: boolean;
  showDateRange?: boolean;
};

export const ControlPanel: React.FC<Props> = ({ disabled, showDateRange }) => {
  return (
    <section className={styles.controlPanel}>
      <EntitySelector disabled={disabled} />
      {showDateRange && <DateSelector disabled={disabled} />}
    </section>
  );
};
