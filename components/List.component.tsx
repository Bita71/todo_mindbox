import classNames from "classnames";
import React, { Fragment } from "react";
import { ITask } from "../stores/tasks";
import styles from "../styles/modules/list.module.scss";
import GenericList from "../utils/react/GenericList";
import { TFilter } from "./Active.component";

interface IListProps {
  list: ITask[];
  className?: string;
  onClick: (id: string) => void;
  filter: TFilter;
}

const List: React.FC<IListProps> = ({ list, className, onClick, filter }) => {
  function filterList(list: ITask[]) {
    switch (filter) {
      case "active":
        return list.filter((item) => !item.completed);
      case "completed":
        return list.filter((item) => item.completed);
    }
    return list;
  }

  const genList = filterList(list).map(({ completed, text, id }) => ({
    text: (
      <Fragment>
        {/* id for testing */}
        <span id="status" className={classNames(styles.status)} />
        <p className={styles.text}>{text}</p>
      </Fragment>
    ),
    className: classNames(styles.item, {
      [styles.completed]: completed,
      /* class "complete" for testing */
      ['complete']: completed,
    }),

    onClick: () => onClick(id),
  }));
  return (
    /* id for testing */
    <ul id="tasksList" className={classNames(styles.list, className)}>
      <GenericList list={genList} />
    </ul>
  );
};

export default List;
