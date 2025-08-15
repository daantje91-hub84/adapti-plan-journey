import React, { useState, useEffect } from 'react'
import { Clock, Play, Pause, RotateCcw, CheckCircle, Circle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Progress } from './ui/progress'

const Today: React.FC = () => {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1)
      }, 1000)
    } else if (pomodoroTime === 0) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, pomodoroTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const resetPomodoro = () => {
    setPomodoroTime(25 * 60)
    setIsRunning(false)
  }

  const todayTasks = [
    { id: 1, title: 'Morgenroutine abschließen', completed: true, project: 'Persönliche Entwicklung' },
    { id: 2, title: '30 Minuten Deutsch lernen', completed: false, project: 'Sprache lernen' },
    { id: 3, title: 'Jogging im Park', completed: false, project: 'Fitness Ziel' },
    { id: 4, title: 'Kapitel 3 lesen', completed: false, project: 'Persönliche Entwicklung' },
    { id: 5, title: 'Wochenplanung aktualisieren', completed: false, project: 'Produktivität' }
  ]

  const completedTasks = todayTasks.filter(task => task.completed).length
  const totalTasks = todayTasks.length
  const progressPercentage = (completedTasks / totalTasks) * 100

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Heute</h1>
          <p className="text-muted-foreground mt-1">
            {currentDate.toLocaleDateString('de-DE', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Daily Progress */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-warm-green" />
            Tagesfortschritt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>{completedTasks} von {totalTasks} Aufgaben erledigt</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Pomodoro Timer */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-warm-orange" />
            Pomodoro Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl font-mono font-bold text-foreground">
              {formatTime(pomodoroTime)}
            </div>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setIsRunning(!isRunning)}
                className="gradient-warm text-white hover:opacity-90"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pausieren
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Starten
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={resetPomodoro}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Zurücksetzen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Tasks */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Heutige Aufgaben</h2>
        <div className="space-y-3">
          {todayTasks.map((task) => (
            <Card key={task.id} className="shadow-card hover:shadow-elevated transition-shadow cursor-pointer">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex-shrink-0">
                  {task.completed ? (
                    <CheckCircle className="w-5 h-5 text-warm-green" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {task.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{task.project}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  25 min
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pomodoros heute
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Fokuszeit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1h 15m</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">7 Tage</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Today