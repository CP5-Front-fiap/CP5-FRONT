import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white p-6 mt-8 shadow-inner">
      <div className="container mx-auto text-center">
        <p className="text-sm mb-2">
          © 2025 Hospital das Clinicas - USP
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          <Link to="/politica-privacidade" className="hover:text-blue-200 transition-colors">Política de Privacidade</Link>
          <Link to="/termos-uso" className="hover:text-blue-200 transition-colors">Termos de Uso</Link>
        </div>
      </div>
    </footer>
  )
}