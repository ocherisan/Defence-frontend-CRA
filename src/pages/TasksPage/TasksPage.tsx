import React from "react";
import { Link, useParams } from "react-router-dom";
import { useRedirectToLogin } from "../../hooks/auth.hook";
import { Task } from "../../components/Task/Task";
import styles from "./TasksPage.module.css";

const fillTasks = () => {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push({
      number: i,
      name: `Task ${i}`,
    });
  }
  return result;
};

const fillParts = () => {
  const result = [];
  const tasks = fillTasks();
  for (let i = 0; i < 5; i++) {
    result.push({
      number: i,
      name: `Chapter ${i}`,
      tasks,
    });
  }
  return result;
};

export const TasksPage = () => {
  useRedirectToLogin();

  const params = useParams();
  return (
    <div className={styles.container}>
      <PartsList />
      {params.partNumber && (
        <Task
          partNumber={Number(params.partNumber)}
          taskNumber={
            params.taskNumber === undefined
              ? undefined
              : Number(params.taskNumber)
          }
        />
      )}
      {!params.partNumber && <div>От атак надо защищаться</div>}
    </div>
  );
};

const PartsList = () => {
  //TODO: добавить получения партов
  const parts = fillParts();

  return (
    <div className={styles.listContainer}>
      {parts.map((part) => {
        return (
          <>
            <Link to={`/parts/${part.number}`}>
              <div className={styles.title}>
                <span className={styles.number}>{part.number}</span>
                <span>{part.name}</span>
              </div>
            </Link>
            {part.tasks.map((task) => {
              return (
                <Link
                  to={`/parts/${part.number}/${task.number}`}
                  className={styles.taskTitle}
                >
                  <div className={styles.title}>
                    <div className={styles.taskTitleContent}>
                      <span className={styles.number}>{task.number}</span>
                      <span>{task.name}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </>
        );
      })}
    </div>
  );
};
