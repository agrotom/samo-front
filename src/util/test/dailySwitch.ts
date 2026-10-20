import setIsDaily from "../dailySwitch";

export function test_setIsDaily() {
    var dailyState = true;
    var darkModeState = false;

    const setIsDailyFunc = (value: boolean) => {
        dailyState = value;
    };

    const setIsDarkMode = (value: boolean) => {
        darkModeState = value;
    };

    setIsDaily(setIsDailyFunc, setIsDarkMode, true);

    console.assert(dailyState === true, "Test Case 1 Failed");
    console.assert(darkModeState === false, "Test Case 1 Failed");
}