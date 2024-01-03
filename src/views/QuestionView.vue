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
        }
    }
}
</script>

<template>
    <h3 class="id-card">{{ question.id }} </h3>
    <span id="question">{{ question.name }}</span>
    <div id="image-container">
        <img id="image" :src="question.image">
        <div id="image-tape"></div>
    </div>
    <div id="answers-container">
        <button class="btn answer-btn" v-for="answer in question.answers" :key="answer.id">
            <span class="answer-text">
                {{ answer }}
            </span>
        </button>
    </div>
</template>
<style>
.answer-btn:hover {
    color: var(--white);
    outline: 5px solid var(--orange);
}

#question {
    width: 60%;
    margin: 0 auto 0 auto;
    height: fit-content;
}

#image-tape {
    margin: auto;
    margin-bottom: -1.2rem;
    background-color: rgba(221, 178, 112, 0.5);
    width: 50%;
    height: 3rem;
    z-index: 5;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

#image {
    z-index: 1;
    width: 40%;
    margin-top: 1.2rem;
    aspect-ratio: 1/1;
    background-color: var(--blue);
    border: 1rem solid var(--white);
    box-sizing: border-box;
    object-fit: cover;
}

.id-card {
    width: fit-content;
    margin: auto;
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    text-transform: uppercase;
    color: var(--text);
}

#image-container {
    position: relative;
    width: 60%;
    margin: auto;
}

#answers-container {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    margin: auto;
    gap: 5%;
}

.answer-btn {
    width: 47.5%;
    padding: 1rem;
    margin-top: 1rem;
    color: var(--white);
    box-shadow: 10px 2px 6px 0px rgba(0, 0, 0, 0.25);
}

.answer-text {
    text-transform: uppercase;
    text-shadow: 1px 1px 5px var(--text);
}

.answer-btn:nth-of-type(1) {
    background-color: var(--pink);
}

.answer-btn:nth-of-type(2) {
    background-color: var(--green);
}

.answer-btn:nth-of-type(3) {
    background-color: var(--blue);
}

.answer-btn:nth-of-type(4) {
    background-color: var(--yellow);
}
</style>