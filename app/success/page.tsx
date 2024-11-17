"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

interface OrderDetails {
  id: string
  total: number
  billingDetails: {
    fullName: string
    email: string
  }
  date: string
}

export default function SuccessPage() {
  const [order, setOrder] = useState<OrderDetails | null>(null)

  useEffect(() => {
    const lastOrder = localStorage.getItem('lastOrder')
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder))
      localStorage.removeItem('lastOrder')
    }
  }, [])

  if (!order) {
    return (
      <div className="container max-w-2xl py-20">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold tracking-tight">No order found</h1>
          <p className="text-muted-foreground text-lg">
            Please complete your purchase to view order details.
          </p>
          <div className="pt-6">
            <Button asChild>
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl py-20">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Thank you for your purchase!</h1>
        
        <div className="bg-muted/50 rounded-lg p-6 text-left space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-medium">{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="font-medium">${order.total.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{order.billingDetails.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Date</p>
            <p className="font-medium">
              {new Date(order.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        <p className="text-muted-foreground text-lg">
          Your order details and download links have been sent to your email.
        </p>
        
        <div className="pt-6">
          <Button asChild>
            <Link href="/templates">Browse More Templates</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}