import { v } from "convex/values"
import { query } from "./_generated/server"
import { favorite } from "./board";

export const get = query({
    args: {
        orgId: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized")
        }

        const boards = await ctx.db
            .query("boards")
            .withIndex("byorg", (q) => q.eq("orgId", args.orgId))
            .order("desc")
            .collect()

            const boardswithFavoritesRelation = boards.map((board)=>{
                return ctx.db
                    .query("userFavorites")
                    .withIndex("by_user_board", (q)=> 
                    q
                     .eq("userId", identity.subject)
                     .eq("boardId", board._id)
                )
                .unique()
                .then(
                    (fav) => ({
                         ...board,
                        isFavorite: !! fav,
                    })
                )
            })

            const boardswithFavoritesBollean = Promise.all(boardswithFavoritesRelation)
        return  boardswithFavoritesBollean;
    }
});
