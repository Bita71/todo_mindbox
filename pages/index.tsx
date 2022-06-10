import React, { useEffect } from "react";
import { Todo } from "../components";
import { useAppDispatch } from "../hooks/storeHooks";
import { getTasks } from "../stores/tasks";
import styles from "../styles/modules/main.module.scss";

const Main: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div className={styles.block}>
      <h1 className={styles.title}>todos</h1>
      <Todo />
    </div>
  );
};

export default Main;
