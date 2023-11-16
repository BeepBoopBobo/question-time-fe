<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";
import { useGameStore } from "../stores/game";

export default {
    setup() {
        const game = useGameStore();
        const categories = ref(null);
        let categoryMock = [
            {
                id: "0",
                name: 'Category 2',
                questions: [
                    {
                        id: "00800",
                        name: 'Question 1 for Category 2',
                        value: 800,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "00500",
                        name: 'Question 2 for Category 2',
                        value: 500,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "00300",
                        name: 'Question 3 for Category 2',
                        value: 300,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "00200",
                        name: 'Question 4 for Category 2',
                        value: 200,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "00100",
                        name: 'Question 5 for Category 2',
                        value: 100,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                ]
            },
            {
                id: "1",
                name: 'Category XX',
                questions: [
                    {
                        id: "01800",
                        name: 'Question 1 for Category XX',
                        value: 800,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "01500",
                        name: 'Question 2 for Category XX',
                        value: 500,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "01300",
                        name: 'Question 3 for Category XX',
                        value: 300,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "01200",
                        name: 'Question 4 for Category XX',
                        value: 200,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "01100",
                        name: 'Question 5 for Category XX',
                        value: 100,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                ]
            },
            {
                id: "2",
                name: 'darkest secret',
                questions: [
                    {
                        id: "02800",
                        name: 'Question 1 for darkest secret',
                        value: 800,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "02500",
                        name: 'Question 2 for darkest secret',
                        value: 500,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "02300",
                        name: 'Question 3 for darkest secret',
                        value: 300,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "02200",
                        name: 'Question 4 for darkest secret',
                        value: 200,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: false
                    },
                    {
                        id: "02100",
                        name: 'Question 5 for darkest secret',
                        value: 100,
                        answers: ['wrong answer 1', 'correct answer', 'wrong answer 2', 'wrong answer 3'],
                        correct_answer: 'correct answer',
                        used: true
                    },
                ]
            },
        ];
        onMounted(() => {
            fetchCategories();
        });
        function addPoints() {
            console.log("adding points");
            game.addPointsToTeam("ABC", 100);
        }
        async function fetchCategories() {
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
            addPoints,
            game,
            categories,
            categoryMock
        };
    },
    components: { RouterLink }
}
</script>
<template>
    <div id="questions">
        <div v-for="category in categoryMock" :key="category.id" class="question-row">
            <span>{{ category.name }}</span>
            <RouterLink :to="`/question/${question.id}`" v-for="question in category.questions" :key="question.value">
                <button class="question-btn" :class="{ 'disabled': question.used }">
                    {{ question.value }}
                </button>
            </RouterLink>
        </div>
        <button @click="addPoints(), game.writeState()">add 100 points</button>
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