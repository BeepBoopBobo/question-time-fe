<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useGameStore } from "../stores/game";

export default {
    setup() {
        const game = useGameStore();
        let createdTeams = ref(game.getTeams);

        const teamOptions = ref({
            name: "",
            color: "",
            order: 0,
            score: 0,
        })
        const categories = ref(null);

        function addTeam() {
            //check if the name is not already used
            const highestOrder = Math.max(createdTeams.value.map(team => team.order));
            teamOptions.value.order = highestOrder + 1;
            game.addTeam(teamOptions.value);
            clearInputs();
        }
        function clearInputs() {
            teamOptions.value.name = "";
            teamOptions.value.color = "";
        }
        function deleteTeam(teamName) {
            console.log("deleting team", teamName);

            game.removeTeam(teamName);
        }
        onMounted(() => {
            fetchTeams();
        })

        async function fetchTeams() {
            try {
                const response = await axios.get('http://localhost:3000/api/categories/');
                categories.value = response.data;
                console.log("resp", response.data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        }
        return {
            clearInputs,
            addTeam,
            deleteTeam,
            createdTeams,
            teamOptions,
            categories
        }
    }
}
</script>
<template>
    <div id="teams-table">
        <div v-for="team, index in createdTeams" :key="index">
            <span>{{ team.name }}</span>
            <span>{{ team.color }}</span>
            <button @click="deleteTeam(team.name)">DEL</button>
        </div>
    </div>
    <div>
        <input type="string" v-model="teamOptions.name" />{{ teamOptions.name }}
        <input type="color" v-model="teamOptions.color" />{{ teamOptions.color }}
        <button @click="addTeam">Create Team</button>
    </div>
</template>
<style></style>