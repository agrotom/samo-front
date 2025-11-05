import { useEffect, useState } from "react";

export default function Lists() {
    const [isDaily, setIsDaily] = useState<boolean>();

    useEffect(() => {
        document.documentElement?.setAttribute("data-theme", !isDaily ? "dark" : "light");
    });

    return (
        <div onClick={ () => setIsDaily(!isDaily) } className=" bg-brand size-16">

        </div>
    );
}