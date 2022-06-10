import { Active, Input, List } from ".";
import Image from "next/image";
import ArrowIcon from "../public/asset/arrow.svg";
import styles from "../styles/modules/todo.module.scss";
import { useAppDispatch, useAppSelector } from "../hooks/storeHooks";
import { addTask, changeStatus, clearCompleted } from "../stores/tasks";
import { useState } from "react";
import classNames from "classnames";
import { TFilter } from "./Active.component";

const Todo: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [filter, setFilter] = useState<TFilter>("all");
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const activeTasks = tasks.filter(item => !item.completed).length
  const handleClickArrow = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const addTodo = (value: string) => {
    dispatch(addTask({ text: value }));
    setIsDropdownOpen(true);
  };

  const handleChangeStatus = (id: string) => {
    dispatch(changeStatus({ id }));
  };

  const handleChangeFilter = (filter: TFilter) => {
    setFilter(filter);
  };

  const handleClear = () => {
    dispatch(clearCompleted());
  };

  return (
    <div className={styles.block}>
      <div className={styles.top}>
        <button
          className={styles.buttonArrow}
          type="button"
          onClick={handleClickArrow}
        >
          <Image
            src={ArrowIcon}
            width={24}
            height={24}
            className={classNames(styles.buttonArrowIcon, {
              [styles.open]: isDropdownOpen,
            })}
            alt="Arrow"
          />
        </button>
        <Input className={styles.input} onSubmit={addTodo} />
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <List
            filter={filter}
            list={tasks}
            className={styles.list}
            onClick={handleChangeStatus}
          />
          <Active
            className={styles.active}
            tasksCount={activeTasks}
            onClear={handleClear}
            activeFilter={filter}
            changeFilter={handleChangeFilter}
          />
        </div>
      )}
    </div>
  );
};

export default Todo;
