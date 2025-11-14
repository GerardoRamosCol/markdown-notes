# Stripe Checkout Integration Guide

This application demonstrates a complete Stripe Checkout Session flow based on the [Stripe Quickstart Guide](https://docs.stripe.com/payments/quickstart-checkout-sessions).

## Implementation Overview

### Current Implementation (Demo Mode)

This is a **client-side demonstration** that shows the complete UI/UX flow of a Stripe Checkout integration. It includes:

- ✅ Plan selection with pricing tiers
- ✅ Form validation and error handling
- ✅ Payment form UI matching Stripe's design patterns
- ✅ Loading states and success confirmation
- ✅ Secure payment indicators
- ✅ Responsive design for all screen sizes

### Production Implementation Required

To make this production-ready with actual Stripe payments, you'll need:

#### 1. Backend Server Setup

Stripe requires a backend server to securely handle API keys and create checkout sessions. You cannot use Stripe's secret key in client-side code.

**Required Backend Endpoint:**
```javascript
// POST /create-checkout-session
// This endpoint should:
// 1. Accept the selected plan ID
// 2. Use your Stripe secret key to create a checkout session
// 3. Return the session ID to the frontend
```

#### 2. Stripe Account Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Configure your product catalog in Stripe Dashboard or via API

#### 3. Environment Variables

Never commit Stripe keys to your repository. Use environment variables:

```bash
# Backend only - NEVER expose these in frontend
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### 4. Integration Steps

**Step 1: Install Stripe SDK on Backend**
```bash
npm install stripe
```

**Step 2: Create Checkout Session Endpoint (Backend)**
```javascript
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/create-checkout-session', async (req, res) => {
  const { priceId } = req.body;
  
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/checkout`,
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

**Step 3: Update Frontend to Call Backend**

Replace the demo payment processing in `src/components/Checkout.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!validateForm()) {
    toast.error('Please fix the errors in the form')
    return
  }

  setIsProcessing(true)

  try {
    // Call your backend to create checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        priceId: selectedPlanData?.stripePriceId,
        email: formData.email 
      })
    })

    const { url } = await response.json()
    
    // Redirect to Stripe Checkout
    window.location.href = url
  } catch (error) {
    toast.error('Payment failed. Please try again.')
    setIsProcessing(false)
  }
}
```

**Step 4: Create Products in Stripe Dashboard**

1. Go to Products in Stripe Dashboard
2. Create products for each plan (Basic, Pro, Enterprise)
3. Note the Price IDs (they look like `price_xxx`)
4. Update the `plans` array in `Checkout.tsx` to include these IDs:

```typescript
const plans = [
  {
    id: 'basic',
    stripePriceId: 'price_xxx', // From Stripe Dashboard
    name: 'Basic',
    // ... rest of config
  }
]
```

## Security Considerations

🔒 **CRITICAL SECURITY NOTES:**

1. **Never** expose Stripe secret keys in frontend code
2. **Always** create checkout sessions from your backend
3. **Always** verify webhook signatures for payment confirmations
4. **Never** trust client-side payment status
5. Use Stripe webhooks to handle subscription lifecycle events

## Webhook Setup

To handle payment confirmations, set up Stripe webhooks:

```javascript
// Backend webhook endpoint
app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Fulfill the purchase, grant access, etc.
      break;
    // ... handle other event types
  }

  res.json({received: true});
});
```

## Testing

Use Stripe's test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

## Resources

- [Stripe Checkout Documentation](https://docs.stripe.com/payments/checkout)
- [Stripe API Reference](https://docs.stripe.com/api)
- [Stripe Webhooks Guide](https://docs.stripe.com/webhooks)
- [Test Cards](https://docs.stripe.com/testing)

## Current Demo Features

The current implementation showcases:

1. **Plan Selection**: Three-tier pricing with feature comparison
2. **Form Validation**: Real-time validation for all payment fields
3. **Error Handling**: Clear error messages for invalid inputs
4. **Loading States**: Processing indicator during submission
5. **Success Flow**: Confirmation screen after successful payment
6. **Responsive Design**: Works on mobile, tablet, and desktop
7. **Accessibility**: Proper labels, ARIA attributes, and keyboard navigation

All of this UI will work with real Stripe when you add the backend integration.
