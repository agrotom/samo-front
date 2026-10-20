import { clamp } from "../math";

export function testClamp() {
    console.assert(clamp(5, 1, 10) === 5, 'Test Case 1 Failed');
    console.assert(clamp(-5, 0, 10) === 0, 'Test Case 2 Failed');
    console.assert(clamp(15, 0, 10) === 10, 'Test Case 3 Failed');
    console.assert(clamp(7, 7, 7) === 7, 'Test Case 4 Failed');
    console.assert(clamp(5, 10, 1) === 5, 'Test Case 5 Failed');
}