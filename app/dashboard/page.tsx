import { Header } from "@/components/header";

const DashboardPage = () => {
  return (
    <div className="h-full">
      <Header />
      <main className="bg-red-500">
        <h2 className="text-3xl font-bold ">Dashboard</h2>
      </main>
    </div>
  );
};

export default DashboardPage;