"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema, signInFormSchema } from "@/lib/auth-schema";
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client";


export default function SignIn () {
    // 1. Define your form.
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  
  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    try {
        const { email, password } = values;
        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/dashboard"
        },
        {
            onSuccess: () => {
                form.reset()
            },
            onError: (ctx) => {
                toast.error(ctx.error.message)
            },
        });

        if (error) {
            throw error;
        }
    } catch (error) {
        toast.error("Something went wrong!")
    }
}


    return (
        <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Welcome Back! Please sign in to continue</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

    <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">Submit</Button>
      </form>
    </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">Dont Have an Account yet {' '}
          <Link href="/sign-up" className="text-primary hover:underline">
          Sign Up
          </Link>
          </p>
        </CardFooter>
      </Card>
      
    )
}