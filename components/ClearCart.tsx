import { useEffect } from 'react'
import { useShoppingCart } from 'use-shopping-cart'

export default function ClearCart() {
  const { clearCart } = useShoppingCart()

  useEffect(() => {
    // console.log ("Clearing cart");
    clearCart();
  }, [])
  return <p></p>
}
