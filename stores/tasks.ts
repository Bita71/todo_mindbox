import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateRandomString } from "../utils/ts/generateRandomIndex";

interface ITask {
  id: string;
  text: string;
  completed: boolean;
}

interface ITasksState {
  tasks: ITask[];
}

const initialState: ITasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasks: (state) => {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        state.tasks = JSON.parse(tasks);
      }
    },
    addTask: (
      state,
      { payload: { text } }: PayloadAction<Pick<ITask, "text">>
    ) => {
      const task: ITask = {
        id: generateRandomString(),
        text,
        completed: false,
      };
      const newTasks = state.tasks.concat(task);
      state.tasks = newTasks;
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    },
    changeStatus: (
      state,
      { payload: { id } }: PayloadAction<Pick<ITask, "id">>
    ) => {
      const newTasks = state.tasks.map((item) => ({
        ...item,
        completed: item.id == id ? !item.completed : item.completed,
      }));
      state.tasks = newTasks;
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    },
    clearCompleted: (state) => {
      const newTasks = state.tasks.filter((item) => !item.completed);
      state.tasks = newTasks;
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    },
  },
});

export type { ITasksState, ITask };

export const { addTask, changeStatus, clearCompleted, getTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
