import * as React from "react";
import Router, { useRouter } from "next/router";

function BottomNav() {
    const router = useRouter();

    return (
        <nav className={"bg-white max-w-[390px] border-t fixed bottom-0 w-full pb-3 pt-5 flex justify-between text-xs"}>

        </nav>
    );
}
export default BottomNav;