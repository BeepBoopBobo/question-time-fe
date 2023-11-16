import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
    state: () => {
        return {
            turn: 0,
            selectedCategories: [],
            teams: [
                {
                    name: "ABC",
                    color: "#fff",
                    order: 0,
                    score: 0,
                },
                {
                    name: "123",
                    color: "#3d3d3d",
                    order: 1,
                    score: 0,
                },
                {
                    name: "XYZ",
                    color: "#AA1560",
                    order: 2,
                    score: 0,
                },
            ]
        }
    },
    actions: {
        addPointsToTeam(team, pointAmount) {
            console.log('adding points to', team)
            const pointsTo = this.teams.find(t => t.name == team);
            pointsTo.score += pointAmount;
        },
        toggleCategory(passedCategory) {
            if (this.selectedCategories.length <= 5) {
                const indexOfCategory = this.selectedCategories.indexOf(category => category == passedCategory);
                indexOfCategory != undefined ?
                    this.selectedCategories.splice(indexOfCategory, 1) :
                    this.selectedCategories.push(this.passedCategory)
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
        getTeams() { return this.teams },
        getTurn() { return this.turn },
        getCategories() { return this.selectedCategories },
    }
})