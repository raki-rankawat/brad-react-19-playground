import { Link } from 'react-router'

const NotFound = () => {
  return (
    <div className='text-center'>
      <h2 className='text-2xl font-bold mb-3'>404 &mdash; Page not found</h2>

      <Link
        to='/'
        className='text-violet-800 underline underline-offset-4'
      >
        Back to home
      </Link>
    </div>
  )
}

export default NotFound
