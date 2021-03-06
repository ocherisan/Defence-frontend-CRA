import React, { useCallback, useState } from "react";
import { Popup } from "../Popup/Popup";
import styles from "./Task.module.css";
import classnames from "classnames/bind";

const cx = classnames.bind(styles);

interface TaskProps {
  partNumber: number;
  taskNumber?: number;
}

export const Task: React.FunctionComponent<TaskProps> = ({
  partNumber: number,
  taskNumber,
}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);

  const toggleDecription = useCallback(() => {
    setVisiblePopup(!visiblePopup);
  }, [setVisiblePopup, visiblePopup]);

  const classContainer = cx({
    container: true,
    containerWithPopup: visiblePopup,
  });

  return (
    <div className={classContainer}>
      <div className={styles.taskContainer}>PART {number}</div>
      <div className={styles.toggleButton} onClick={toggleDecription}>
        {visiblePopup ? "X" : "T"}
      </div>
      <Popup visible={visiblePopup} />
    </div>
  );
};
