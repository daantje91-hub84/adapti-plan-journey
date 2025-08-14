import React from 'react'
import { Plus, Target, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import ProjectCard from './ProjectCard'
import { mockProjects } from '../data/mockData'

const Dashboard: React.FC = () => {
  const activeProjects = mockProjects.filter(project => project.progress < 100)
  const completedProjects = mockProjects.filter(project => project.progress === 100)
  
  const stats = [
    {
      title: 'Aktive Projekte',
      value: activeProjects.length.toString(),
      icon: Target,
      color: 'warm-blue'
    },
    {
      title: 'Abgeschlossen',
      value: completedProjects.length.toString(),
      icon: TrendingUp,
      color: 'warm-green'
    },
    {
      title: 'Diese Woche',
      value: '12',
      icon: Clock,
      color: 'warm-orange'
    }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Willkommen zurück! Hier ist dein Fortschritts-Überblick.
          </p>
        </div>
        <Button className="gradient-warm text-white hover:opacity-90 shadow-warm">
          <Plus className="w-4 h-4 mr-2" />
          Neues Projekt
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                  <Icon className={`w-4 h-4 text-${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Active Projects */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Aktive Projekte</h2>
          <Button variant="outline">
            Alle anzeigen
          </Button>
        </div>
        
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
            
            {/* Add Project Card */}
            <Card className="border-dashed border-2 border-muted hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="flex flex-col items-center justify-center h-48 text-center">
                <div className="w-12 h-12 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors">
                  <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-medium text-foreground mb-2">Neues Projekt erstellen</h3>
                <p className="text-sm text-muted-foreground">
                  Klicke hier, um ein neues Projekt zu starten
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center h-48 text-center">
              <Target className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-foreground mb-2">Noch keine Projekte</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Erstelle dein erstes Projekt und beginne mit dem Verfolgen deiner Ziele
              </p>
              <Button className="gradient-warm text-white">
                <Plus className="w-4 h-4 mr-2" />
                Erstes Projekt erstellen
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Letzte Aktivitäten</h2>
        <Card className="shadow-card">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { action: 'Meilenstein abgeschlossen', project: 'Fitness Ziel', time: 'vor 2 Stunden' },
                { action: 'Neues Projekt erstellt', project: 'Sprache lernen', time: 'vor 1 Tag' },
                { action: 'Aufgabe erledigt', project: 'Karriere Entwicklung', time: 'vor 2 Tagen' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.project}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard