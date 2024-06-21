
import { z } from "zod";


// issue schema
export const Issueschema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    // we have many property in prisma schema but we are using title and description bcz other have default or auto generated 
});
export const PatchIssueschema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().min(1, "Description is required").optional(),
    assignedToUserId: z.string().min(1, "Assigned to UserId is required").optional().nullable()
    //using .nullable so that we can assign null value
});