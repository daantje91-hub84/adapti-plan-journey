import React from 'react'
import { Plus, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import ProjectCard from './ProjectCard'
import { mockProjects } from '../data/mockData'

const Projects: React.FC = () => {
  const activeProjects = mockProjects.filter(project => project.progress < 100)
  const completedProjects = mockProjects.filter(project => project.progress === 100)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meine Projekte</h1>
          <p className="text-muted-foreground mt-1">
            Verwalte und verfolge alle deine Projekte an einem Ort.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="gradient-warm text-white hover:opacity-90 shadow-warm">
            <Plus className="w-4 h-4 mr-2" />
            Neues Projekt
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Gesamt Projekte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{mockProjects.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Aktive Projekte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{activeProjects.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Abgeschlossen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{completedProjects.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Aktive Projekte</h2>
        {activeProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center h-48 text-center">
              <Plus className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-foreground mb-2">Keine aktiven Projekte</h3>
              <p className="text-sm text-muted-foreground">
                Alle deine Projekte sind abgeschlossen. Zeit für neue Ziele!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Abgeschlossene Projekte</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="animate-slide-in opacity-75"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects