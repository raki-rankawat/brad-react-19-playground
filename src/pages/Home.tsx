import { NavLink } from 'react-router'

type ListItemProps = {
  title: string
  desc: string
  url: string
}

const ListItem = ({ title, desc, url }: ListItemProps) => {
  return (
    <li className='bg-blue-50 p-4 rounded shadow my-5'>
      <h4 className='text-2xl font-bold'>{title}</h4>
      <p className='my-2'>{desc}</p>
      <NavLink to={url} className='font-bold text-blue-800'>
        View
      </NavLink>
    </li>
  )
}

const Home = () => {
  return (
    <>
      <ul>
        <ListItem
          title='use() Hook Example 1'
          desc='Use the `use()` hook to fetch a random joke from the Chuck Norris API'
          url='/use-example-1'
        />
        <ListItem
          title='use() Hook Example 2'
          desc='Use the `use()` hook to fetch some posts from the JSONPlaceholder API'
          url='/use-example-2'
        />
        <ListItem
          title='use() Hook Example 3'
          desc='Use the `use()` hook to resolve a message from a promise and show it'
          url='/use-example-3'
        />
        <ListItem
          title='use() Hook Example 4'
          desc='Use the `use()` hook to apply aa theme context'
          url='/use-example-4'
        />
        <ListItem
          title='Action Example 1'
          desc='Use action to submit a post form'
          url='/action-example-1'
        />
        <ListItem
          title='Action Example 2'
          desc='Use an action to add product to cart via form'
          url='/action-example-2'
        />
      </ul>
    </>
  )
}

export default Home
