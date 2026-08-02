import { use, Suspense } from 'react'
import { jokePromise } from './fetchJoke'

const JokeItem = () => {
  const joke = use(jokePromise)

  return (
    <Suspense
      fallback={
        <h2 className='text-2xl text-center font-bold mt-5'>Loading...</h2>
      }
    >
      <div className='bg-violet-50 shadow-md p-4 my-4 rounded-lg'>
        <h2 className='text-xl font-bold'>{joke.value}</h2>
      </div>
    </Suspense>
  )
}

export default JokeItem
