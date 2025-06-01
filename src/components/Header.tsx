
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOut, Play, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-netflix-dark/95 backdrop-blur-md border-b border-netflix-medium-gray sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-netflix-red rounded-lg flex items-center justify-center">
              <Play className="w-6 h-6 text-white fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-netflix-red to-white bg-clip-text text-transparent">
                AulaFlix
              </h1>
              <p className="text-xs text-netflix-light-gray">
                Área de Membros
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-netflix-medium-gray text-white text-sm">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs text-netflix-light-gray">Membro</p>
              </div>
            </div>
            
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="border-netflix-medium-gray hover:border-netflix-red hover:bg-netflix-red/10 transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
