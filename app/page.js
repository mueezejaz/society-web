import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Building2 className="mx-auto h-16 w-16 text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Society Maintenance Portal</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Streamline your society's maintenance payments and tracking with our comprehensive management system
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <CardTitle className="text-2xl">Resident Portal</CardTitle>
              <CardDescription className="text-base">
                Pay your maintenance fees, view payment history, and manage your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• View current dues and payment history</li>
                <li>• Pay maintenance for single or multiple months</li>
                <li>• Download payment receipts</li>
                <li>• Update contact information</li>
              </ul>
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1 bg-transparent">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Our Platform?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-blue-600 mb-2">Secure Payments</h3>
                <p className="text-gray-600">Safe and secure payment processing with detailed records</p>
              </div>
              <div>
                <h3 className="font-semibold text-green-600 mb-2">Easy Tracking</h3>
                <p className="text-gray-600">Real-time payment tracking and automated reminders</p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-600 mb-2">Complete Management</h3>
                <p className="text-gray-600">Comprehensive tools for society administration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

