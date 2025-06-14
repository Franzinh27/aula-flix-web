import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

const MatrixBackground = () => {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF00';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      id="matrix-canvas"
      className="fixed inset-0 z-0"
      style={{ backgroundColor: '#000000' }}
    />
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const { login, isLoading } = useAuth();

  const createExplosion = () => {
    setIsExploding(true);
    setTimeout(() => setIsExploding(false), 2000);
  };

  const playCashFlowMoneySound = () => {
    // Create AudioContext
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // CashFlow-inspired money sound with multiple coin drops and cash register
    const playMoneySound = () => {
      // Main cash register sound
      const createCashRegister = (delay: number) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
          
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.02);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.4);
        }, delay);
      };

      // Multiple coin drops simulation
      const createCoinDrop = (frequency: number, delay: number) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.type = 'triangle';
          oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.5, audioContext.currentTime + 0.15);
          
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.2);
        }, delay);
      };

      // Paper money shuffling sound
      const createPaperSound = (delay: number) => {
        setTimeout(() => {
          const bufferSize = 4096;
          const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
          const output = buffer.getChannelData(0);
          
          for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * 0.1;
          }
          
          const whiteNoise = audioContext.createBufferSource();
          whiteNoise.buffer = buffer;
          
          const filter = audioContext.createBiquadFilter();
          filter.type = 'highpass';
          filter.frequency.setValueAtTime(800, audioContext.currentTime);
          
          const gainNode = audioContext.createGain();
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
          gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
          
          whiteNoise.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          whiteNoise.start(audioContext.currentTime);
          whiteNoise.stop(audioContext.currentTime + 0.3);
        }, delay);
      };

      // Victory chime
      const createVictoryChime = (delay: number) => {
        setTimeout(() => {
          const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C major chord
          
          frequencies.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.8);
            
            oscillator.start(audioContext.currentTime + index * 0.1);
            oscillator.stop(audioContext.currentTime + 0.8);
          });
        }, delay);
      };

      // Orchestrate the complete money sound effect
      createCashRegister(0);           // Immediate cash register
      createCoinDrop(1800, 100);       // First coin
      createCoinDrop(1600, 200);       // Second coin
      createCoinDrop(1400, 280);       // Third coin
      createCoinDrop(1200, 350);       // Fourth coin
      createPaperSound(150);           // Paper money sound
      createVictoryChime(400);         // Victory chime
      
      // Additional coin drops for richness
      createCoinDrop(1000, 450);
      createCoinDrop(1100, 520);
      createCoinDrop(900, 580);
    };

    playMoneySound();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    createExplosion();
    playCashFlowMoneySound();
    
    if (!email) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, insira seu email.",
        variant: "destructive"
      });
      return;
    }

    const success = await login(email, password);
    
    if (!success) {
      toast({
        title: "Credenciais inválidas",
        description: "Email ou senha incorretos.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao CashFlow Mastery!",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <MatrixBackground />
      
      {/* Neo Glasses Animation */}
      {isExploding && (
        <div className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="animate-neo-glasses">
            <img 
              src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=400&q=80"
              alt="Neo Matrix Glasses"
              className="w-32 h-32 object-cover rounded-full border-4 border-green-500 shadow-2xl shadow-green-500/50"
            />
          </div>
        </div>
      )}
      
      <Card className="w-full max-w-md border-0 animate-scale-in relative z-10 bg-netflix-medium-gray">
        <CardHeader className="text-center space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold flex items-baseline justify-center">
              <span className="cashflow-text">Ca$hFlow</span>
              <span className="mastery-text ml-2">Ma$tery</span>
            </div>
          </div>
          <CardDescription className="text-white">
            Acesse sua área de membros para continuar aprendendo
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-netflix-dark-gray border-netflix-medium-gray focus:border-netflix-red transition-colors"
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-white">
                Senha
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-netflix-dark-gray border-netflix-medium-gray focus:border-netflix-red transition-colors pr-12"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-netflix-light-gray hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full h-12 hover:scale-105 transition-transform font-semibold text-white bg-netflix-red hover:bg-netflix-dark-red"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <style>{`
        .cashflow-text {
          background: linear-gradient(45deg, #FFD700, #FFA500, #FFFF00, #FFD700);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease-in-out infinite;
          font-weight: 800;
          text-shadow: 2px 2px 4px rgba(255, 215, 0, 0.3);
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.5px;
        }

        .mastery-text {
          background: linear-gradient(45deg, #8A2BE2, #9932CC, #BA55D3);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 400;
          font-style: italic;
          font-family: 'Inter', sans-serif;
          opacity: 0.9;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes neo-glasses {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
            filter: brightness(1) drop-shadow(0 0 0 #00FF00);
          }
          25% {
            transform: scale(1.2) rotate(10deg);
            opacity: 0.8;
            filter: brightness(1.5) drop-shadow(0 0 20px #00FF00);
          }
          50% {
            transform: scale(1) rotate(-5deg);
            opacity: 1;
            filter: brightness(2) drop-shadow(0 0 40px #00FF00);
          }
          75% {
            transform: scale(1.1) rotate(3deg);
            opacity: 0.9;
            filter: brightness(1.8) drop-shadow(0 0 30px #00FF00);
          }
          100% {
            transform: scale(0.8) rotate(0deg);
            opacity: 0;
            filter: brightness(1) drop-shadow(0 0 0 #00FF00);
          }
        }

        .animate-neo-glasses {
          animation: neo-glasses 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
