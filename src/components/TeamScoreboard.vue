<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useGameStore } from "../stores/game";
export default {
    setup() {
        const game = useGameStore();
        const teams = ref(null);

        let teamsMock = ref(game.getTeams)

        onMounted(() => {
            getTeams();
        });

        async function getTeams() {
            try {
                const response = await axios.get('http://localhost:3000/api/teams/');
                teams.value = response.data;
                console.log("resp", response.data);
            }
            catch (error) {
                console.error('Error fetching teams:', error);
            }
        }
        return {
            teams,
            teamsMock
        };
    },
}
</script>
<template>
    <div id="scoreboard">
        <div v-for="team in teamsMock" :key="team.id" class="team" :style="`background-color: ${team.color}`"
            :class="{ 'active': team.order }">
            <span class="team-name">{{ team.name }}</span>
            <span class="team-score">{{ team.score }}</span>
        </div>
    </div>
</template>

<style scoped>
#scoreboard {
    width: 100%;
    display: flex;
    justify-content: space-around;
}

.team {
    padding: 0.5rem 1rem;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
}

.team-name,
.team-score {
    width: 100%;
}
</style>