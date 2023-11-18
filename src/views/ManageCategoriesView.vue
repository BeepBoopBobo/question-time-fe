<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useGameStore } from "../stores/game";

export default {
    setup() {
        const game = useGameStore();

        const categories = ref(null);

        onMounted(() => {
            fetchAllCategories();
        })

        async function fetchAllCategories() {
            try {
                const response = await axios.get('http://localhost:3000/api/categories/');
                categories.value = response.data;
                console.log("resp", response.data);
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        }
        return {
            categories
        }
    }
}
</script>
<template>
    <h3>Manage Categories</h3>
</template>
<style></style>