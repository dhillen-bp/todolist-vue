<script setup>
import { ref, computed } from "vue";
import { useToDoStore } from "@/stores/todoStore";
import ToDoList from "@/components/ToDoList.vue";
import Swal from "sweetalert2";

const todoStore = useToDoStore();
const newTodo = ref("");
const show = ref("all");
const searchQuery = ref("");

const filteredTodoList = computed(() => {
  let todos = todoStore.showAll;

  // Filter berdasarkan status done/undone
  if (show.value === "done-only") {
    todos = todoStore.showDoneOnly;
  } else if (show.value === "undone-only") {
    todos = todoStore.showUndoneOnly;
  }

  // Filter berdasarkan pencarian
  if (searchQuery.value) {
    todos = todos.filter((todo) =>
      todo.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return todos;
});

const addTodo = () => {
  if (newTodo.value.trim() !== "") {
    todoStore.addTodo(newTodo.value);
    newTodo.value = "";
    toast.success("Todo added successfully!");
  }
};

function handleDeleteTodo(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this todo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
  }).then((result) => {
    if (result.isConfirmed) {
      todoStore.removeTodo(id);
      Swal.fire("Deleted!", "Your todo has been deleted.", "success");
    }
  });
}
</script>

<template>
  <div class="max-w-[640px] mx-auto p-4 pt-10">
    <h1 class="text-3xl font-bold text-center mb-6">Halaman ToDoList</h1>

    <div class="">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Cari todo..."
        class="input-rounded w-full focus:border-emerald-600"
      />

      <hr class="border-emerald-300 border my-3" />
    </div>

    <div class="flex justify-between">
      <button
        @click="show = 'all'"
        :class="{
          'bg-blue-500 btn-outline-primary-active': show === 'all',
          'btn-outline-primary': show !== 'all',
        }"
      >
        Show All
      </button>
      <button
        @click="show = 'done-only'"
        :class="{
          'bg-blue-500 btn-outline-primary-active': show === 'done-only',
          'btn-outline-primary': show !== 'done-only',
        }"
      >
        Done Only
      </button>
      <button
        @click="show = 'undone-only'"
        :class="{
          'bg-blue-500 btn-outline-primary-active': show === 'undone-only',
          'btn-outline-primary': show !== 'undone-only',
        }"
      >
        Undone Only
      </button>
    </div>

    <form
      @submit.prevent="addTodo"
      class="my-6 flex justify-between items-center gap-x-6"
    >
      <input
        type="text"
        v-model="newTodo"
        placeholder="Type new todo..."
        class="input-rounded w-full focus:border-emerald-600"
      />
      <span
        ><button type="submit" class="btn-primary text-nowrap">
          Add todo
        </button></span
      >
    </form>

    <ToDoList
      :todoList="filteredTodoList"
      @set-as-done="todoStore.setAsDone"
      @set-as-undone="todoStore.setAsUndone"
      @delete-todo="handleDeleteTodo"
    />
  </div>
</template>
