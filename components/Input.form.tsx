import { ChangeEvent, FormEvent, useState } from "react";
import styles from "../styles/modules/input.module.scss";

interface IInputProps {
  className?: string;
  onSubmit: (value: string) => void;
}

const Input: React.FC<IInputProps> = ({ className, onSubmit }) => {
  const [value, setValue] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimedValue = value.trim();
    if (!trimedValue) {
      return;
    }

    onSubmit(trimedValue);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder="What needs to be done?"
      />
    </form>
  );
};

export default Input;
