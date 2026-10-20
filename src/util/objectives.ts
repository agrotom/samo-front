import type { ObjectiveData } from "@/api/objective";

export function calculateCompleteness(data: ObjectiveData): string {
    if (data.goals == undefined) { return "0" }
    var allGoals = data.goals.length;
    
    var completedGoal = data.goals.filter(goal => goal.completed).length;

    if (allGoals == 0) {
        return "100";
    }

    return (completedGoal / allGoals * 100).toFixed(0);
}