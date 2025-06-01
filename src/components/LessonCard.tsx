
import { Lesson } from '@/types/lesson';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, CheckCircle } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  onClick: () => void;
}

const LessonCard = ({ lesson, onClick }: LessonCardProps) => {
  return (
    <Card 
      className="lesson-card-hover cursor-pointer bg-netflix-dark-gray border-netflix-medium-gray overflow-hidden group"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={lesson.thumbnailUrl}
          alt={lesson.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-netflix-red/90 text-white border-0">
              <Clock className="w-3 h-3 mr-1" />
              {lesson.duration}
            </Badge>
            {lesson.completed && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-16 h-16 bg-netflix-red/90 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Play className="w-8 h-8 text-white fill-current ml-1" />
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-netflix-red transition-colors">
          {lesson.title}
        </h3>
        <p className="text-netflix-light-gray text-sm line-clamp-3">
          {lesson.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
