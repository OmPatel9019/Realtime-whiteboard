import { NewButton } from "./new-button";
import { List } from "./list"

export const Sidebar = () => {
    return (
        // Followinng tags allow you to show titles and logos of created organizations
        <aside className="fixed z-[1] left-0 bg-purple-950 h-full w-[60px] flex px-3 flex-col gap-y-4 text-white text-bold">
            <List/>
           <NewButton/>
        </aside>
    );
};