
import { NewButton } from "./new-button";

export const Sidebar = () => {
    return (
        <aside className="fixed z-[1] left-0 bg-green-500 h-full w-[60px] flex-col flex px-3 gap-y-4 text-white text-bold">
            <NewButton/>
        </aside>
    );
};
