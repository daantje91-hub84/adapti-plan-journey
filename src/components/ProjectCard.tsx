import React from 'react'
import { Link } from 'react-router-dom'
import { Calendar, CheckCircle, Circle } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Project } from '../types'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const nextMilestone = project.milestones.find(m => !m.isCompleted)
  const completedMilestones = project.milestones.filter(m => m.isCompleted).length
  const totalMilestones = project.milestones.length

  const getColorClasses = (color: Project['color']) => {
    const colorMap = {
      'warm-blue': 'from-blue-500 to-blue-600',
      'warm-violet': 'from-violet-500 to-violet-600',
      'warm-green': 'from-green-500 to-green-600',
      'warm-orange': 'from-orange-500 to-orange-600',
    }
    return colorMap[color] || colorMap['warm-blue']
  }

  return (
    <Link to={`/project/${project.id}`}>
      <Card className="group hover:shadow-elevated transition-all duration-300 cursor-pointer h-full border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {project.description}
              </p>
            </div>
            <Badge 
              variant="secondary" 
              className={`ml-2 bg-gradient-to-r ${getColorClasses(project.color)} text-white border-0`}
            >
              {project.progress}%
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fortschritt</span>
              <span className="font-medium text-foreground">{completedMilestones}/{totalMilestones} Meilensteine</span>
            </div>
            <div className="progress-bar">
              <div 
                className={`progress-fill bg-gradient-to-r ${getColorClasses(project.color)}`}
                style={{ width: `${(completedMilestones / totalMilestones) * 100}%` }}
              />
            </div>
          </div>

          {/* Next Milestone */}
          {nextMilestone && (
            <div className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
              <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {nextMilestone.title}
                </p>
                <p className="text-xs text-muted-foreground">Nächster Meilenstein</p>
              </div>
            </div>
          )}

          {/* Deadline */}
          {project.deadline && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                Deadline: {format(project.deadline, 'dd. MMM yyyy', { locale: de })}
              </span>
            </div>
          )}

          {/* Completed Milestones Indicator */}
          {completedMilestones > 0 && (
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle className="w-4 h-4 text-warm-green" />
              <span className="text-muted-foreground">
                {completedMilestones} von {totalMilestones} Meilensteinen abgeschlossen
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProjectCard