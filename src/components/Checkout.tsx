import { useState } from 'react';
import { X, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'details' | 'payment' | 'confirmation';

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>('details');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    clearCart();
  };

  const handleClose = () => {
    setStep('details');
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zip: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-stone-900 border border-amber-900/30 rounded-3xl shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-800/80 border border-amber-900/30 hover:bg-stone-700 text-stone-400 hover:text-amber-300 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Confirmation Step */}
          {step === 'confirmation' ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-amber-50 mb-2">
                Order Confirmed!
              </h2>
              <p className="text-stone-400 mb-2">
                Thank you for your purchase.
              </p>
              <p className="text-stone-500 text-sm mb-8">
                Order #EB-{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
              <div className="bg-stone-800/50 rounded-xl p-4 mb-8 text-left">
                <p className="text-sm text-stone-400 mb-1">We've sent a confirmation to:</p>
                <p className="text-amber-200 font-medium">{formData.email || 'your email'}</p>
              </div>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold rounded-full transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                {step === 'payment' && (
                  <button
                    onClick={() => setStep('details')}
                    className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 mb-3 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to details
                  </button>
                )}
                <h2 className="text-xl font-bold text-amber-50">
                  {step === 'details' ? 'Shipping Details' : 'Payment'}
                </h2>
                <p className="text-sm text-stone-400 mt-1">
                  {step === 'details'
                    ? 'Where should we send your coffee?'
                    : 'Complete your purchase securely'}
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-stone-800/50 rounded-xl p-4 mb-6 border border-stone-700/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-stone-400">
                    {items.length} item{items.length !== 1 ? 's' : ''} in cart
                  </span>
                  <span className="text-lg font-bold text-amber-400">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="space-y-1">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-xs text-stone-500">
                      <span>{item.product.name} × {item.quantity}</span>
                      <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Forms */}
              {step === 'details' ? (
                <form onSubmit={handleSubmitDetails} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-400 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-amber-50 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-400 mb-1.5">First Name</label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-amber-50 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-400 mb-1.5">Last Name</label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-amber-50 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-400 mb-1.5">Address</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-amber-50 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40"
                      placeholder="123 Coffee Lane"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-400 mb-1.5">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-amber-50 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40"
                        placeholder="Portland"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-400 mb-1.5">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={(e) => handleInputChange('zip', e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-amber-50 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40"
                        placeholder="97201"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/20 mt-2"
                  >
                    Continue to Payment
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmitPayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-400 mb-1.5">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-amber-50 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40"
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-400 mb-1.5">Expiry</label>
                      <input
                        type="text"
                        required
                        value={formData.expiry}
                        onChange={(e) => handleInputChange('expiry', e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-amber-50 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-400 mb-1.5">CVV</label>
                      <input
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        className="w-full px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-sm text-amber-50 placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500/40"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  <div className="bg-amber-900/10 border border-amber-800/20 rounded-xl p-3 mt-2">
                    <p className="text-xs text-amber-300/70 text-center">
                      🔒 This is a simulated checkout. No real payment will be processed.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/20"
                  >
                    Pay ${totalPrice.toFixed(2)}
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
