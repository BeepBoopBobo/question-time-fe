import { defineStore } from "pinia";

export const useGameStore = defineStore({
    id: "game",
    state: () => ({
        turn: 0,
        selectedCategories: [],
        teams: []
    }),
    actions: {
        addPointsToTeam(team, pointAmount) {
            const pointsTo = this.teams.find(t => t.name == team);
            pointsTo.score += pointAmount;
        },
        toggleCategory(passedCategory) {
            if (this.selectedCategories.length < 5) {
                const indexOfCategory = this.selectedCategories.indexOf(passedCategory);
                indexOfCategory != -1 ?
                    this.selectedCategories.splice(indexOfCategory, 1) :
                    this.selectedCategories.push(passedCategory)
            }
        },
        addTeam(teamObj) {
            this.teams.push(teamObj);
        },
        removeTeam(teamName) {
            const indexOfTeam = this.teams.indexOf(team => team.name == teamName);
            this.teams.splice(indexOfTeam, 1);
        },
        nextTurn() {
            this.turn++;
        },
        writeState() {
            console.log(this);
        }
    },
    getters: {
        getTeams() {
            return this.teams
        },
        getTurn() { return this.turn },
        getSelectedCategories() { return this.selectedCategories },
    }
})