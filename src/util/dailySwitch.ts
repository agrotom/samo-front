export default function setIsDaily(setIsDaily: (_: boolean) => void, setIsDarkMode: (_: boolean) => void, isDaily: boolean) {
    setIsDaily(isDaily);
    setIsDarkMode(!isDaily);
}