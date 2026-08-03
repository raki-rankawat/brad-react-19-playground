import { useState } from 'react'

type Post = {
  title: string
  body: string
}

type AddPost = (post: Post) => void

const PostItem = ({ post }: { post: Post }) => {
  return (
    <div className='bg-violet-50 shadow-md p-4 my-6 rounded-lg'>
      <h2 className='text-xl font-bold'>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  )
}

const PostForm = ({ addPost }: { addPost: AddPost }) => {
  const formAction = (formData: FormData) => {
    const newPost = {
      title: String(formData.get('title')),
      body: String(formData.get('body')),
    }

    addPost(newPost)
  }

  return (
    <form
      action={formAction}
      className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
    >
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='title'
        >
          Title
        </label>
        <input
          type='text'
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none foucs:shadow-outline'
          id='title'
          placeholder='Enter title'
          name='title'
        />
      </div>

      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='body'
        >
          Body
        </label>
        <textarea
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none foucs:shadow-outline'
          id='body'
          rows={5}
          placeholder='Enter body'
          name='body'
        />
      </div>

      <div className='flex item-center justify-between'>
        <button
          type='submit'
          className='bg-violet-700 text-white font-bold py-2 px-4 rounded foucs:outline-none focus:shadow-outline'
        >
          Submit
        </button>
      </div>
    </form>
  )
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const addPost = (newPost: Post) => {
    setPosts(posts => [...posts, newPost])
  }

  return (
    <>
      <PostForm addPost={addPost} />
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </>
  )
}

export { Posts as ActionExample1 }
