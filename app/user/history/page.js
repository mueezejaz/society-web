"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, IndianRupee, Download } from "lucide-react"

export default function UserHistory() {
  const [paymentHistory] = useState([
    { id: 1, month: "November 2024", amount: 5000, date: "2024-11-05", status: "Paid", transactionId: "TXN001" },
    { id: 2, month: "October 2024", amount: 5000, date: "2024-10-03", status: "Paid", transactionId: "TXN002" },
    { id: 3, month: "September 2024", amount: 5000, date: "2024-09-02", status: "Paid", transactionId: "TXN003" },
    { id: 4, month: "August 2024", amount: 5000, date: "2024-08-01", status: "Paid", transactionId: "TXN004" },
    { id: 5, month: "July 2024", amount: 5000, date: "2024-07-03", status: "Paid", transactionId: "TXN005" },
  ])

  const user = {
    name: "John Doe",
    flatNumber: "A-101",
  }

  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <>
      <main className="flex-1 p-4 sm:p-6 overflow-auto">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{paymentHistory.length}</p>
                  <p className="text-sm text-gray-600">Total Payments</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600">
                    <IndianRupee className="h-5 w-5" />
                    {totalPaid.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">Total Amount Paid</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">100%</p>
                  <p className="text-sm text-gray-600">Payment Rate</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <History className="h-5 w-5" />
                Payment Records
              </CardTitle>
              <CardDescription>Complete history of your maintenance payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 bg-gray-50 rounded-lg gap-3"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm sm:text-base">{payment.month}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Transaction ID: {payment.transactionId}</div>
                      <div className="text-xs sm:text-sm text-gray-600">Date: {payment.date}</div>
                    </div>
                    <div className="flex justify-between sm:block sm:text-right items-center">
                      <div className="flex items-center gap-1 font-semibold text-sm sm:text-base">
                        <IndianRupee className="h-4 w-4" />
                        {payment.amount.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                          {payment.status}
                        </Badge>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Download className="h-3 w-3 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button variant="outline" className="bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Download Complete History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
