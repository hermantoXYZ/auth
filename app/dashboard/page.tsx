import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import { headers } from "next/headers";


export default async function DashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return redirect ('/')
    }

    const user = session?.user;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome Back! {user.name}</CardTitle>
                        <CardDescription>Your email account {user.email} </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Here's what's happening with your account today.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Statistics</CardTitle>
                        <CardDescription>Your activity overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <p>Total Logins: 5</p>
                            <p>Last Login: Today</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                                Update Profile
                            </button>
                            <button className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600">
                                View Settings
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}