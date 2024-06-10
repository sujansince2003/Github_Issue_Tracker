
import { z } from "zod";


// issue schema
export const Issueschema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    // we have many property in prisma schema but we are using title and description bcz other have default or auto generated 
});