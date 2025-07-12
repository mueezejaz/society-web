"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, IndianRupee } from "lucide-react"

export default function UserPayments() {
    const [currentDue] = useState(5000)
    const [selectedMonths, setSelectedMonths] = useState("1")
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)

    const user = {
        name: "John Doe",
        flatNumber: "A-101",
    }

    const handlePayment = () => {
        setShowPaymentSuccess(true)
        setTimeout(() => setShowPaymentSuccess(false), 3000)
    }

    const totalPaymentAmount = currentDue * Number.parseInt(selectedMonths)

    return (
        <>

            <main className="flex-1 p-4 sm:p-6 overflow-auto">
                <div className="max-w-2xl mx-auto">
                    {showPaymentSuccess && (
                        <Alert className="border-green-200 bg-green-50 mb-6">
                            <AlertDescription className="text-green-800">
                                Payment successful! Your maintenance fee has been recorded.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                                <CreditCard className="h-5 w-5" />
                                Payment Details
                            </CardTitle>
                            <CardDescription>Select the number of months you want to pay for</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label>Monthly Maintenance</Label>
                                    <div className="flex items-center gap-1 text-xl sm:text-2xl font-semibold text-green-600">
                                        <IndianRupee className="h-5 w-5" />
                                        {currentDue.toLocaleString()}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="months">Number of Months</Label>
                                    <Select value={selectedMonths} onValueChange={setSelectedMonths}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 Month</SelectItem>
                                            <SelectItem value="2">2 Months</SelectItem>
                                            <SelectItem value="3">3 Months</SelectItem>
                                            <SelectItem value="6">6 Months</SelectItem>
                                            <SelectItem value="12">12 Months</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <Separator />

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex justify-between items-center text-base sm:text-lg font-semibold mb-2">
                                    <span>Payment Summary:</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Monthly Amount:</span>
                                        <span>₹{currentDue.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Number of Months:</span>
                                        <span>{selectedMonths}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center text-lg font-bold">
                                        <span>Total Amount:</span>
                                        <div className="flex items-center gap-1 text-green-600">
                                            <IndianRupee className="h-5 w-5" />
                                            {totalPaymentAmount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <h4 className="font-medium text-blue-900 mb-2">Payment Information</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                        <li>• Payments are processed securely</li>
                                        <li>• You will receive a confirmation email</li>
                                        <li>• Receipt will be available for download</li>
                                        <li>• Payment reflects in your account within 24 hours</li>
                                    </ul>
                                </div>

                                <Button onClick={handlePayment} className="w-full" size="lg">
                                    <CreditCard className="h-4 w-4 mr-2" />
                                    Pay ₹{totalPaymentAmount.toLocaleString()} Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
}
