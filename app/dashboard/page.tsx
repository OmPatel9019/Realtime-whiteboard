import { Header } from "@/components/header";

const DashboardPage = () => {
  return (
    <div className="h-full">
      <Header />
      <main className="flex-1 h-[calc(100%-80px)] p-6">
        <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to your dashboard. Create a new board to get started.</p>
        {/* Add board list or empty state here later */}
      </main>
    </div>
  );
};

export default DashboardPage;