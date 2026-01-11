import { Orgsidebar } from "./component/org-sidebar";
import { Sidebar } from "./component/sidebar";
import { Navbar } from "./component/sidebar/navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <main className="h-full">
            <Sidebar />
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-4 h-full">
                    <Orgsidebar />
                    <div className="h-full flex-1">
                        <Navbar/>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;