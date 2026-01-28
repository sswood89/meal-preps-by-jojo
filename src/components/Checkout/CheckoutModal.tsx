import { useState, type FormEvent } from 'react'
import { useCart } from '../../providers/CartProvider'
import { useTracking } from '../../providers/TrackingProvider'
import { submitOrder, type OrderCustomer } from '../../lib/cart'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  planName?: string
}

type CheckoutStep = 'details' | 'review' | 'confirmation'

export function CheckoutModal({ isOpen, onClose, planName }: CheckoutModalProps) {
  const { cart, total, clearCart } = useCart()
  const { visitorId, trackCheckoutStart } = useTracking()

  const [step, setStep] = useState<CheckoutStep>('details')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)

  const [customer, setCustomer] = useState<OrderCustomer>({
    name: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    deliveryNotes: '',
    neighborhood: '',
  })

  const [deliveryDate, setDeliveryDate] = useState('')
  const [deliveryWindow, setDeliveryWindow] = useState<'morning' | 'afternoon' | 'evening'>('morning')

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'deliveryDate') {
      setDeliveryDate(value)
    } else if (name === 'deliveryWindow') {
      setDeliveryWindow(value as 'morning' | 'afternoon' | 'evening')
    } else {
      setCustomer((prev) => ({ ...prev, [name]: value }))
    }
    if (error) setError(null)
  }

  const handleDetailsSubmit = (e: FormEvent) => {
    e.preventDefault()
    trackCheckoutStart({ planName, total })
    setStep('review')
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true)
    setError(null)

    const result = await submitOrder({
      customer,
      deliveryDate: new Date(deliveryDate).toISOString(),
      deliveryWindow,
      items: cart.items.map((item) => ({
        menuItemId: item.menuItem.id,
        quantity: item.quantity,
        notes: item.notes,
      })),
      visitorId: visitorId || undefined,
    })

    setIsSubmitting(false)

    if (result.success) {
      setOrderId(result.orderId || null)
      clearCart()
      setStep('confirmation')
    } else {
      setError(result.message)
    }
  }

  const handleClose = () => {
    setStep('details')
    setError(null)
    setOrderId(null)
    onClose()
  }

  // Get minimum delivery date (2 days from now)
  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 2)
  const minDateStr = minDate.toISOString().split('T')[0]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-[#1C1C1C] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-[#333]">
        {/* Header */}
        <div className="sticky top-0 bg-[#1C1C1C] border-b border-[#333] p-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">
            {step === 'details' && 'Delivery Details'}
            {step === 'review' && 'Review Order'}
            {step === 'confirmation' && 'Order Confirmed!'}
          </h2>
          <button
            onClick={handleClose}
            className="text-[#737373] hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'details' && (
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={customer.name}
                  onChange={handleInputChange}
                  required
                  className="input-premium w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={customer.email}
                  onChange={handleInputChange}
                  required
                  className="input-premium w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={customer.phone}
                  onChange={handleInputChange}
                  className="input-premium w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Delivery Address *</label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={customer.deliveryAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="Street address, city, ZIP"
                  className="input-premium w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Neighborhood</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={customer.neighborhood}
                  onChange={handleInputChange}
                  placeholder="e.g., Silver Lake, DTLA"
                  className="input-premium w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Delivery Date *</label>
                  <input
                    type="date"
                    name="deliveryDate"
                    value={deliveryDate}
                    onChange={handleInputChange}
                    min={minDateStr}
                    required
                    className="input-premium w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Time Window</label>
                  <select
                    name="deliveryWindow"
                    value={deliveryWindow}
                    onChange={handleInputChange}
                    className="input-premium w-full"
                  >
                    <option value="morning">Morning (8am-12pm)</option>
                    <option value="afternoon">Afternoon (12pm-5pm)</option>
                    <option value="evening">Evening (5pm-8pm)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#A3A3A3] mb-2">Delivery Notes</label>
                <textarea
                  name="deliveryNotes"
                  value={customer.deliveryNotes}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="Gate code, building instructions, etc."
                  className="input-premium w-full resize-none"
                />
              </div>

              <button type="submit" className="w-full btn-primary mt-6">
                <span>Continue to Review</span>
              </button>
            </form>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div>
                <h3 className="text-[#A3A3A3] text-sm uppercase tracking-wider mb-3">Order Summary</h3>
                {planName && (
                  <div className="bg-[#2A2A2A] rounded-lg p-4 mb-4">
                    <p className="text-white font-medium">{planName} Plan</p>
                    <p className="text-[#7FB685]">${total}</p>
                  </div>
                )}
                {cart.items.length > 0 && (
                  <div className="space-y-2">
                    {cart.items.map((item) => (
                      <div key={item.menuItem.id} className="flex justify-between text-sm">
                        <span className="text-[#A3A3A3]">
                          {item.quantity}x {item.menuItem.name}
                        </span>
                        <span className="text-white">
                          ${(item.menuItem.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-t border-[#333] mt-4 pt-4 flex justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-[#7FB685] font-semibold">${total}</span>
                </div>
              </div>

              {/* Delivery Info */}
              <div>
                <h3 className="text-[#A3A3A3] text-sm uppercase tracking-wider mb-3">Delivery To</h3>
                <div className="bg-[#2A2A2A] rounded-lg p-4 text-sm">
                  <p className="text-white font-medium">{customer.name}</p>
                  <p className="text-[#A3A3A3]">{customer.deliveryAddress}</p>
                  {customer.neighborhood && (
                    <p className="text-[#A3A3A3]">{customer.neighborhood}</p>
                  )}
                  <p className="text-[#A3A3A3] mt-2">
                    {new Date(deliveryDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                    })}
                    {' · '}
                    {deliveryWindow === 'morning' && '8am-12pm'}
                    {deliveryWindow === 'afternoon' && '12pm-5pm'}
                    {deliveryWindow === 'evening' && '5pm-8pm'}
                  </p>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('details')}
                  className="flex-1 btn-secondary"
                >
                  <span>Back</span>
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Placing Order...' : 'Place Order'}</span>
                </button>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-[#7FB685]/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-[#7FB685]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Order Received!</h3>
              <p className="text-[#A3A3A3] mb-4">
                We've received your order and will confirm it shortly.
              </p>
              {orderId && (
                <p className="text-sm text-[#737373] mb-6">
                  Order ID: <span className="font-mono">{orderId.slice(0, 8)}</span>
                </p>
              )}
              <p className="text-[#A3A3A3] text-sm mb-6">
                Check your email at <span className="text-white">{customer.email}</span> for confirmation.
              </p>
              <button onClick={handleClose} className="btn-primary">
                <span>Done</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
