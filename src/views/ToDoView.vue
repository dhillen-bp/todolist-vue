<script setup>
import { ref, computed } from "vue";
import { useToDoStore } from "@/stores/todoStore";

const todoStore = useToDoStore();

const newTodo = ref("");
const show = ref("all");

const filteredTodoList = computed(() => {
  if (show.value === "done-only") {
    return todoStore.showDoneOnly;
  } else if (show.value === "undone-only") {
    return todoStore.showUndoneOnly;
  }
  return todoStore.showAll;
});

const addTodo = () => {
  todoStore.addTodo(newTodo.value);
  newTodo.value = "";
};
</script>

<template>
  <div class="max-w-[640px] mx-auto p-4 pt-10">
    <h1 class="text-3xl font-bold text-center mb-6">Halaman ToDoList</h1>

    <div class="flex justify-between">
      <button @click="show = 'all'" class="btn-outline-success">
        Show All
      </button>
      <button @click="show = 'done-only'" class="btn-outline-success">
        Done Only
      </button>
      <button @click="show = 'undone-only'" class="btn-outline-success">
        Undone Only
      </button>
    </div>

    <form
      @submit.prevent="todoStore.addTodo(newTodo)"
      class="my-6 flex justify-between items-center gap-x-6"
    >
      <input
        type="text"
        v-model="newTodo"
        placeholder="Type new todo..."
        class="input-rounded w-full"
      />
      <span><button type="submit" class="btn-primary">Submit</button></span>
    </form>

    <!-- Show All Todolist -->
    <div v-if="show === 'all'">
      <ul>
        <li v-for="list in todoStore.showAll">
          <div class="flex justify-between w-full items-center">
            <span>{{ list.name }}</span>
            <span>
              <button
                v-if="!list.isDone"
                @click="todoStore.setAsDone(list.name)"
                class="btn-outline-success"
              >
                set as done
              </button>
              <button
                v-if="list.isDone"
                @click="todoStore.setAsUndone(list.name)"
                class="btn-outline-success"
              >
                set as undone
              </button>
            </span>
          </div>
          <hr class="border-emerald-300 border mb-6 mt-2" />
        </li>
      </ul>
    </div>

    <!-- Show Done Only Todolist -->
    <div v-if="show === 'done-only'">
      <ul>
        <li v-for="list in todoStore.showDoneOnly">
          <div class="flex justify-between w-full items-center">
            <span>{{ list.name }}</span>
            <span>
              <button
                v-if="!list.isDone"
                @click="todoStore.setAsDone(list.name)"
                class="btn-outline-success"
              >
                set as done
              </button>
              <button
                v-if="list.isDone"
                @click="todoStore.setAsUndone(list.name)"
                class="btn-outline-success"
              >
                set as undone
              </button>
            </span>
          </div>
          <hr class="border-emerald-300 border mb-6 mt-2" />
        </li>
      </ul>
    </div>

    <!-- Show Undone Only Todolist -->
    <div v-if="show === 'undone-only'">
      <ul>
        <li v-for="(list, index) in todoStore.showUndoneOnly">
          <div class="flex justify-between w-full items-center">
            <span>{{ list.name }}</span>
            <span>
              <button
                v-if="!list.isDone"
                @click="todoStore.setAsDone(list.name)"
                class="btn-outline-success"
              >
                set as done
              </button>
              <button
                v-if="list.isDone"
                @click="todoStore.setAsUndone(list.name)"
                class="btn-outline-success"
              >
                set as undone
              </button>
            </span>
          </div>
          <hr class="border-emerald-300 border mb-6 mt-2" />
        </li>
      </ul>
    </div>
  </div>
</template>
