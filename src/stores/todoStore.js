import { defineStore } from "pinia";
export const useToDoStore = defineStore("todo", {
  state: () => ({
    todoList: [
      { name: "Belajar HTML", isDone: false },
      { name: "Belajar CSS", isDone: false },
      { name: "Belajar Javascript", isDone: false },
      { name: "Belajar PHP", isDone: false },
    ],
  }),
  getters: {
    showAll(state) {
      return state.todoList;
    },
    showDoneOnly(state) {
      return state.todoList.filter((item) => item.isDone === true);
    },
    showUndoneOnly(state) {
      return state.todoList.filter((item) => item.isDone === false);
    },
  },
  actions: {
    setAsDone(name) {
      const todo = this.todoList.find((item) => item.name === name);
      if (todo) {
        todo.isDone = true;
      }
    },
    setAsUndone(name) {
      const todo = this.todoList.find((item) => item.name === name);
      if (todo) {
        todo.isDone = false;
      }
    },
    addTodo(data) {
      let exists = this.todoList.filter((item) => item.name == data).length;

      if (exists) {
        alert("New todo is existed in data!");
        return;
      }

      this.todoList.push({
        name: data,
        isDone: false,
      });
    },
  },
});
