
import { useEffect } from 'react';
import { Lesson } from '@/types/lesson';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Clock, CheckCircle } from 'lucide-react';

interface VideoPlayerProps {
  lesson: Lesson;
  onBack: () => void;
  onNext?: () => void;
  onComplete: () => void;
  hasNextLesson: boolean;
}

const VideoPlayer = ({ lesson, onBack, onNext, onComplete, hasNextLesson }: VideoPlayerProps) => {
  // Extract video ID from URL for better embedding
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId[1]}?autoplay=1&rel=0`;
      }
    }
    
    // For Wistia or other platforms, return the original URL
    if (url.includes('wistia') || url.includes('embed')) {
      return url;
    }
    
    return url;
  };

  useEffect(() => {
    // Mark lesson as completed after 30 seconds (simulating video completion)
    const timer = setTimeout(() => {
      onComplete();
    }, 30000);

    return () => clearTimeout(timer);
  }, [lesson.id, onComplete]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Video Player */}
        <Card className="bg-netflix-dark-gray border-netflix-medium-gray mb-6">
          <CardContent className="p-0">
            <div className="video-container">
              <iframe
                src={getEmbedUrl(lesson.videoUrl)}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-t-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Lesson Info and Controls */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="bg-netflix-dark-gray border-netflix-medium-gray">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{lesson.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-netflix-light-gray">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{lesson.duration}</span>
                      </div>
                      {lesson.completed && (
                        <div className="flex items-center text-green-500">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">Concluída</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-netflix-light-gray leading-relaxed">
                  {lesson.description}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            {/* Navigation Controls */}
            <Card className="bg-netflix-dark-gray border-netflix-medium-gray">
              <CardHeader>
                <CardTitle className="text-lg">Navegação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={onBack}
                  variant="outline"
                  className="w-full border-netflix-medium-gray hover:border-netflix-red hover:bg-netflix-red/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar às Aulas
                </Button>
                
                {hasNextLesson && onNext && (
                  <Button
                    onClick={onNext}
                    className="w-full netflix-red-gradient hover:scale-105 transition-transform"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Próxima Aula
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Progress Indicator */}
            <Card className="bg-netflix-dark-gray border-netflix-medium-gray">
              <CardHeader>
                <CardTitle className="text-lg">Progresso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-netflix-red mb-2">
                    {lesson.id}/6
                  </div>
                  <p className="text-netflix-light-gray text-sm">
                    Aula {lesson.id} de 6
                  </p>
                  <div className="w-full bg-netflix-medium-gray rounded-full h-2 mt-3">
                    <div 
                      className="bg-netflix-red h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(lesson.id / 6) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
