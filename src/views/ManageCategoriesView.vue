<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useGameStore } from "../stores/game";

export default {
    setup() {
        const game = useGameStore();
        const fileContent = ref(null);
        const newCategory = ref({
            _id: '',
            name: '',
            questions: [
                {
                    _id: '',
                    name: '',
                    value: 800,
                    image: '',
                    used: false,
                    answers: ['', '', '', ''],
                    correct_answer: '',
                },
                {
                    _id: '',
                    name: '',
                    value: 500,
                    image: '',
                    used: false,
                    answers: ['', '', '', ''],
                    correct_answer: '',
                },
                {
                    _id: '',
                    name: '',
                    value: 300,
                    image: '',
                    used: false,
                    answers: ['', '', '', ''],
                    correct_answer: '',
                },
                {
                    _id: '',
                    name: '',
                    value: 200,
                    image: '',
                    used: false,
                    answers: ['', '', '', ''],
                    correct_answer: '',
                },
                {
                    _id: '',
                    name: '',
                    value: 100,
                    image: '',
                    used: false,
                    answers: ['', '', '', ''],
                    correct_answer: '',
                },
            ]
        });
        const categoriesList = ref([]);
        const selectedCategories = computed(() => game.getCategories);
        const selectedLength = computed(() => selectedCategories.value?.length);

        function toggleCategory(identifier) {
            game.toggleCategory(identifier);
        }

        async function uploadFromFile(event) {
            const files = event.target.files;
            if (files.length > 0) {
                const selectedFile = files[0];
                const reader = new FileReader();
                reader.onload = (e) => {
                    fileContent.value = e.target.result;
                };
                reader.readAsText(selectedFile);
            }
        }

        async function addCategoriesFromFile() {
            const formData = new FormData();
            formData.append('categories', fileContent.value);
            try {
                const response = await axios.post('http://localhost:3000/api/categories/', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                fetchAllCategories();
                console.log(response);
            } catch (error) {
                console.error(`Error while creating category ${newCategory.value._id}:`, error.message);
            }
        }

        async function addCategory() {
            try {
                const response = await axios.post('http://localhost:3000/api/category/', newCategory.value);
                fetchAllCategories();
            } catch (error) {
                console.error(`Error while creating category ${newCategory.value._id}:`, error.message);
            }
        }

        async function removeCategory(categoryID) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/category/${categoryID}`);
                fetchAllCategories();
            } catch (error) {
                console.error(`Error while deleting category ${categoryID}:`, error.message);
            }
        }

        async function fetchAllCategories() {
            try {
                console.log('fetching categories')
                const response = await axios.get('http://localhost:3000/api/categories/');
                categoriesList.value = response.data.categories;
                console.log("resp", response.data);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        }

        onMounted(() => {
            fetchAllCategories();
        })

        return {
            newCategory,
            addCategory,
            removeCategory,
            uploadFromFile,
            addCategoriesFromFile,
            selectedLength,
            selectedCategories,
            categoriesList,
            toggleCategory
        }
    }
}
</script>
<template>
    <h3>Manage Categories</h3>
    <span>Selected: {{ selectedLength }}/5</span>
    <table id="categories-table">
        <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Select</th>
            <th>Delete</th>
        </tr>
        <template v-if="categoriesList.length">
            <tr v-for="category, index in categoriesList" :key="index">
                <td>
                    {{ category.name }}
                </td>
                <td>
                    -
                </td>
                <td>
                    <input type="checkbox" @click="toggleCategory(category._id)" />
                </td>
                <td>
                    <button @click="removeCategory(category._id)">
                        <font-awesome-icon icon="fa-solid fa-trash" />
                    </button>
                </td>
            </tr>
        </template>
        <template v-else>
            <font-awesome-icon icon="fa-solid fa-trash" />
            <span>There are no categories.</span>
        </template>
    </table>

    <div id="add-category-form">
        <label class="form-label"> ID:
            <input class="form-input" type="text" v-model="newCategory._id">
        </label>
        <label class="form-label">Category:
            <input class="form-input" type="text" v-model="newCategory.name">
        </label>
        <div class="question-form" v-for="question in newCategory.questions" :key="question._id">
            <span>{{ question.value }}</span>
            <label class="form-label"> Question:
                <input class="form-input" type="text" v-model="question.name">
            </label>
            <label v-for="answer, index in question.answers" :key="index">
                Answer #{{ index + 1 }}:
                <input class="form-input" type="text" v-model="question.answers[index]">
            </label>
            <label class="form-label">
                Correct Answer:
                <select v-model="question.correct_answer">
                    <option v-for="answer, index in question.answers" :key="index">{{ answer }}</option>
                </select>
            </label>
        </div>
        <button @click="addCategory">
            <font-awesome-icon icon="fa-solid fa-plus" /> Create
        </button>
    </div>
    <input type="file" @change="uploadFromFile" accept="application/JSON">
    <button @click="addCategoriesFromFile">Upload file</button>
</template>

<style>
#add-category-form {
    width: 250px;
    display: flex;
    flex-wrap: wrap;
}

.question-form {
    margin-top: 1rem;
    margin-left: 0.5rem;
}

.form-label,
.form-input {
    width: 100%;
}
</style>