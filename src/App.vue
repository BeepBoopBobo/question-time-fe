<script setup>
import { RouterLink, RouterView } from 'vue-router';
import TeamScoreboard from './components/TeamScoreboard.vue';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">How to</RouterLink>
      <RouterLink to="/categories-management">Manage Categories</RouterLink>
      <RouterLink to="/teams-management">Manage Teams</RouterLink>
      <RouterLink to="/categories">Play</RouterLink>
      <a href="http://localhost:3000/api-docs">Swagger</a>
    </nav>

    <div id="teams">
      <TeamScoreboard></TeamScoreboard>
    </div>

  </header>
  <router-view></router-view>
</template>

<style>
nav {
  color: white;
}
</style>
