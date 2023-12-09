<script setup>
import { RouterLink, RouterView } from 'vue-router';
import TeamScoreboard from './components/TeamScoreboard.vue';
</script>

<template>
  <header>
    <nav>
      <RouterLink class="nav-link" to="/">How to</RouterLink>
      <RouterLink class="nav-link" to="/manage-categories">Manage Categories</RouterLink>
      <RouterLink class="nav-link" to="/manage-teams">Manage Teams</RouterLink>
      <RouterLink class="nav-link" to="/categories">Play</RouterLink>
      <a class="nav-link" href="http://localhost:3000/api-docs">Swagger</a>
    </nav>

    <div id="teams">
      <TeamScoreboard></TeamScoreboard>
    </div>

  </header>
  <div id="notepad-paper">
    <router-view></router-view>
  </div>
</template>

<style>
#notepad-paper {
  background-color: var(--beige);
  width: 80%;
  margin: auto;
  height: 80vh;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

nav {
  color: white;
  background-color: bisque;
  display: flex;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
}

.nav-link:hover {
  color: red;
}
</style>
