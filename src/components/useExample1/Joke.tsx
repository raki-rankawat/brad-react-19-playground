import { use, Suspense } from 'react'

type ChuckNorrisJoke = {
  id: string
  value: string
}

const fetchJoke = async (): Promise<ChuckNorrisJoke> => {
  const res = await fetch('https://api.chucknorris.io/jokes/random')
  return res.json()
}

let jokePromise: Promise<ChuckNorrisJoke> | undefined

// Created on first render of JokeItem, then reused, so use() always
// receives the same promise instead of a fresh one each render.
const getJokePromise = () => (jokePromise ??= fetchJoke())

const JokeItem = () => {
  const joke = use(getJokePromise())

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
