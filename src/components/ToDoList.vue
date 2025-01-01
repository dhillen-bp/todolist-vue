<template>
  <ul>
    <li v-for="(list, index) in filteredTodoList" :key="index">
      <span>{{ list.name }}</span>
      <span>
        <button v-if="!list.isDone" @click="setAsDone(list.name)">
          set as done
        </button>
        <button v-if="list.isDone" @click="setAsUndone(list.name)">
          set as undone
        </button>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    filteredTodoList: {
      type: Array,
      required: true,
    },
    setAsDone: {
      type: Function,
      required: true,
    },
    setAsUndone: {
      type: Function,
      required: true,
    },
  },
};
</script>
