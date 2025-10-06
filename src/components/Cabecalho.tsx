import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo e Nome */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            onClick={closeMenu}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hospital das Clinicas
            </span>
            <img 
              src="/img/logo-hc.png" 
              alt="Hospital das Clínicas FMUSP" 
              className="h-10 w-auto bg-white rounded-lg p-1 shadow-sm border border-gray-200"
            />
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium px-4 py-2 rounded-lg"
            >
              Início
            </Link>
            <Link 
              to="/lista-funcionarios" 
              className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium px-4 py-2 rounded-lg"
            >
              Funcionario
            </Link>    
          </nav>

          {/* Botão Menu Mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span 
                className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              ></span>
              <span 
                className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 mt-1 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span 
                className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 mt-1 ${
                  isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Menu Mobile */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 space-y-2 border-t border-gray-100">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium px-4 py-3 rounded-lg"
              onClick={closeMenu}
            >
              Início
            </Link>
            <Link 
              to="/solucao" 
              className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium px-4 py-3 rounded-lg"
              onClick={closeMenu}
            >
              Funcionario
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}