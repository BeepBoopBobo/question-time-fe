<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
import { useGameStore } from "../stores/game";

export default {
    setup() {
        const game = useGameStore();
        const selectedCategories = ref([]);

        onMounted(() => {
            filterSelected();
        });

        //temp
        function addPoints() {
            game.addPointsToTeam("ABC", 100);
        }

        async function filterSelected() {
            const selectedIds = game.getSelectedCategories;
            selectedIds.forEach(async item => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/categories/${item}`);
                    selectedCategories.value.push(response.data.searchedCategory);
                    console.log("resp", response.data);
                }
                catch (error) {
                    console.error('Error fetching players:', error);
                }
            })
        }

        return {
            addPoints,
            game,
            selectedCategories
        };
    },
    components: { RouterLink }
}
</script>
<template>
    <h3>Select a question:</h3>
    <div id="questions">
        <div v-for="category in selectedCategories" :key="category.id" class="q-card">
            <span class="q-name">{{ category.name }}</span>
            <RouterLink :to="`/question/${question.id}`" v-for="question in category.questions" :key="question.id">
                <button class="btn q-btn" :class="{ 'disabled': question.used }">
                    {{ question.value }}
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
#questions {
    display: flex;
    justify-content: center;
    width: 75%;
    margin: auto;
    gap: 1rem;
    height: 500px;
}

.q-name {
    width: 100%;
    user-select: none;
}

.q-card {
    margin-top: 5px;
    padding: 8px;
    max-width: 18%;
    background-color: var(--white);
    display: flex;
    flex-wrap: wrap;
    border-radius: 8px;
    box-shadow: 5px 5px 0 0;
    min-height: max-content;
}

.q-card:hover {
    margin-top: -5px;
    box-shadow: 5px 10px 5px 5px;

}

.q-card>* {
    width: 100%;
}

.q-btn {
    padding: 1rem;
}

.q-btn.disabled {
    color: red;
    background-color: darkgray;
}
</style>