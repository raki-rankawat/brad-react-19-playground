import { useState } from 'react'

type Cart = {
  id: string
  title: string
}

type AddToCart = (formData: FormData, title: string) => Promise<void>

const AddToCartForm = ({
  id,
  title,
  addToCart,
}: {
  id: string
  title: string
  addToCart: AddToCart
}) => {
  const formAction = async (formData: FormData) => {
    try {
      await addToCart(formData, title)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      action={formAction}
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
    >
      <h2 className='text-xl font-bold mb-4'>{title}</h2>
      <input type='hidden' name='itemID' value={id} className='hidden' />
      <button
        type='submit'
        className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Add To Cart
      </button>
    </form>
  )
}

const CartDisplay = ({ cart }: { cart: Cart[] }) => {
  if (!cart.length) {
    return null
  }

  return (
    <>
      <h2 className='text-xl font-bold my-4'>Your Cart:</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>
      <hr className='my-4' />
    </>
  )
}

const ShoppingCart = () => {
  const [cart, setCart] = useState<Cart[]>([])

  const addToCart = async (formData: FormData, title: string) => {
    const id = String(formData.get('itemID'))
    // Simulate an Ajax call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setCart(cart => [...cart, { id, title }])
  }

  return (
    <>
      <CartDisplay cart={cart} />
      <AddToCartForm
        id='1'
        title='JavaScript: The Definitive Guide'
        addToCart={addToCart}
      />
      <AddToCartForm
        id='2'
        title='JavaScript: The Good Parts'
        addToCart={addToCart}
      />
    </>
  )
}

export { ShoppingCart as ActionExample2 }
