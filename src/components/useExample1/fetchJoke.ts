type ChuckNorrisJoke = {
  id: string
  value: string
}

const fetchJoke = async (): Promise<ChuckNorrisJoke> => {
  const res = await fetch('https://api.chucknorris.io/jokes/random')
  return res.json()
}

// Created once when this module is first imported, so every render of
// JokeItem calls use() with the same promise instead of a fresh one.
const jokePromise = fetchJoke()

export { jokePromise }
