import Cabecalho from '../../components/Cabecalho'
import Rodape from '../../components/Rodape'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Hospital das Clínicas
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Excelência em saúde, ensino e pesquisa há mais de 75 anos
            </p>
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
              <img 
                src="/img/fachada.jpg" 
                alt="Hospital das Clínicas - Fachada Principal" 
                className="w-full h-64 md:h-80 object-cover rounded-xl mb-6"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Tradição e Inovação em Saúde
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                O Hospital das Clínicas da Faculdade de Medicina da Universidade de São Paulo (HCFMUSP) 
                é um dos maiores complexos hospitalares da América Latina. Fundado em 1944, o HC é 
                referência nacional e internacional em assistência médica de alta complexidade, 
                formação de profissionais de saúde e desenvolvimento de pesquisas científicas.
              </p>
            </div>
          </div>
        </section>

        {/* Matéria Principal */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
              <div className="md:flex">
                <div className="md:w-1/2">                
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="text-sm text-blue-600 font-semibold mb-2">NOTÍCIAS</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    HC Implementa Novo Sistema de Gestão de Funcionários
                  </h3>
                  <p className="text-gray-600 mb-4">
                    O Hospital das Clínicas anuncia a implementação de um moderno sistema de 
                    cadastro e gestão de funcionários, desenvolvido para otimizar os processos 
                    administrativos e melhorar a eficiência operacional.
                  </p>
                  <p className="text-gray-600 mb-6">
                    O novo sistema permite o controle completo dos dados dos colaboradores, 
                    incluindo informações sobre cargos, setores, turnos e salários, 
                    proporcionando maior transparência e agilidade na gestão de recursos humanos.
                  </p>
                  <div className="text-sm text-gray-500">
                    Publicado em 05 de Outubro de 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Estatísticas */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">15.000+</div>
                <div className="text-gray-600">Funcionários</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">2.200</div>
                <div className="text-gray-600">Leitos</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
                <div className="text-gray-600">Atendimentos/Ano</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Rodape />
    </div>
  )
}