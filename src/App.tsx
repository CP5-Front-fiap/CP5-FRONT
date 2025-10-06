import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home'
import ListaFuncionarios from './routes/ListaFuncionarios'
import Formulario from './routes/Formulario'
import Error from './routes/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/lista-funcionarios',
    element: <ListaFuncionarios />
  },
  {
    path: '/formulario',
    element: <Formulario />
  },
  {
    path: '/formulario/:id',
    element: <Formulario />
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App