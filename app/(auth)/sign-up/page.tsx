"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner"
import { useRouter } from "next/navigation"


export default function SignUp () {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })
 
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { name, email, password } = values;
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/sign-in"
            },
            {
                onRequest: () => {
                    toast.loading("Creating your account...", {
                        duration: 20,
                    })
                },
                onSuccess: () => {
                    form.reset()
                    toast.success("Account created successfully!")
                    router.push('/sign-in')
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                    form.setError('email', {
                      type: 'manual',
                      message: ctx.error.message
                    })
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
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your acctount to get started</CardDescription>
        </CardHeader>
        <CardContent>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          <p className="text-sm text-muted-foreground">Already have an account {' '}
          <Link href="/sign-in" className="text-primary hover:underline">
          Sign In
          </Link>
          </p>
        </CardFooter>
      </Card>
      
    )
}