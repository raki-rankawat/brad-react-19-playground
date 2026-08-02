import { Route, Routes } from 'react-router'
import Layout from './layouts/Layout'
import { UseExample1 } from './components/useExample1/Joke'
import { UseExample2 } from './components/useExample2/Posts'
import { UseExample3 } from './components/useExample3/Message'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='use-example-1' element={<UseExample1 />} />
        <Route path='use-example-2' element={<UseExample2 />} />
        <Route path='use-example-3' element={<UseExample3 />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
