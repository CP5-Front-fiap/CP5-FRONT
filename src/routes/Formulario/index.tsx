import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Cabecalho from '../../components/Cabecalho'
import Rodape from '../../components/Rodape'

interface Funcionario {
  id?: number
  nome: string
  cargo: string
  setor: string
  turno: string
  salario: number
}

export default function Formulario() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdicao = Boolean(id)

  const [funcionario, setFuncionario] = useState<Funcionario>({
    nome: '',
    cargo: '',
    setor: '',
    turno: '',
    salario: 0
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  // Carregar dados do funcionário para edição
  useEffect(() => {
    if (isEdicao && id) {
      const carregarFuncionario = async () => {
        try {
          setLoading(true)
          const response = await fetch(`http://localhost:3000/funcionarios/${id}` )
          if (response.ok) {
            const data = await response.json()
            setFuncionario(data)
          } else {
            alert('Funcionário não encontrado')
            navigate('/lista-funcionarios')
          }
        } catch (error) {
          console.error('Erro ao carregar funcionário:', error)
          alert('Erro ao carregar funcionário')
          navigate('/lista-funcionarios')
        } finally {
          setLoading(false)
        }
      }

      carregarFuncionario()
    }
  }, [id, isEdicao, navigate])

  // Validação do formulário
  const validarFormulario = (): boolean => {
    const novosErrors: { [key: string]: string } = {}

    if (!funcionario.nome.trim()) {
      novosErrors.nome = 'Nome é obrigatório'
    }

    if (!funcionario.cargo.trim()) {
      novosErrors.cargo = 'Cargo é obrigatório'
    }

    if (!funcionario.setor.trim()) {
      novosErrors.setor = 'Setor é obrigatório'
    }

    if (!funcionario.turno.trim()) {
      novosErrors.turno = 'Turno é obrigatório'
    }

    if (funcionario.salario <= 0) {
      novosErrors.salario = 'Salário deve ser maior que zero'
    }

    setErrors(novosErrors)
    return Object.keys(novosErrors).length === 0
  }

  // Submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      return
    }

    try {
      setLoading(true)

      const url = isEdicao 
        ? `http://localhost:3000/funcionarios/${id}`
        : 'http://localhost:3000/funcionarios'
      
      const method = isEdicao ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(funcionario )
      })

      if (response.ok) {
        alert(isEdicao ? 'Funcionário atualizado com sucesso!' : 'Funcionário cadastrado com sucesso!')
        navigate('/lista-funcionarios')
      } else {
        alert('Erro ao salvar funcionário')
      }
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error)
      alert('Erro ao salvar funcionário')
    } finally {
      setLoading(false)
    }
  }

  // Atualizar campo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFuncionario(prev => ({
      ...prev,
      [name]: name === 'salario' ? parseFloat(value) : value
    }))

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (loading && isEdicao) {
    return (
      <div className="min-h-screen flex flex-col">
        <Cabecalho />
        <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dados do funcionário...</p>
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
        <div className="container mx-auto max-w-2xl">
          {/* Cabeçalho da página */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {isEdicao ? 'Editar Funcionário' : 'Cadastrar Funcionário'}
            </h1>
            <p className="text-gray-600">
              {isEdicao 
                ? 'Atualize as informações do funcionário' 
                : 'Preencha os dados do novo funcionário'
              }
            </p>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={funcionario.nome}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.nome ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Digite o nome completo"
                />
                {errors.nome && (
                  <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
                )}
              </div>

              {/* Cargo */}
              <div>
                <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-2">
                  Cargo *
                </label>
                <input
                  type="text"
                  id="cargo"
                  name="cargo"
                  value={funcionario.cargo}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.cargo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Digite o cargo"
                />
                {errors.cargo && (
                  <p className="mt-1 text-sm text-red-600">{errors.cargo}</p>
                )}
              </div>

              {/* Setor */}
              <div>
                <label htmlFor="setor" className="block text-sm font-medium text-gray-700 mb-2">
                  Setor *
                </label>
                <input
                  type="text"
                  id="setor"
                  name="setor"
                  value={funcionario.setor}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.setor ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Digite o setor"
                />
                {errors.setor && (
                  <p className="mt-1 text-sm text-red-600">{errors.setor}</p>
                )}
              </div>

              {/* Turno */}
              <div>
                <label htmlFor="turno" className="block text-sm font-medium text-gray-700 mb-2">
                  Turno *
                </label>
                <select
                  id="turno"
                  name="turno"
                  value={funcionario.turno}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.turno ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Selecione o turno</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </select>
                {errors.turno && (
                  <p className="mt-1 text-sm text-red-600">{errors.turno}</p>
                )}
              </div>

              {/* Salário */}
              <div>
                <label htmlFor="salario" className="block text-sm font-medium text-gray-700 mb-2">
                  Salário *
                </label>
                <input
                  type="number"
                  id="salario"
                  name="salario"
                  value={funcionario.salario}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.salario ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.salario && (
                  <p className="mt-1 text-sm text-red-600">{errors.salario}</p>
                )}
              </div>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Salvando...
                    </div>
                  ) : (
                    isEdicao ? 'Atualizar Funcionário' : 'Cadastrar Funcionário'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/lista-funcionarios')}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Rodape />
    </div>
  )
}
