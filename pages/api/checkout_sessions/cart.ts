import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
// @ts-ignore
import { validateCartItems } from 'use-shopping-cart/utilities'

/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */
import inventory from '../../../data/products'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Validate the cart details that were sent from the client.
      const line_items = validateCartItems(inventory as any, req.body)
      const hasSubscription = line_items.find((item: any) => {
        return !!item.price_data.recurring
      })
      // Create Checkout Sessions from body params.
      // allowed_countries : https://stripe.com/gb/global
      //
      const params: Stripe.Checkout.SessionCreateParams = {
        submit_type: 'pay',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['AU', 'AT', 'BE', 'BR', 'BG', 'CA', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GI', 'GR', 'HK', 'HU', 'IN', 'ID', 'IE', 'IT', 'JP', 'LV', 'LI', 'LT', 'LU', 'MY', 'MT', 'MX', 'NL', 'NZ', 'NO', 'PL', 'PT', 'RO', 'SG', 'SK', 'SI', 'ES', 'SE', 'CH', 'TH', 'AE', 'GB', 'US'],
        },
        line_items,
        success_url: `${req.headers.origin}/checkorder?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout`,
        mode: hasSubscription ? 'subscription' : 'payment',
      }

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
    } catch (err) {
      console.error("pages/api/checkout_sessions/cart.ts ERROR : ", err)
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
