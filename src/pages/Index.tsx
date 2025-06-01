
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/LoginForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aulaflix-gradient">
        <div className="text-center">
          <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center mb-4 animate-pulse mx-auto">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-netflix-light-gray">Carregando AulaFlix...</p>
        </div>
      </div>
    );
  }

  return user?.isAuthenticated ? <Dashboard /> : <LoginForm />;
};

export default Index;
