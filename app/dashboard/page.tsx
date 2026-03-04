"use client"

import { use } from "react";
import { useOrganization } from "@clerk/nextjs";
import { EmptyOrg } from "./component/Empty-org";
import { BoardList } from "./component/board-list";

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
      {/* params are displayed inside BoardList; no need to stringify here */}
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList
          orgId={organization.id}
          query={params}
        />
      )}
    </div>
  );
};

export default DashboardPage;
