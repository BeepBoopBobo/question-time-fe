<script>
import { ref, onMounted } from "vue";
import axios from "axios";
export default {
    setup() {
        const x = "lole";
        const categories = ref(null);

        onMounted(() => {
            fetchCategories();
        })

        async function fetchCategories() {
            try {
                const response = await axios.get('http://localhost:3000/api/categories/');
                categories.value = response.data;
                console.log("resp", response.data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        }
        return {
            x,
            categories
        }
    }
}
</script>
<template>
    <ul>
        <li v-for="category in categories" :key="category.id">
            {{ category.name }}
        </li>
    </ul>
</template>
<style></style>