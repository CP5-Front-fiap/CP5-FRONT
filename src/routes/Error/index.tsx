import { Link } from 'react-router-dom'
import Cabecalho from '../../components/Cabecalho'
import Rodape from '../../components/Rodape'

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
            <div className="text-6xl font-bold text-blue-600 mb-4">404</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Página não encontrada
            </h1>
            <p className="text-gray-600 mb-8">
              A página que você está procurando não existe ou foi movida.
            </p>
            <Link
              to="/"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </main>

      <Rodape />
    </div>
  )
}