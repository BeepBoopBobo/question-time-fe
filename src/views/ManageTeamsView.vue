<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useGameStore } from "../stores/game";
import { RouterLink } from "vue-router";

export default {
    setup() {
        const game = useGameStore();
        const createdTeams = ref(game.getTeams);
        const teamOptions = ref({
            name: "",
            color: "#000000",
            isTextBlue: false,
            order: 0,
            score: 0,
        });
        const categories = ref(null);
        async function addTeam() {
            const highestOrder = Math.max(createdTeams.value.map(team => team.order)) || 0;
            teamOptions.value.order = highestOrder++;
            let passedObj = { ...teamOptions.value };
            game.addTeam(passedObj);
            clearInputs();
        }
        function clearInputs() {
            teamOptions.value.name = "";
            teamOptions.value.color = "#000000";
            teamOptions.value.isTextBlue = false;
        }
        function deleteTeam(teamName) {
            game.removeTeam(teamName);
        }
        onMounted(() => {
            fetchTeams();
        });
        async function fetchTeams() {
            try {
                const response = await axios.get('http://localhost:3000/api/categories/');
                categories.value = response.data;
                console.log("resp", response.data);
            }
            catch (error) {
                console.error('Error fetching players:', error);
            }
        }
        return {
            addTeam,
            clearInputs,
            deleteTeam,
            createdTeams,
            teamOptions,
            categories
        };
    },
    components: { RouterLink }
}
</script>
<template>
    <h3>Team Creation</h3>
    <div id="create-team-form">
        <label class="inp-label">
            Team name:
            <div class="inp-group">
                <input class="inp inp-text" type="string" v-model="teamOptions.name" />
            </div>
        </label>
        <label class="inp-label">
            Team color:
            <div class="inp-group">
                <input class="inp inp-checkbox" type="checkbox" v-model="teamOptions.isTextBlue" />
                <input class="inp inp-selcol" type="color" v-model="teamOptions.color" />
                <input class="inp inp-text" type="string" v-model="teamOptions.color">
            </div>
        </label>
        <label class="inp-label">
            Overview:
            <div id="team-overview-bar" :style="{ 'background-color': teamOptions.color }">
                <span :class="{ 'blue-text': teamOptions.isTextBlue }" id="team-overview-name">
                    {{ teamOptions.name }}
                </span>
            </div>
        </label>
        <button class="btn btn-org" @click="addTeam">Create Team</button>
    </div>
    <RouterLink to="/manage-categories">
        <button class="btn btn-org">
            Next
        </button>
    </RouterLink>
</template>
<style scoped>
.btn-org {
    margin: auto;
    margin-top: 1rem;
}

#create-team-form {
    display: flex;
    flex-wrap: wrap;
    width: 40%;
    margin: auto;
}

.inp {
    border: none;
    border-radius: 0.5rem;
}

.inp-text {
    height: 2.5rem;
}

.inp-group {
    display: flex;
    align-items: center;
}

/* Remove default styling of checkbox */
.inp-checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    height: 2.5rem;
    width: 2.5rem;
    border: none;
    margin: 0;
    background-color: var(--white);
    cursor: pointer;
}

.inp-checkbox:checked {
    background-color: var(--text);

}

/* Adjust color input to match height and square shape */
.inp-selcol {
    height: 2.5rem;
    width: 2.5rem;
    border: none;
    margin: 0;
    padding: 0;
    background-color: transparent;

}

.inp-selcol::-webkit-color-swatch,
.inp-selcol::-moz-color-swatch {
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
}


.inp-group,
.inp-label {
    width: 100%;
}

.inp-group {
    display: flex;
    gap: 1rem;
}

.inp-label {
    text-align: left;
}

.inp-label:not(:first-child) {
    margin-top: 1rem;
}

.blue-text {
    color: var(--text);
}

.inp-text {
    flex-grow: 1;
    text-align: center;
}

#team-overview-bar {
    height: 4rem;
    width: 100%;
    background-color: black;
    color: var(--white);
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>