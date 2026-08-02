import { NavLink } from 'react-router'

const Home = () => {
  return (
    <>
      <ul>
        <li className='bg-blue-50 p-4 rounded shadow my-5'>
          <h4 className='text-2xl font-bold'>use() Hook Example 1:</h4>
          <p className='my-2'>
            Use the `use()` hook to fetch a random joke from the Chuck Norris
            API
          </p>
          <NavLink to='/use-example-1' className='font-bold text-blue-800'>
            View
          </NavLink>
        </li>

        <li className='bg-blue-50 p-4 rounded shadow my-5'>
          <h4 className='text-2xl font-bold'>use() Hook Example 2:</h4>
          <p className='my-2'>
            Use the `use()` hook to fetch some posts from the JSONPlaceholder
            API
          </p>
          <NavLink to='/use-example-2' className='font-bold text-blue-800'>
            View
          </NavLink>
        </li>

        <li className='bg-blue-50 p-4 rounded shadow my-5'>
          <h4 className='text-2xl font-bold'>use() Hook Example 3:</h4>
          <p className='my-2'>
            Use the `use()` hook to resolve a message from a promise and show it
          </p>
          <NavLink to='/use-example-3' className='font-bold text-blue-800'>
            View
          </NavLink>
        </li>
      </ul>
    </>
  )
}

export default Home
