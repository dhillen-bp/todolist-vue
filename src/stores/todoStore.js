import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "vue-toast-notification";

const toast = useToast();

export const useToDoStore = defineStore("todo", {
  state: () => ({
    todoList: [
      { id: 1, name: "Belajar HTML", isDone: false },
      { id: 2, name: "Belajar CSS", isDone: false },
      { id: 3, name: "Belajar Javascript", isDone: false },
      { id: 4, name: "Belajar PHP", isDone: false },
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
    setAsDone(id) {
      const todo = this.todoList.find((item) => item.id === id);
      if (todo) {
        todo.isDone = true;
        toast.info("Todo marked as done!", {
          position: "top-right",
          dismissible: true,
        });
      }
    },
    setAsUndone(id) {
      const todo = this.todoList.find((item) => item.id === id);
      if (todo) {
        todo.isDone = false;
        toast.warning("Todo marked as undone!", {
          position: "top-right",
          dismissible: true,
        });
      }
    },

    addTodo(name) {
      const exists = this.todoList.some((item) => item.name === name);

      if (exists) {
        alert("New todo is existed in data!");
        return;
      }

      this.todoList.push({
        id: uuidv4(),
        name,
        isDone: false,
      });

      toast.success("Todo added successfully!", {
        position: "top-right",
        dismissible: true,
      });
    },

    removeTodo(id) {
      this.todoList = this.todoList.filter((todo) => todo.id !== id);

      if (this.todoList) {
        toast.success("Todo deleted!", {
          position: "top-right",
          dismissible: true,
        });
      }
    },
  },
});
