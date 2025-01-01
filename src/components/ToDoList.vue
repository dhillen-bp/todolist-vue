<template>
  <ul>
    <li v-for="list in todoList" :key="list.id">
      <div class="flex justify-between w-full items-center">
        <span>{{ list.name }}</span>
        <span class="flex gap-x-3">
          <button
            v-if="!list.isDone"
            @click="$emit('set-as-done', list.id)"
            class="btn-outline-info"
          >
            set as done
          </button>
          <button
            v-if="list.isDone"
            @click="$emit('set-as-undone', list.id)"
            class="btn-outline-warning"
          >
            set as undone
          </button>
          <button
            class="btn-outline-danger"
            @click="$emit('delete-todo', list.id)"
          >
            Hapus
          </button>
        </span>
      </div>
      <hr class="border-emerald-300 border mb-6 mt-2" />
    </li>
  </ul>
</template>

<script setup>
defineProps({
  todoList: {
    type: Array,
    required: true,
  },
});
defineEmits(["set-as-done", "set-as-undone", "delete-todo"]);
</script>
