import { useFormState } from 'react-dom'

type Message = string | null

type Cart = {
  itemID: string
  itemTitle: string
}

const addToCart = (_prevState: Message, queryData: FormData): Message => {
  const itemID = queryData.get('itemID')
  if (itemID === '1') {
    return 'Added to cart'
  } else {
    return 'Could not add cart: Item is sold out'
  }
}

const AddToCartForm = ({ itemID, itemTitle }: Cart) => {
  const [message, formAction] = useFormState<Message, FormData>(addToCart, null)

  return (
    <form
      action={formAction}
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
    >
      <h2 className='text-xl font-bold mb-4'>{itemTitle}</h2>
      <input type='hidden' name='itemID' value={itemID} />
      <button
        type='submit'
        className='bg-violet-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Add To Cart
      </button>
      <div className='mt-4 text-sm text-gray-700'>{message}</div>
    </form>
  )
}

const AddToCart = () => {
  return (
    <>
      <AddToCartForm itemID='1' itemTitle='JavaScript: The Definitive Guide' />
      <AddToCartForm itemID='2' itemTitle='JavaScript: The Good Parts' />
    </>
  )
}

export { AddToCart as Useformstate }
