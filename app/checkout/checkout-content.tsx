"use client"

import { useEffect, useState, useCallback } from 'react'
import { useCart } from '@/hooks/use-cart'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { BillingForm } from '@/components/checkout/billing-form'
import { OrderSummary } from '@/components/checkout/order-summary'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function CheckoutContent() {
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  const validateCart = useCallback(() => {
    if (!items.length || total <= 0) {
      throw new Error('Cart is empty')
    }

    items.forEach(item => {
      if (!item.template?.id || !item.tier || item.quantity < 1 || item.price <= 0) {
        throw new Error('Invalid cart item')
      }
    })
  }, [items, total])

  const handleSubmit = async () => {
    try {
      setError(null)
      setIsProcessing(true)
      validateCart()

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Order processing failed')
      }

      clearCart()
      toast({
        title: 'Order Successful',
        description: 'Thank you for your purchase!',
      })
      router.push('/success')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Order processing failed'
      console.error('Checkout error:', error)
      
      if (message.includes('Cart is empty')) {
        router.push('/cart')
        return
      }

      setError(message)
      toast({
        title: 'Checkout Error',
        description: message,
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  if (!items.length) {
    return null
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => router.push('/cart')}>
            Return to Cart
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-6">
        <BillingForm onSubmit={handleSubmit} />
      </div>

      <div>
        <OrderSummary />
      </div>
    </div>
  )
}