import Link from "next/link"
import { AirVent } from "lucide-react"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { buttonVariants } from "./ui/button";
import { redirect } from "next/navigation";

export default async function Navbar() {

    const session = await auth.api.getSession({
        headers: await headers()
    });


    return (
        <nav className="bg-gradient-to-r from-gray-900 to-black shadow-xl border-b border-zinc-800">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
                    <AirVent className="h-7 w-7 text-blue-300" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-white to-white-200 text-transparent bg-clip-text">
                        NextAuth
                    </span>
                </Link>
                <div className="space-x-6">
                    {
                        session ? (
                            <form action={ async () =>{
                                'use server'
                                await auth.api.signOut({
                                    headers: await headers()
                                });
                                redirect('/')
                            }}>
                                
                                <button type="submit" className={buttonVariants({variant:"custom", size: "lg"})}>
                                    Sign Out
                                </button>
                            </form>
                        ) : 
                        <Link href='/sign-in' className={buttonVariants({variant:"custom", size: "lg"})}>
                        Sign In
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}