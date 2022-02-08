import React from "react";
import { Link, useParams } from "react-router-dom";
import { useRedirectToLogin } from "../../hooks/auth.hook";
import { Task } from "../../components/Task/Task";
import styles from "./TasksPage.module.css";

const fillTasks = () => {
  const result = [];
  for (let i = 0; i < 10; i++) {
    result.push({
      number: i,
      name: `Chapter ${i}`,
    });
  }
  return result;
};

export const TasksPage = () => {
  useRedirectToLogin();

  const params = useParams();
  return (
    <div className={styles.container}>
      <ChapterList />
      {params.taskNumber && <Task number={Number(params.taskNumber)} />}
    </div>
  );
};

const ChapterList = () => {
  const chapters = fillTasks();

  return (
    <div className={styles.tasksListContainer}>
      {chapters.map((task) => (
        <Link to={`/tasks/${task.number}`}>
          <div className={styles.task}>
            <span className={styles.taskNumber}>{task.number}</span>
            <span>{task.name}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};
