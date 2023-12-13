<script>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useGameStore } from "../stores/game";

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

        function clearInputs() {
            let newObj = {}
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
            })
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
            return selectedCategories.value?.some(category => category == identifier)
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
            } catch (error) {
                console.error(`Error while creating category ${categoryForm.value._id}:`, error.message);
            }
        }

        async function submitCategory(method) {
            try {
                const response =
                    method == 'create' ?
                        await axios.post('http://localhost:3000/api/category/', categoryForm.value) :
                        await axios.put('http://localhost:3000/api/category/', categoryForm.value);
                fetchAllCategories();
                exitModal();
            } catch (error) {
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
            categoryForm,
            editingCategory,
            creatingCategory,
            fileContent,
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
        }
    }
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
    <h3 class="green-highlight"><span class="highlight">Manage Categories</span></h3>
    <div>
        <span>Selected: {{ selectedCategories.length }}/5</span>
    </div>

    <table id="categories-table">
        <tr>
            <th class="table-cell">Select</th>
            <th class="table-cell-name">Name</th>
            <th class="table-cell">Edit</th>
            <th class="table-cell">Delete</th>
        </tr>
        <template v-if="categoriesList.length">
            <tr v-for="category, index in categoriesList" :key="index">
                <td class="table-cell">
                    <button class="btn" @click="toggleCategory(category._id)">
                        <font-awesome-icon v-if="isIncluded(category._id)" icon="fa-solid fa-square-check" />
                        <font-awesome-icon v-else icon="fa-solid fa-square" />
                    </button>
                </td>
                <td class="table-cell-name">
                    {{ category.name }}
                </td>
                <td class="table-cell">
                    <button class="btn" @click="editCategory(category._id)"><font-awesome-icon
                            icon="fa-solid fa-pen" /></button>
                </td>
                <td class="table-cell">
                    <button class="btn" @click="removeCategory(category._id)">
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
    <button class="btn btn-fill margin-top" @click="addCategory"> <font-awesome-icon icon="fa-solid fa-plus" /> Create
        Category</button>
    <div class="file-input btn-group margin-top">
        <label class="btn btn-fill">
            Select JSON file
            <input class="hidden " type="file" @change="uploadFromFile" accept="application/JSON">
        </label>
        <button class="btn btn-fill" :class="{ 'non-valid': fileContent == null }" @click="addCategoriesFromFile">
            Upload file
        </button>
    </div>
</template>

<style>
.green-highlight:before {
    transform: rotate(0.5deg);
    padding: 0 7px;
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