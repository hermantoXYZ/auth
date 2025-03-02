import { z } from "zod"

export const formSchema = z.object({
    name: z
    .string()
    .min(2, {message: 'xName must be at least 2 characters long'})
    .max(50, {message: 'xName cannot exceed 50 chracters'}),

    email: z 
    .string()
    .email({ message: 'xPlease enter a valid email address'})
    .min(2)
    .max(50),

    password: z 
    .string()
    .min(8, {message: "xPassword must be at least 8 characters long"})
    .max(50, {message: "xPassword cannot exceed 50 chracters"})
})

export const signInFormSchema = formSchema.pick({
    email: true,
    password: true
})