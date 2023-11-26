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
    <div id="questions">
        <div v-for="category in selectedCategories" :key="category.id" class="question-row">
            <span>{{ category.name }}</span>
            <RouterLink :to="`/question/${question.id}`" v-for="question in category.questions" :key="question.id">
                <button class="question-btn" :class="{ 'disabled': question.used }">
                    {{ question.value }}
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
#questions {
    display: flex;
    width: 90%;
    gap: 1rem;
}

.question-row {
    text-align: center;
}

.question-btn {
    padding: 1rem;
    margin: 0.5rem 1rem;
    width: 100%;
}

.question-btn.disabled {
    color: red;
    background-color: darkgray;
}
</style>