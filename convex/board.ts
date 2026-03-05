// This file contains Convex mutations for managing boards in the application.
// It defines operations like creating a new board, ensuring proper authorization.

import { v } from "convex/values";
import { mutation } from "./_generated/server";

// Array of images
const images = [
    // /palceholders/1.svg
]

// Mutation to create a new board.
// This mutation requires the user to be authenticated and provides the organization ID and board title.
export const create = mutation({
    // Define the arguments for the mutation: organization ID and board title, both as strings.
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    // The handler function that executes the mutation logic.
    handler: async(ctx, args) => {
        // Retrieve the user's identity to check if they are authenticated.
        const identity = await ctx.auth.getUserIdentity();

        // If no identity is found, throw an error to prevent unauthorized access.
        if (!identity) {
            throw new Error("Unauthorized");
        }
     const randomImages =[Math.floor(Math.random() * images.length)]

     const board = await ctx.db.insert("boards",{
        title: args.title,
        orgId : args.orgId,
        authorId: identity.subject,
        authorname : identity.name!,
        imageUrl: randomImages,
     })

     return board;
    }
});