<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useGameStore } from "../stores/game";
export default {
    setup() {
        const game = useGameStore();
        const teams = game.getTeams

        return {
            teams,
        };
    },
}
</script>
<template>
    <div id="scoreboard">
        <div v-for="team in teams" :key="team.id" class="team" :style="`background-color: ${team.color}`"
            :class="{ 'active': team.order, 'text-blue': team.isTextBlue }">
            {{ team.name }} - {{ team.score }}
        </div>
    </div>
</template>

<style scoped>
.team.text-blue {
    color: var(--text);
}

#scoreboard {
    width: 80%;
    display: flex;
    justify-content: space-around;
    gap: 1rem;
    margin: auto;
}

.team {
    padding: 0.5rem 1rem;
    text-align: center;
    flex-grow: 1;
    color: var(--white);
}

.team-name,
.team-score {
    width: 100%;
}
</style>