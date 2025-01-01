<template>
  <header class="bg-emerald-700 text-slate-50">
    <nav
      class="container max-w-[640px] mx-auto px-4 py-3 flex justify-between items-center"
    >
      <div class="text-lg font-bold">
        <RouterLink to="/" class="hover:font-bold">My App</RouterLink>
      </div>
      <div class="hidden md:flex space-x-8">
        <RouterLink
          to="/"
          class="text-sm font-medium hover:font-bold transition-colors"
          activeClass="font-bold text-white"
          exact-active-class="font-bold text-white"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/about"
          class="text-sm font-medium hover:font-bold transition-colors"
          activeClass="font-bold text-white"
        >
          About
        </RouterLink>
        <RouterLink
          to="/todolist"
          class="text-sm font-medium hover:font-bold transition-colors"
          activeClass="font-bold text-white"
        >
          ToDoList
        </RouterLink>
      </div>

      <!-- MOBILE MENU -->
      <button
        class="block md:hidden text-slate-200 hover:text-white"
        @click="toggleMenu"
      >
        ☰
      </button>
    </nav>
    <div v-if="isMenuOpen" class="md:hidden bg-emerald-500 px-4 py-2">
      <RouterLink
        to="/"
        class="block text-sm font-medium py-2 hover:font-bold transition-colors"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/about"
        class="block text-sm font-medium py-2 hover:font-bold transition-colors"
      >
        About
      </RouterLink>
      <RouterLink
        to="/todolist"
        class="block text-sm font-medium py-2 hover:font-bold transition-colors"
      >
        ToDoList
      </RouterLink>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
.router-link-active,
.router-link-exact-active {
  font-weight: bold;
  color: white;
}
</style>
