
import { useState } from 'react';
import { lessons as initialLessons } from '@/data/lessons';
import { Lesson } from '@/types/lesson';
import Header from '@/components/Header';
import LessonCard from '@/components/LessonCard';
import VideoPlayer from '@/components/VideoPlayer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Play, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [lessons, setLessons] = useState(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const completedLessons = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;
  const totalDuration = lessons.reduce((total, lesson) => {
    const [minutes, seconds] = lesson.duration.split(':').map(Number);
    return total + minutes + (seconds / 60);
  }, 0);

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleBackToList = () => {
    setSelectedLesson(null);
  };

  const handleLessonComplete = () => {
    if (selectedLesson) {
      setLessons(prev => 
        prev.map(lesson => 
          lesson.id === selectedLesson.id 
            ? { ...lesson, completed: true }
            : lesson
        )
      );
    }
  };

  const handleNextLesson = () => {
    if (selectedLesson) {
      const currentIndex = lessons.findIndex(l => l.id === selectedLesson.id);
      if (currentIndex < lessons.length - 1) {
        setSelectedLesson(lessons[currentIndex + 1]);
      }
    }
  };

  const hasNextLesson = selectedLesson ? 
    lessons.findIndex(l => l.id === selectedLesson.id) < lessons.length - 1 : false;

  if (selectedLesson) {
    return (
      <div className="min-h-screen bg-aulaflix-gradient">
        <Header />
        <VideoPlayer
          lesson={selectedLesson}
          onBack={handleBackToList}
          onNext={hasNextLesson ? handleNextLesson : undefined}
          onComplete={handleLessonComplete}
          hasNextLesson={hasNextLesson}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aulaflix-gradient">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">
            Bem-vindo de volta! 👋
          </h2>
          <p className="text-netflix-light-gray text-lg">
            Continue sua jornada de aprendizado onde parou.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-netflix-dark-gray border-netflix-medium-gray">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-netflix-light-gray text-sm">Progresso Geral</p>
                  <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
                </div>
                <GraduationCap className="w-8 h-8 text-netflix-red" />
              </div>
              <Progress value={progressPercentage} className="mt-3" />
            </CardContent>
          </Card>

          <Card className="bg-netflix-dark-gray border-netflix-medium-gray">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-netflix-light-gray text-sm">Total de Aulas</p>
                  <p className="text-2xl font-bold">{lessons.length}</p>
                </div>
                <Play className="w-8 h-8 text-netflix-red" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-netflix-dark-gray border-netflix-medium-gray">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-netflix-light-gray text-sm">Concluídas</p>
                  <p className="text-2xl font-bold">{completedLessons}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-netflix-dark-gray border-netflix-medium-gray">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-netflix-light-gray text-sm">Duração Total</p>
                  <p className="text-2xl font-bold">{Math.round(totalDuration)}min</p>
                </div>
                <Clock className="w-8 h-8 text-netflix-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lessons Grid */}
        <Card className="bg-netflix-dark-gray border-netflix-medium-gray">
          <CardHeader>
            <CardTitle className="text-2xl">Suas Aulas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  onClick={() => handleLessonClick(lesson)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Lesson Suggestion */}
        {completedLessons < lessons.length && (
          <Card className="bg-gradient-to-r from-netflix-red/20 to-netflix-dark-red/20 border-netflix-red/30 mt-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Próxima Aula Recomendada</h3>
                  <p className="text-netflix-light-gray">
                    {lessons.find(l => !l.completed)?.title || "Todas as aulas concluídas!"}
                  </p>
                </div>
                <div className="w-16 h-16 bg-netflix-red rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                     onClick={() => {
                       const nextLesson = lessons.find(l => !l.completed);
                       if (nextLesson) handleLessonClick(nextLesson);
                     }}>
                  <Play className="w-8 h-8 text-white fill-current ml-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
