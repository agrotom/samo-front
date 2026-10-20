import type { ObjectiveData } from "@/api/objective";
import { BalanceTypes } from "@/common/balanceWheel";
import { calculateCompleteness } from "../objectives";

export function test_calculateCompleteness() {
    const objGoal = { id: 1, text: "Goal 1", deadLine: new Date(), favorite: false, createdAt: new Date(), completed: false };

    const obj1: ObjectiveData = {
        id: 0,
        label: "",
        text: "",
        favorite: false,
        balanceType: BalanceTypes.lifeBrightness,
        deadLine: new Date(),
        image_url: null,
        completed: false,
        goalsLabel: "",
        goals: []
    };

    const obj2: ObjectiveData = {
        ...obj1,
        goals: [
            { ...objGoal, completed: false },
            { ...objGoal, completed: false },
            { ...objGoal, completed: false }
        ]
    };

    const obj3: ObjectiveData = {
        ...obj1,
        goals: [
            { ...objGoal, completed: true },
            { ...objGoal, completed: false },
            { ...objGoal, completed: false }
        ]
    };

    const obj4: ObjectiveData = {
        ...obj1,
        goals: [
            { ...objGoal, completed: true },
            { ...objGoal, completed: true },
            { ...objGoal, completed: true }
        ]
    };

    console.assert(calculateCompleteness(obj1) === "100", "Test Case 1 Failed");
    console.assert(calculateCompleteness(obj2) === "0", "Test Case 2 Failed");
    console.assert(calculateCompleteness(obj3) === "33", "Test Case 3 Failed");
    console.assert(calculateCompleteness(obj4) === "100", "Test Case 4 Failed");  
}