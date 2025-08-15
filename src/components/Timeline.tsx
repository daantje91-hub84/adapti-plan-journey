import React from 'react'
import { Clock, Target, BookOpen, Trophy, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

const Timeline: React.FC = () => {
  const timelineEvents = [
    {
      id: 1,
      type: 'milestone',
      title: 'Erstes 5km Lauf geschafft',
      project: 'Fitness Ziel',
      time: 'vor 2 Stunden',
      icon: Trophy,
      color: 'warm-green'
    },
    {
      id: 2,
      type: 'note',
      title: 'Persönliche Notiz hinzugefügt',
      project: 'Sprache lernen',
      time: 'vor 5 Stunden',
      icon: BookOpen,
      color: 'warm-blue'
    },
    {
      id: 3,
      type: 'task',
      title: 'Aufgabe abgeschlossen: Kapitel 2 durcharbeiten',
      project: 'Persönliche Entwicklung',
      time: 'gestern',
      icon: Target,
      color: 'warm-orange'
    },
    {
      id: 4,
      type: 'milestone',
      title: 'Projekt "Grundlagen JavaScript" abgeschlossen',
      project: 'Programmieren lernen',
      time: 'vor 2 Tagen',
      icon: Trophy,
      color: 'warm-green'
    },
    {
      id: 5,
      type: 'progress',
      title: '50% Fortschritt erreicht',
      project: 'Karriere Entwicklung',
      time: 'vor 3 Tagen',
      icon: TrendingUp,
      color: 'warm-purple'
    }
  ]

  const groupedEvents = timelineEvents.reduce((groups, event) => {
    let timeGroup
    if (event.time.includes('Stunden')) {
      timeGroup = 'Heute'
    } else if (event.time === 'gestern') {
      timeGroup = 'Gestern'
    } else {
      timeGroup = 'Diese Woche'
    }
    
    if (!groups[timeGroup]) {
      groups[timeGroup] = []
    }
    groups[timeGroup].push(event)
    return groups
  }, {} as Record<string, typeof timelineEvents>)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Timeline</h1>
          <p className="text-muted-foreground mt-1">
            Verfolge deinen Fortschritt und deine Erfolge über die Zeit.
          </p>
        </div>
        <Button variant="outline">
          <Clock className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Stats Widget */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Wochenübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warm-green">12</div>
              <div className="text-sm text-muted-foreground">Aufgaben erledigt</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warm-blue">3</div>
              <div className="text-sm text-muted-foreground">Meilensteine erreicht</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warm-orange">8h 30m</div>
              <div className="text-sm text-muted-foreground">Fokuszeit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warm-purple">+15%</div>
              <div className="text-sm text-muted-foreground">Produktivität</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([timeGroup, events]) => (
          <div key={timeGroup}>
            <h2 className="text-xl font-semibold text-foreground mb-4 sticky top-4 bg-background/80 backdrop-blur-sm py-2">
              {timeGroup}
            </h2>
            <div className="space-y-4">
              {events.map((event, index) => {
                const Icon = event.icon
                return (
                  <Card key={event.id} className="shadow-card hover:shadow-elevated transition-shadow">
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className={`p-2 rounded-lg bg-${event.color}/10 flex-shrink-0`}>
                        <Icon className={`w-5 h-5 text-${event.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground mb-1">{event.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {event.project}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{event.time}</span>
                        </div>
                        {event.type === 'milestone' && (
                          <p className="text-sm text-muted-foreground">
                            Herzlichen Glückwunsch! Du hast einen wichtigen Meilenstein erreicht.
                          </p>
                        )}
                        {event.type === 'progress' && (
                          <p className="text-sm text-muted-foreground">
                            Du kommst deinem Ziel immer näher. Weiter so!
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">
          Weitere Ereignisse laden
        </Button>
      </div>
    </div>
  )
}

export default Timeline