"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    paidThisMonth: 0,
    unpaidThisMonth: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await fetch("/api/admin/dashboard", {
          method: "POST", // or "GET" if you switch the backend method
        })

        const data = await res.json()

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Something went wrong")
        }

        setDashboardData(data.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAdminData()
  }, [])

  const { totalUsers, paidThisMonth, unpaidThisMonth } = dashboardData

  return (
    <main className="flex-1 p-4 sm:p-6 overflow-auto">
      <div className="space-y-4 sm:space-y-6">
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total Users</p>
                  <p className="text-lg sm:text-2xl font-bold">{loading ? "..." : totalUsers}</p>
                </div>
                <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Paid This Month</p>
                  <p className="text-lg sm:text-2xl font-bold text-green-600">
                    {loading ? "..." : paidThisMonth}
                  </p>
                </div>
                <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Unpaid This Month</p>
                  <p className="text-lg sm:text-2xl font-bold text-red-600">
                    {loading ? "..." : unpaidThisMonth}
                  </p>
                </div>
                <XCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Button variant="outline" onClick={() => location.reload()}>
            Refresh Data
          </Button>
        </div>
      </div>
    </main>
  )
}

