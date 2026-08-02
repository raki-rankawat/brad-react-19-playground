import { Route, Routes } from 'react-router'
import Layout from './layouts/Layout'
import { UseExample1 } from './components/useExample1/Joke'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='use-example-1' element={<UseExample1 />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
