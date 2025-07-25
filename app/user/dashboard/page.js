"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, History, FileText, IndianRupee, Bell, Users, Download } from "lucide-react"
import { format } from "date-fns"

export default function UserDashboard() {
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)
    const [payments, setPayments] = useState([])
    const [hasPaidCurrentMonth, setHasPaidCurrentMonth] = useState(false)
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch("/api/user/dashboard", {
                    method: "POST",
                })
                const data = await res.json()

                if (data.success) {
                    setPayments(data.payments || [])
                    setHasPaidCurrentMonth(data.hasPaidCurrentMonth || false)
                }
            } catch (error) {
                console.error("Failed to load payment data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const currentDue = hasPaidCurrentMonth ? 0 : 5000
    const totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)
    const formattedPayments = payments.map((p, i) => ({
        id: i,
        month: format(new Date(p.createdAt), "MMMM yyyy"),
        amount: p.amount,
        date: format(new Date(p.createdAt), "yyyy-MM-dd"),
        status: "Paid",
    }))

    return (
        loading ? <h1 className="text-center">Loading ....</h1> :
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
            <div className="space-y-4 sm:space-y-6">
                {showPaymentSuccess && (
                    <Alert className="border-green-200 bg-green-50">
                        <AlertDescription className="text-green-800">
                            Payment successful! Your maintenance fee has been recorded.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Current Due</p>
                                    <div className="flex items-center gap-1 text-lg sm:text-2xl font-bold text-red-600">
                                        <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5" />
                                        {currentDue.toLocaleString()}
                                    </div>
                                </div>
                                <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">This Year Paid</p>
                                    <div className="flex items-center gap-1 text-lg sm:text-2xl font-bold text-green-600">
                                        <IndianRupee className="h-4 w-4 sm:h-5 sm:w-5" />
                                        {totalPaid.toLocaleString()}
                                    </div>
                                </div>
                                <History className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="sm:col-span-2 lg:col-span-1">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-600">Total Payments</p>
                                    <p className="text-lg sm:text-2xl font-bold">{payments.length}</p>
                                </div>
                                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Quick Payment</CardTitle>
                            <CardDescription className="text-sm">
                                Pay your current month's maintenance
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={() => router.push("/user/payments")}
                                className="w-full"
                                size="lg"
                                disabled={hasPaidCurrentMonth}
                            >
                                {hasPaidCurrentMonth ? "Already Paid" : `Pay Now - ₹${currentDue.toLocaleString()}`}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg">Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {formattedPayments.map((payment) => (
                                    <div key={payment.id} className="flex justify-between items-center text-sm">
                                        <span className="truncate pr-2">{payment.month}</span>
                                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                                            Paid
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                className="w-full mt-4 bg-transparent"
                                onClick={() => router.push("/user/history")}
                            >
                                View All History
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button className="w-full justify-start" onClick={() => router.push("/user/notifications")}>
                                <Bell className="h-4 w-4 mr-2" />
                                View Notifications
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start bg-transparent"
                                onClick={() => router.push("/user/complaints")}
                            >
                                <Users className="h-4 w-4 mr-2" />
                                Submit Complaint
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start bg-transparent"
                                onClick={() => router.push("/user/documents")}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                Download Documents
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Notifications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                    <h4 className="font-medium text-sm">Maintenance Due Reminder</h4>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Your maintenance fee for December 2024 is due on 5th December.
                                    </p>
                                    <span className="text-xs text-gray-500">2 days ago</span>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                                    <h4 className="font-medium text-sm">Society Meeting</h4>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Monthly society meeting scheduled for 15th December at 7 PM.
                                    </p>
                                    <span className="text-xs text-gray-500">1 week ago</span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full mt-4 bg-transparent"
                                onClick={() => router.push("/user/notifications")}
                            >
                                View All Notifications
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}




