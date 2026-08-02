import { Suspense } from 'react'
import JokeItem from './JokeItem'

const Joke = () => {
  return (
    <Suspense
      fallback={
        <h2 className='text-2xl text-center font-bold mt-5'>Loading...</h2>
      }
    >
      <JokeItem />
    </Suspense>
  )
}

export { Joke as UseExample1 }
