import { Orgsidebar } from "./component/org-sidebar";
import { Sidebar } from "./component/sidebar";
import { Navbar } from "./component/sidebar/navbar";

// used to type the props of a component that accepts children — meaning any valid React node(s) passed between the component’s opening and closing tags.
interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <main className="h-min-screen">
            <Sidebar />
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-4 h-full">
                    <Orgsidebar />
                    <div className="h-full flex-1">
                        <Navbar/>
                        {/* the {children} prop refers to the content of the page.tsx that is being rendered inside that layout. */}
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;