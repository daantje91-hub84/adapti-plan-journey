import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Target, Plus, CheckCircle, Circle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { mockProjects } from '../data/mockData'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const project = mockProjects.find(p => p.id === id)

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Projekt nicht gefunden</h2>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zum Dashboard
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const completedMilestones = project.milestones.filter(m => m.isCompleted).length
  const totalMilestones = project.milestones.length
  const progressPercentage = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{project.title}</h1>
          <p className="text-muted-foreground mt-1">{project.description}</p>
        </div>
        <Button className="gradient-warm text-white">
          <Plus className="w-4 h-4 mr-2" />
          Meilenstein hinzufügen
        </Button>
      </div>

      {/* Project Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gesamtfortschritt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-2">
              {Math.round(progressPercentage)}%
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {completedMilestones} von {totalMilestones} Meilensteinen
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Deadline
            </CardTitle>
          </CardHeader>
          <CardContent>
            {project.deadline ? (
              <>
                <div className="text-2xl font-bold text-foreground">
                  {format(project.deadline, 'dd. MMM', { locale: de })}
                </div>
                <p className="text-xs text-muted-foreground">
                  {format(project.deadline, 'yyyy', { locale: de })}
                </p>
              </>
            ) : (
              <div className="text-lg text-muted-foreground">Keine Deadline</div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge 
              variant={progressPercentage === 100 ? "default" : "secondary"}
              className="text-sm"
            >
              {progressPercentage === 100 ? 'Abgeschlossen' : 'In Bearbeitung'}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Milestones Timeline */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Meilensteine</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.milestones.map((milestone, index) => (
              <div 
                key={milestone.id} 
                className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-1">
                  {milestone.isCompleted ? (
                    <CheckCircle className="w-5 h-5 text-warm-green" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${milestone.isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                    {milestone.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {milestone.description}
                  </p>
                  {milestone.dueDate && (
                    <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      <span>
                        Fällig: {format(milestone.dueDate, 'dd. MMM yyyy', { locale: de })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      Gewichtung: {milestone.weight}%
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {milestone.tasks.length} Aufgaben
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProjectDetail