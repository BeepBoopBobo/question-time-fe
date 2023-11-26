<script>
import { ref, onMounted, computed } from "vue";
import { useRoute } from 'vue-router';
import axios from "axios";
import { useGameStore } from "../stores/game";

export default {
    setup() {
        const route = useRoute();
        const questionId = computed(() => route.params.id);
        const question = ref({});
        const x = ref([]);
        const game = useGameStore();
        onMounted(() => {
            fetchQuestion();
        })

        async function fetchQuestion() {
            const selectedIds = game.getSelectedCategories;
            selectedIds.forEach(async item => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/categories/${item}`);
                    let questions = response.data.searchedCategory.questions;
                    questions.forEach(q => {
                        if (q.id == questionId.value) {
                            question.value = q;
                        }
                    })
                    console.log("resp", response.data);
                }
                catch (error) {
                    console.error('Error fetching players:', error);
                }
            })
        }
        return {
            question,
            questionId,
            game,
            x
        }
    }
}
</script>

<template>
    <h3>Question: {{ question.name }}</h3>
    <div id="answers">
        <button class="answer-btn" v-for="answer in question.answers" :key="answer.id">{{ answer }}</button>
    </div>
</template>
<style></style>