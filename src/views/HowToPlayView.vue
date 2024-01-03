<script>
import { ref, onMounted } from "vue";
import { useGameStore } from "../stores/game";
import { RouterLink } from "vue-router";

export default {
    setup() {
        return {};
    },
    components: { RouterLink }
}
</script>
<template>
    <h3>Welcome to Question Time</h3>
    <RouterLink to="/manage-teams">
        <button class="btn btn-org">
            Next
        </button>
    </RouterLink>
</template>
<style></style>