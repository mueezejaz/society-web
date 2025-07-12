"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { ShieldCheck } from "lucide-react"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

import { Alert, AlertDescription } from "@/components/ui/alert"
export default function Otp() {
    const [otp, setOtp] = useState("")
    const [timer, setTimer] = useState(300)
    const [isExpired, setIsExpired] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter();
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval)
                    setIsExpired(true)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60)
        const s = seconds % 60
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
    }

    const handleVerifyOtp = async () => {
        if (isExpired) {
            alert("OTP has expired. Please request a new one.")
            return
        }

        if (otp.length < 4) {
            alert("Please enter a valid 4-digit OTP.")
            return
        }
        try {
            const response = await fetch("/api/register/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(otp),
                credentials: "include", // ⬅️ REQUIRED to accept cookies from server
            });
            const data = await response.json();
            if (!response.ok || data.seccess === false) {
                const errMsg = data.message || "some thing went wrong";
                setError(errMsg);
                return;
            }else{
               router.push("/login") 
            }
        } catch (error) {
            console.log(error);
            setError("net work error or server is not working");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="text-center">
                        <ShieldCheck className="mx-auto h-12 w-12 text-green-600 mb-4" />
                        <CardTitle className="text-2xl">Verify OTP</CardTitle>
                        <CardDescription>Enter the 4-digit code sent to your phone</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col items-center gap-4">

                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}
                            <Label htmlFor="otp">OTP</Label>
                            <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSeparator />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                            </InputOTP>

                            <div className="text-sm text-muted-foreground">
                                Time remaining: <span className="font-medium text-black">{formatTime(timer)}</span>
                            </div>

                            <Button onClick={handleVerifyOtp} disabled={isExpired}>
                                Verify OTP
                            </Button>

                            {isExpired && (
                                <div className="text-red-600 text-sm mt-2">OTP expired. Please request a new one.</div>
                            )}

                            <div className="mt-4 text-sm text-center">
                                Didn’t receive the code?{" "}
                                <button
                                    onClick={() => alert("Resend OTP triggered")}
                                    className="text-blue-600 hover:underline"
                                >
                                    Resend OTP
                                </button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
