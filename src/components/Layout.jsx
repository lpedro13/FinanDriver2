import { Link, Outlet } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Cabeçalho */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  FinanDriver
                </span>
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Button variant="ghost" asChild>
                <Link to="/ganhos">Ganhos</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/despesas">Despesas</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/despesas-pessoais">Pessoais</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/reserva-emergencia">Reserva</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/relatorios">Relatórios</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
}