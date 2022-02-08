import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./Navigation.module.css";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLoginClick = useCallback(() => {
    navigate("../login");
  }, [navigate]);

  const openTasks = useCallback(() => {
    navigate("../tasks");
  }, [navigate]);

  const openProfile = useCallback(() => {
    navigate("../profile");
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div>Defence practise</div>
      {!isAuthenticated && (
        <button className={styles.button} onClick={onLoginClick}>
          Login or Registration
        </button>
      )}
      {isAuthenticated && (
        <div className={styles.buttonsContainer}>
          <button className={styles.button} onClick={openTasks}>
            Tasks
          </button>
          <button className={styles.button} onClick={openProfile}>
            Profile
          </button>
        </div>
      )}
    </div>
  );
};
