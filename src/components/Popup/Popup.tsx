import React from "react";
import classNames from "classnames/bind";
import { Description } from "../Description/Description";
import styles from "./Popup.module.css";

const cx = classNames.bind(styles);

interface PopupProps {
  visible: boolean;
}

export const Popup: React.FunctionComponent<PopupProps> = ({ visible }) => {
  const containerClass = cx({
    container: true,
    containerVisible: visible,
  });
  return (
    <div className={containerClass}>
      <Description />
    </div>
  );
};
