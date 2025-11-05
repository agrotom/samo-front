import { Outlet } from "react-router-dom";

export default function SignTemplate() {
    return (
        <main className="flex flex-col relative justify-center items-center md:h-[calc(100vh-60px)]">
            <p className="md:absolute md:left-15 md:top-5 md:mb-0 mb-15 font-bold text-active-bar text-[25px]">Samo</p>
            <Outlet />
        </main>
    );
}