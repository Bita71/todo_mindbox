import classNames from "classnames";
import styles from "../styles/modules/active.module.scss";
import GenericList from "../utils/react/GenericList";

export type TFilter = "all" | "active" | "completed";

interface IActiveProps {
  className?: string;
  tasksCount: number;
  activeFilter: TFilter;
  onClear: () => void;
  changeFilter: (filter: TFilter) => void;
}

const Active: React.FC<IActiveProps> = ({
  className,
  tasksCount = 0,
  changeFilter,
  activeFilter = "all",
  onClear,
}) => {
  const activeList = [
    {
      text: "All",
      onClick: () => changeFilter("all"),
      active: activeFilter == "all",
    },
    {
      text: "Active",
      onClick: () => changeFilter("active"),
      active: activeFilter == "active",
    },
    {
      text: "Completed",
      onClick: () => changeFilter("completed"),
      active: activeFilter == "completed",
    },
  ].map(({ text, active, onClick }) => ({
    text: (
      <button
        className={classNames(styles.activeButton, { [styles.active]: active })}
        type="button"
      >
        {text}
      </button>
    ),
    onClick: onClick,
    className: styles.item,
  }));

  return (
    <div className={classNames(styles.block, className)}>
      <span className={styles.count}>
        {tasksCount} item{tasksCount > 1 ? "s" : ""} left
      </span>
      {/* id for testing */}
      <ul id="active" className={styles.list}>
        <GenericList list={activeList} />
      </ul>
      {/* id for testing */}
      <button id="clear" className={styles.clearButton} type="button" onClick={onClear}>
        Clear completed
      </button>
    </div>
  );
};

export default Active;
