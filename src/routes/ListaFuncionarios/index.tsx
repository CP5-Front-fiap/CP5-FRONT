import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cabecalho from '../../components/Cabecalho'
import Rodape from '../../components/Rodape'

interface Funcionario {
  id: number
  nome: string
  cargo: string
  setor: string
  turno: string
  salario: number
}

export default function ListaFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const [loading, setLoading] = useState(true)

  // Função auxiliar para formatar salário
  const formatarSalario = (salario: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(salario)
  }

  // Carregar funcionários do json-server
  useEffect(() => {
    const carregarFuncionarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/funcionarios' )
        const data = await response.json()
        setFuncionarios(data)
      } catch (error) {
        console.error('Erro ao carregar funcionários:', error)
      } finally {
        setLoading(false)
      }
    }

    carregarFuncionarios()
  }, [])

  // Função para excluir funcionário
  const excluirFuncionario = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este funcionário?')) {
      try {
        const response = await fetch(`http://localhost:3000/funcionarios/${id}`, {
          method: 'DELETE'
        } )
        
        if (response.ok) {
          setFuncionarios(funcionarios.filter(func => func.id !== id))
          alert('Funcionário excluído com sucesso!')
        } else {
          alert('Erro ao excluir funcionário')
        }
      } catch (error) {
        console.error('Erro ao excluir funcionário:', error)
        alert('Erro ao excluir funcionário')
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Cabecalho />
        <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando funcionários...</p>
          </div>
        </main>
        <Rodape />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="container mx-auto">
          {/* Cabeçalho da página */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  Lista de Funcionários
                </h1>
                <p className="text-gray-600">
                  Gerencie os funcionários do Hospital das Clínicas
                </p>
              </div>
              <Link
                to="/formulario"
                className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                + Adicionar Funcionário
              </Link>
            </div>
          </div>

          {/* Tabela de funcionários */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cargo
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Setor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Turno
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salário
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {funcionarios.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                        Nenhum funcionário cadastrado
                      </td>
                    </tr>
                  ) : (
                    funcionarios.map((funcionario) => (
                      <tr key={funcionario.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {funcionario.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {funcionario.nome}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {funcionario.cargo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {funcionario.setor}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            funcionario.turno === 'Manhã' ? 'bg-yellow-100 text-yellow-800' :
                            funcionario.turno === 'Tarde' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {funcionario.turno}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatarSalario(funcionario.salario)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <Link
                            to={`/formulario/${funcionario.id}`}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                          >
                            Editar
                          </Link>
                          <button
                            onClick={() => excluirFuncionario(funcionario.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Estatísticas */}
          {funcionarios.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {funcionarios.length}
                </div>
                <div className="text-gray-600">Total de Funcionários</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {new Set(funcionarios.map(f => f.setor)).size}
                </div>
                <div className="text-gray-600">Setores Ativos</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {formatarSalario(funcionarios.reduce((acc, f) => acc + f.salario, 0))}
                </div>
                <div className="text-gray-600">Folha de Pagamento</div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Rodape />
    </div>
  )
}
