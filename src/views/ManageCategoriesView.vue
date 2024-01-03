<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useGameStore } from "../stores/game";
import { RouterLink } from "vue-router";

export default {
    setup() {
        const editingCategory = ref(false);
        const creatingCategory = ref(false);
        const game = useGameStore();
        const fileContent = ref(null);
        const categoryForm = ref({
            id: '',
            name: '',
            questions: [
                {
                    id: '',
                    name: '',
                    value: 800,
                    image: '',
                    used: false,
                    answers: ['', '', '', ''],
                    correct_answer: '',
                },
                {
                    id: '',
                    name: '',
                    value: 500,
                    image: '',
                    used: false,
                    answers: ['', '', '', ''],
                    correct_answer: '',
                },
                {
                    id: '',
                    name: '',
                    value: 300,
                    image: '',
                    used: false,
                    answers: ['', '', '', ''],
                    correct_answer: '',
                },
                {
                    id: '',
                    name: '',
                    value: 200,
                    image: '',
                    used: false,
                    answers: ['', '', '', ''],
                    correct_answer: '',
                },
                {
                    id: '',
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
        const selectedCategories = ref(game.getSelectedCategories);
        function isCategorySelected(category) {
            return selectedCategories.value.some(cat => cat == category);
        }
        function clearInputs() {
            let newObj = {};
            let values = [800, 500, 300, 200, 100];
            newObj.id = '';
            newObj.name = '';
            newObj.questions = [];
            values.forEach((val) => {
                let questionObj = {};
                questionObj.value = val;
                questionObj.name = '';
                questionObj.id = '';
                questionObj.correct_answer = '';
                questionObj.answers = ['', '', '', ''];
                newObj.questions.push(questionObj);
            });
            categoryForm.value = { ...newObj };
        }
        function toggleCategory(identifier) {
            game.toggleCategory(identifier);
        }
        function editCategory(identifier) {
            editingCategory.value = true;
            const x = categoriesList.value.find(item => item._id == identifier);
            categoryForm.value = { ...x };
        }
        function addCategory() {
            creatingCategory.value = true;
        }
        function exitModal() {
            editingCategory.value = false;
            creatingCategory.value = false;
            clearInputs();
        }
        function isIncluded(identifier) {
            return selectedCategories.value?.some(category => category == identifier);
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
                exitModal();
            }
            catch (error) {
                console.error(`Error while creating category ${categoryForm.value._id}:`, error.message);
            }
        }
        async function submitCategory(method) {
            try {
                const response = method == 'create' ?
                    await axios.post('http://localhost:3000/api/category/', categoryForm.value) :
                    await axios.put('http://localhost:3000/api/category/', categoryForm.value);
                fetchAllCategories();
                exitModal();
            }
            catch (error) {
                console.error(`Error while ${method == 'create' ? 'creating' : 'editing'} category ${categoryForm.value._id}:`, error.message);
                creatingCategory.value = false;
                editingCategory.value = false;
            }
            creatingCategory.value = false;
            editingCategory.value = false;
        }
        async function removeCategory(categoryID) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/category/${categoryID}`);
                fetchAllCategories();
            }
            catch (error) {
                console.error(`Error while deleting category ${categoryID}:`, error.message);
            }
        }
        async function fetchAllCategories() {
            try {
                console.log('fetching categories');
                const response = await axios.get('http://localhost:3000/api/categories/');
                categoriesList.value = response.data.categories;
                console.log("resp", response.data);
            }
            catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        }
        onMounted(() => {
            fetchAllCategories();
        });
        return {
            categoryForm,
            editingCategory,
            creatingCategory,
            fileContent,
            isCategorySelected,
            submitCategory,
            clearInputs,
            addCategory,
            removeCategory,
            uploadFromFile,
            addCategoriesFromFile,
            selectedCategories,
            categoriesList,
            toggleCategory,
            isIncluded,
            editCategory,
            exitModal
        };
    },
    components: { RouterLink }
}
</script>
<template>
    <Teleport v-if="editingCategory || creatingCategory" to="body">
        <div class="modal">
            <div id="add-category-form">
                <button @click="exitModal" class="btn-exit-modal"><font-awesome-icon icon="fa-solid fa-x" /></button>
                <label class="form-label">Category:
                    <input class="form-input" type="text" v-model="categoryForm.name">
                </label>
                <label class="form-label"> ID:
                    <input class="form-input" type="text" v-model="categoryForm.id">
                </label>
                <div class="question-form" v-for="question in categoryForm.questions" :key="question.id">
                    <label class="form-label"> Question for {{ question.value }}:
                        <input class="form-input" type="text" v-model="question.name">
                    </label>
                    <div class="question-answers">
                        <span class="questions-title">Answers:</span>
                        <label v-for="answer, index in question.answers" :key="index" class="question-answer">
                            <input class="form-input" type="text" v-model="question.answers[index]">
                        </label>
                        <label class="form-label">
                            Correct Answer:
                            <select v-model="question.correct_answer">
                                <option v-for="answer, index in question.answers" :key="index">{{ answer }}</option>
                            </select>
                        </label>
                    </div>
                </div>
                <div v-if="creatingCategory">
                    <button @click="submitCategory('create')" class="confirm-modal">
                        <font-awesome-icon icon="fa-solid fa-plus" /> Create category
                    </button>

                </div>
                <div v-else-if="editingCategory">
                    <button @click="submitCategory('edit')" class="confirm-modal">
                        <font-awesome-icon icon="fa-solid fa-check" /> Confirm changes
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
    <h3>Manage Categories</h3>
    <div>
        <span>Selected: {{ selectedCategories.length }}/5</span>
    </div>
    <div id="category-table" v-if="categoriesList.length">
        <div class="row" v-for="category, index in categoriesList" :key="index">

            <div class="category-name" :class="{ 'selected': isCategorySelected(category._id) }"
                @click="toggleCategory(category._id)">
                {{ category.name }}
            </div>

            <div class="category-btns">
                <button class="btn btn-sticker" @click="editCategory(category._id)">
                    <font-awesome-icon class="sticker-outline" icon="fa-solid fa-pen" />
                    <font-awesome-icon class="sticker" icon="fa-solid fa-pen" />
                </button>
                <button class="btn btn-sticker" @click="removeCategory(category._id)">
                    <font-awesome-icon class="sticker-outline" icon="fa-solid fa-trash" />
                    <font-awesome-icon class="sticker" icon="fa-solid fa-trash" />
                </button>
            </div>
        </div>
    </div>
    <div v-else>
        <font-awesome-icon icon="fa-solid fa-trash" />
        <span>There are no categories.</span>
    </div>

    <button class="btn btn-org margin-top" @click="addCategory"> <font-awesome-icon icon="fa-solid fa-plus" /> Create
        Category</button>
    <div class="file-input btn-group margin-top">
        <label class="btn btn-org">
            Import from JSON
            <input class="hidden " type="file" @change="uploadFromFile" accept="application/JSON">
        </label>
        <button class="btn btn-org" :class="{ 'non-valid': fileContent == null }" @click="addCategoriesFromFile">
            Upload file
        </button>
    </div>
    <RouterLink to="/categories">
        <button class="btn btn-org">
            Start
        </button>
    </RouterLink>
</template>

<style scoped>
#notepad-paper>* {
    width: 100%;
}

.btn-org {
    max-width: fit-content;
    margin: auto;
    margin-top: 1rem;
    flex-basis: 100%;
}

#category-table {
    display: flex;
    flex-wrap: wrap;
}

.row {
    width: 60%;
    display: flex;
    margin: auto;
}

.category-name {
    flex-grow: 1;
    text-align: left;
    cursor: pointer;
}

.category-name:hover {
    filter: brightness(2);
    /*TODO: change hover color*/
}

.category-btns {
    display: flex;
    justify-content: space-around;
    width: 20%;
}

.selected {
    color: var(--pink);
}

.btn-sticker {
    position: relative;
    background-color: transparent;
    color: var(--white);
}

.btn-sticker:hover .sticker {
    color: var(--orange);
}

.btn-sticker:hover .sticker-outline {
    stroke: var(--white);
}

.sticker {
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    top: 10%;
    margin: auto;
}

.sticker-outline {
    fill: none;
    stroke: var(--orange);
    stroke-width: 200;
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    top: 10%;
    margin: auto;
}

#add-category-form {
    position: relative;
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 2rem;
    background-color: white;
    margin: auto;
    margin-top: 3rem;
    margin-bottom: 3rem;
    border-radius: 0.8rem;
    max-height: 80%;
    overflow: scroll;
}

.question-form {
    margin-top: 2rem;
}

.questions-title {
    width: 100%;
}

.question-answers {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}


.question-answer {
    width: 40%;
    padding: 0.5rem;
}
</style>