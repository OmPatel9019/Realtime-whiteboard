import { Orgsidebar } from "./component/org-sidebar";
import { Sidebar } from "./component/sidebar"; 
import { Navbar } from "./component/sidebar/navbar";
import { Toaster } from "@/components/ui/sonner";

// used to type the props of a component that accepts children — meaning any valid React node(s) passed between the component’s opening and closing tags.
interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <main className="flex flex-col h-screen overflow-hidden">
            <Sidebar />
            <div className="pl-[60px] h-full">
                <div className="flex gap-x-4 h-full">
                    <Orgsidebar />
                    <div className="flex-1 flex flex-col overflow-y-auto h-full">
                        <Navbar />
                        <Toaster />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout;