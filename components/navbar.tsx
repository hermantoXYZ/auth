import Link from "next/link"
import { AirVent } from "lucide-react"

export default function Navbar() {
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
                    <Link 
                        href="/sign-in" 
                        className="text-blue-100 hover:text-white px-5 py-2.5 rounded-lg transition-all duration-300 hover:bg-blue-600/30 border border-blue-400/30"
                    >
                        Login
                    </Link>
                    <Link 
                        href="/sign-up" 
                        className="bg-white/95 text-blue-900 hover:bg-white px-5 py-2.5 rounded-lg transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    )
}