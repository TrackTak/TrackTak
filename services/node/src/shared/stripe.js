import Stripe from 'stripe'

const stripe = Stripe(process.env.STRIPE_AUTH_SECRET_KEY)

export default stripe