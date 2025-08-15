import React, { useState } from 'react'
import { User, Bell, Palette, Clock, Shield, LogOut, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      dailyReminder: true,
      milestoneAlerts: true,
      weeklyReport: false
    },
    pomodoro: {
      workDuration: 25,
      shortBreak: 5,
      longBreak: 15
    },
    theme: 'system'
  })

  const handleNotificationChange = (key: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key as keyof typeof prev.notifications]
      }
    }))
  }

  const handlePomodoroChange = (key: string, value: number) => {
    setSettings(prev => ({
      ...prev,
      pomodoro: {
        ...prev.pomodoro,
        [key]: value
      }
    }))
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Einstellungen</h1>
          <p className="text-muted-foreground mt-1">
            Passe die App an deine Bedürfnisse an.
          </p>
        </div>
        <Button className="gradient-warm text-white">
          <Save className="w-4 h-4 mr-2" />
          Speichern
        </Button>
      </div>

      {/* Profile */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-warm-blue" />
            Profil
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-warm-blue to-warm-purple rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Max Mustermann</h3>
              <p className="text-muted-foreground">max.mustermann@email.com</p>
              <Badge className="mt-2 bg-warm-green/10 text-warm-green">
                Pro User
              </Badge>
            </div>
            <Button variant="outline">
              Profil bearbeiten
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pomodoro Settings */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-warm-orange" />
            Pomodoro Timer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Arbeitszeit (Minuten)
                </label>
                <input
                  type="number"
                  value={settings.pomodoro.workDuration}
                  onChange={(e) => handlePomodoroChange('workDuration', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Kurze Pause (Minuten)
                </label>
                <input
                  type="number"
                  value={settings.pomodoro.shortBreak}
                  onChange={(e) => handlePomodoroChange('shortBreak', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Lange Pause (Minuten)
                </label>
                <input
                  type="number"
                  value={settings.pomodoro.longBreak}
                  onChange={(e) => handlePomodoroChange('longBreak', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-warm-purple" />
            Darstellung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Farbschema
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['light', 'dark', 'system'].map((theme) => (
                  <Button
                    key={theme}
                    variant={settings.theme === theme ? "default" : "outline"}
                    onClick={() => setSettings(prev => ({ ...prev, theme }))}
                    className="justify-center"
                  >
                    {theme === 'light' ? 'Hell' : theme === 'dark' ? 'Dunkel' : 'System'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-warm-yellow" />
            Benachrichtigungen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { key: 'dailyReminder', label: 'Tägliche Erinnerungen', description: 'Erhalte tägliche Motivationsnachrichten' },
              { key: 'milestoneAlerts', label: 'Meilenstein Benachrichtigungen', description: 'Werde benachrichtigt wenn du Ziele erreichst' },
              { key: 'weeklyReport', label: 'Wöchentlicher Bericht', description: 'Erhalte eine Zusammenfassung deiner Woche' }
            ].map((notification) => (
              <div key={notification.key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{notification.label}</h4>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
                <button
                  onClick={() => handleNotificationChange(notification.key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications[notification.key as keyof typeof settings.notifications]
                      ? 'bg-warm-blue'
                      : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications[notification.key as keyof typeof settings.notifications]
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-warm-red" />
            Konto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Passwort ändern
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Daten exportieren
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Konto löschen
            </Button>
            <hr />
            <Button variant="outline" className="w-full justify-start text-warm-red hover:text-warm-red">
              <LogOut className="w-4 h-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings