"use client"

import { use } from "react";
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./component/Empty-org";

interface DashBoardprops {
  searchParams: Promise<{
    search?: string;
    favorites?: string;
  }>
}

const DashboardPage = ({ searchParams }: DashBoardprops) => {
  const params = use(searchParams); // unwrap the Promise — required in Next.js 15
  const { organization } = useOrganization();

  return (
    <div className="flex-1 flex">
      {JSON.stringify(params)}
      {!organization ? (<EmptyOrg />) : (<p>Board List!</p>)}
    </div>
  );
};

export default DashboardPage;
