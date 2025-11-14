import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  CreditCard, 
  CheckCircle, 
  Warning, 
  ArrowLeft,
  Lock,
  Check
} from '@phosphor-icons/react'
import { toast } from 'sonner'

interface Plan {
  id: string
  name: string
  price: number
  interval: string
  features: string[]
  popular?: boolean
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    interval: 'month',
    features: [
      'Unlimited notes',
      'Markdown support',
      'Search functionality',
      'Basic support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    interval: 'month',
    popular: true,
    features: [
      'Everything in Basic',
      'Advanced search',
      'Tags & organization',
      'Export to PDF',
      'Priority support',
      'Collaboration features'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 49.99,
    interval: 'month',
    features: [
      'Everything in Pro',
      'Team management',
      'SSO integration',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated support'
    ]
  }
]

interface CheckoutProps {
  onBack: () => void
}

export function Checkout({ onBack }: CheckoutProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    country: 'US'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const selectedPlanData = plans.find(p => p.id === selectedPlan)

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validateCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, '')
    return /^\d{16}$/.test(cleaned)
  }

  const validateExpiry = (expiry: string) => {
    const match = expiry.match(/^(\d{2})\/(\d{2})$/)
    if (!match) return false
    const month = parseInt(match[1])
    const year = parseInt(match[2])
    return month >= 1 && month <= 12 && year >= 24
  }

  const validateCVC = (cvc: string) => {
    return /^\d{3,4}$/.test(cvc)
  }

  const handleInputChange = (field: string, value: string) => {
    let formattedValue = value

    if (field === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    } else if (field === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').substring(0, 5)
    } else if (field === 'cvc') {
      formattedValue = value.replace(/\D/g, '').substring(0, 4)
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }))
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address'
    }

    if (!formData.name) {
      newErrors.name = 'Name is required'
    }

    if (!formData.cardNumber) {
      newErrors.cardNumber = 'Card number is required'
    } else if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number'
    }

    if (!formData.expiry) {
      newErrors.expiry = 'Expiry date is required'
    } else if (!validateExpiry(formData.expiry)) {
      newErrors.expiry = 'Invalid expiry date'
    }

    if (!formData.cvc) {
      newErrors.cvc = 'CVC is required'
    } else if (!validateCVC(formData.cvc)) {
      newErrors.cvc = 'Invalid CVC'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }

    setIsProcessing(true)

    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsSuccess(true)
    toast.success('Payment successful!')
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center min-h-screen p-6"
      >
        <Card className="max-w-md w-full">
          <CardContent className="pt-12 pb-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-6 flex justify-center"
            >
              <div className="rounded-full bg-accent/10 p-6">
                <CheckCircle className="h-16 w-16 text-accent" weight="fill" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-semibold mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Welcome to {selectedPlanData?.name}! Your subscription is now active.
            </p>
            <Button onClick={onBack} className="w-full">
              Return to Notes
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto px-6 py-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Notes
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl font-semibold mb-2">Choose your plan</h1>
              <p className="text-muted-foreground">Select the plan that works best for you</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                <div className="grid md:grid-cols-3 gap-4">
                  {plans.map((plan) => (
                    <Card
                      key={plan.id}
                      className={`cursor-pointer transition-all relative ${
                        selectedPlan === plan.id
                          ? 'ring-2 ring-accent shadow-lg'
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                          Most Popular
                        </Badge>
                      )}
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">{plan.name}</CardTitle>
                          <RadioGroupItem value={plan.id} id={plan.id} />
                        </div>
                        <div className="mt-4">
                          <span className="text-3xl font-bold">${plan.price}</span>
                          <span className="text-muted-foreground">/{plan.interval}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" weight="bold" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </RadioGroup>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" weight="duotone" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>
                    This is a demonstration of the Stripe Checkout flow. In production, this would integrate with Stripe's secure payment API.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <Warning className="h-3 w-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            className={errors.cardNumber ? 'border-destructive' : ''}
                            maxLength={19}
                          />
                          <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        </div>
                        {errors.cardNumber && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <Warning className="h-3 w-3" />
                            {errors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={(e) => handleInputChange('expiry', e.target.value)}
                            className={errors.expiry ? 'border-destructive' : ''}
                          />
                          {errors.expiry && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <Warning className="h-3 w-3" />
                              {errors.expiry}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={(e) => handleInputChange('cvc', e.target.value)}
                            className={errors.cvc ? 'border-destructive' : ''}
                          />
                          {errors.cvc && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                              <Warning className="h-3 w-3" />
                              {errors.cvc}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={errors.name ? 'border-destructive' : ''}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <Warning className="h-3 w-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>Processing...</>
                      ) : (
                        <>Pay ${selectedPlanData?.price}</>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                      <Lock className="h-3 w-3" />
                      Payments are secure and encrypted
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium">{selectedPlanData?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Billing cycle</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${selectedPlanData?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>$0.00</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total due today</span>
                  <span>${selectedPlanData?.price}</span>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium">What's included:</p>
                  <ul className="space-y-1">
                    {selectedPlanData?.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <Check className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" weight="bold" />
                        {feature}
                      </li>
                    ))}
                    {selectedPlanData && selectedPlanData.features.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        + {selectedPlanData.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
