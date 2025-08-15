import React, { useState } from 'react'
import { Plus, Inbox as InboxIcon, ArrowRight, Trash2, FolderPlus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'

const Inbox: React.FC = () => {
  const [newItem, setNewItem] = useState('')

  const inboxItems = [
    {
      id: 1,
      text: 'Anmeldung für Fitnessstudio recherchieren',
      addedAt: 'vor 2 Stunden',
      category: 'Fitness'
    },
    {
      id: 2,
      text: 'Buch "Atomic Habits" kaufen',
      addedAt: 'gestern',
      category: 'Persönliche Entwicklung'
    },
    {
      id: 3,
      text: 'Duolingo Premium abonnieren',
      addedAt: 'vor 2 Tagen',
      category: 'Sprache lernen'
    },
    {
      id: 4,
      text: 'Meditation App testen',
      addedAt: 'vor 3 Tagen',
      category: 'Wellness'
    },
    {
      id: 5,
      text: 'Zeitmanagement Kurs online finden',
      addedAt: 'vor 1 Woche',
      category: 'Produktivität'
    }
  ]

  const projects = [
    'Fitness Ziel',
    'Sprache lernen',
    'Persönliche Entwicklung',
    'Karriere Entwicklung',
    'Programmieren lernen'
  ]

  const handleAddItem = () => {
    if (newItem.trim()) {
      // In einer echten App würde hier die Datenbank aktualisiert
      console.log('Neues Item hinzugefügt:', newItem)
      setNewItem('')
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inbox</h1>
          <p className="text-muted-foreground mt-1">
            Sammle Ideen und organisiere sie später in deine Projekte.
          </p>
        </div>
      </div>

      {/* Quick Add */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-warm-blue" />
            Schnell hinzufügen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Was beschäftigt dich? Schreib es hier auf..."
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
              className="flex-1 px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button onClick={handleAddItem} className="gradient-warm text-white">
              Hinzufügen
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Inbox Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{inboxItems.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Diese Woche hinzugefügt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">3</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Zu Projekten zugeordnet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">8</div>
          </CardContent>
        </Card>
      </div>

      {/* Inbox Items */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Unbearbeitete Items</h2>
        {inboxItems.length > 0 ? (
          <div className="space-y-3">
            {inboxItems.map((item, index) => (
              <Card key={item.id} className="shadow-card hover:shadow-elevated transition-shadow group">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{item.text}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {item.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{item.addedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative">
                      <Button size="sm" variant="outline" className="peer">
                        <FolderPlus className="w-4 h-4 mr-1" />
                        Zu Projekt
                      </Button>
                      {/* Dropdown würde hier implementiert werden */}
                    </div>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center h-48 text-center">
              <InboxIcon className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-foreground mb-2">Inbox ist leer</h3>
              <p className="text-sm text-muted-foreground">
                Großartig! Du hast alle deine Ideen organisiert.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Schnellaktionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Alle zu Projekt zuordnen</div>
                <div className="text-sm text-muted-foreground">Items automatisch kategorisieren</div>
              </div>
            </Button>
            <Button variant="outline" className="justify-start h-auto p-4">
              <div className="text-left">
                <div className="font-medium">Inbox aufräumen</div>
                <div className="text-sm text-muted-foreground">Alte Items archivieren</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Inbox