import { use, Suspense } from 'react'

type Post = {
  id: number
  title: string
  body: string
}

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  return res.json()
}

let postsPromise: Promise<Post[]> | undefined

// Created on first render of JokeItem, then reused, so use() always
// receives the same promise instead of a fresh one each render.
const getJokePromise = () => (postsPromise ??= fetchPosts())

const PostItems = () => {
  const posts = use(getJokePromise())

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id} className='bg-blue-50 shadow-md p-4 my-6 rounded-lg'>
          <h2 className='text-xl font-bold'>{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  )
}

const Posts = () => {
  return (
    <Suspense
      fallback={
        <h2 className='text-2xl text-center font-bold mt-5'>Loading...</h2>
      }
    >
      <PostItems />
    </Suspense>
  )
}

export { Posts as UseExample2 }
