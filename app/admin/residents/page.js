"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, IndianRupee } from "lucide-react"

export default function AdminResidents() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")

    const [residents] = useState([
        {
            id: 1,
            name: "John Doe",
            flatNumber: "L-101",
            email: "john@example.com",
            phone: "+91 9876543210",
            currentDue: 5000,
            status: "paid",
            lastPayment: "2024-12-01",
        },
        {
            id: 2,
            name: "Jane Smith",
            flatNumber: "R-102",
            email: "jane@example.com",
            phone: "+91 9876543211",
            currentDue: 5000,
            status: "pending",
            lastPayment: "2024-11-01",
        },
        {
            id: 3,
            name: "Mike Johnson",
            flatNumber: "L-201",
            email: "mike@example.com",
            phone: "+91 9876543212",
            currentDue: 10000,
            status: "overdue",
            lastPayment: "2024-10-01",
        },
        {
            id: 4,
            name: "Sarah Wilson",
            flatNumber: "R-202",
            email: "sarah@example.com",
            phone: "+91 9876543213",
            currentDue: 5000,
            status: "paid",
            lastPayment: "2024-12-02",
        },
        {
            id: 5,
            name: "David Brown",
            flatNumber: "L-301",
            email: "david@example.com",
            phone: "+91 9876543214",
            currentDue: 5000,
            status: "pending",
            lastPayment: "2024-11-15",
        },
        {
            id: 6,
            name: "Emily Davis",
            flatNumber: "R-303",
            email: "emily@example.com",
            phone: "+91 9876543215",
            currentDue: 0,
            status: "paid",
            lastPayment: "2024-12-03",
        },
        {
            id: 7,
            name: "Chris Martin",
            flatNumber: "L-305",
            email: "chris@example.com",
            phone: "+91 9876543216",
            currentDue: 10000,
            status: "overdue",
            lastPayment: "2024-09-15",
        },
        {
            id: 8,
            name: "Olivia Taylor",
            flatNumber: "R-306",
            email: "olivia@example.com",
            phone: "+91 9876543217",
            currentDue: 5000,
            status: "pending",
            lastPayment: "2024-11-05",
        },
        {
            id: 9,
            name: "Liam Anderson",
            flatNumber: "L-307",
            email: "liam@example.com",
            phone: "+91 9876543218",
            currentDue: 0,
            status: "paid",
            lastPayment: "2024-12-05",
        },
        {
            id: 10,
            name: "Sophia Moore",
            flatNumber: "R-308",
            email: "sophia@example.com",
            phone: "+91 9876543219",
            currentDue: 5000,
            status: "pending",
            lastPayment: "2024-11-10",
        },
        {
            id: 11,
            name: "Daniel White",
            flatNumber: "L-309",
            email: "daniel@example.com",
            phone: "+91 9876543220",
            currentDue: 10000,
            status: "overdue",
            lastPayment: "2024-10-01",
        },
        {
            id: 12,
            name: "Ava Harris",
            flatNumber: "R-310",
            email: "ava@example.com",
            phone: "+91 9876543221",
            currentDue: 0,
            status: "paid",
            lastPayment: "2024-12-04",
        },
        {
            id: 13,
            name: "Noah Clark",
            flatNumber: "L-311",
            email: "noah@example.com",
            phone: "+91 9876543222",
            currentDue: 5000,
            status: "pending",
            lastPayment: "2024-11-12",
        },
        {
            id: 14,
            name: "Isabella Lewis",
            flatNumber: "R-312",
            email: "isabella@example.com",
            phone: "+91 9876543223",
            currentDue: 0,
            status: "paid",
            lastPayment: "2024-12-02",
        },
        {
            id: 15,
            name: "Mason Walker",
            flatNumber: "L-313",
            email: "mason@example.com",
            phone: "+91 9876543224",
            currentDue: 10000,
            status: "overdue",
            lastPayment: "2024-09-20",
        },
    ])


    const filteredResidents = residents.filter((resident) => {
        const matchesSearch =
            resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resident.flatNumber.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filterStatus === "all" || resident.status === filterStatus
        return matchesSearch && matchesFilter
    })

    const getStatusBadge = (status) => {
        switch (status) {
            case "paid":
                return <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
            case "pending":
                return <Badge className="bg-yellow-100 text-yellow-800 text-xs">Pending</Badge>
            case "overdue":
                return <Badge className="bg-red-100 text-red-800 text-xs">Overdue</Badge>
            default:
                return (
                    <Badge variant="secondary" className="text-xs">
                        {status}
                    </Badge>
                )
        }
    }

    return (
        <>

            <main className="flex-1 p-4 sm:p-6 overflow-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl">Residents</CardTitle>
                        <CardDescription>Manage resident accounts and payment status</CardDescription>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search by name or flat number..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-full sm:w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="paid">Paid</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="overdue">Overdue</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xs sm:text-sm">Name</TableHead>
                                        <TableHead className="text-xs sm:text-sm">Flat</TableHead>
                                        <TableHead className="hidden sm:table-cell text-xs sm:text-sm">Contact</TableHead>
                                        <TableHead className="text-xs sm:text-sm">Due</TableHead>
                                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredResidents.map((resident) => (
                                        <TableRow key={resident.id}>
                                            <TableCell className="font-medium text-xs sm:text-sm">{resident.name}</TableCell>
                                            <TableCell className="text-xs sm:text-sm">{resident.flatNumber}</TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <div className="text-xs">
                                                    <div>{resident.email}</div>
                                                    <div className="text-gray-500">{resident.phone}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-xs sm:text-sm">
                                                    <IndianRupee className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    {resident.currentDue.toLocaleString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(resident.status)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </>
    )
}
