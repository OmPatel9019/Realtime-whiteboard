"use client";

import { EmptySearch } from "./Empty-search";
 import { Favorites } from "./empty-favorites"
import { TeamBoards } from "./team-boards";

interface BoardListProps {
    orgId : string;
    query:{
        search?: string;
        favorites?: string;
    };
};

export const BoardList = ({
    orgId,
    query,
}:BoardListProps) =>{
  
  const data = [];
  
  if(!data?.length && query.search){
    return(
       <EmptySearch/>
    );
  };
  if(!data?.length && query.favorites ){
    return(
      <Favorites/>
    );
  };
  if(!data?.length){
    return(
      <TeamBoards/>
    );
  };

    return(
        <div>
            {JSON.stringify(query)}
        </div>
    )
}