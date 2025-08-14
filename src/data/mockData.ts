import { Project } from '../types'

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Fitness & Gesundheit',
    description: 'Mein Ziel ist es, bis Ende des Jahres 10kg abzunehmen und regelmäßig Sport zu treiben.',
    deadline: new Date('2024-12-31'),
    progress: 45,
    color: 'warm-green',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-08-10'),
    milestones: [
      {
        id: 'm1',
        projectId: '1',
        title: 'Ernährungsumstellung',
        description: 'Gesunde Ernährung etablieren und Kalorienzählung beginnen',
        weight: 30,
        isCompleted: true,
        dueDate: new Date('2024-03-01'),
        createdAt: new Date('2024-01-15'),
        tasks: [
          {
            id: 't1',
            milestoneId: 'm1',
            title: 'Meal Prep Plan erstellen',
            isCompleted: true,
            priority: 'high',
            createdAt: new Date('2024-01-16'),
            completedAt: new Date('2024-02-10')
          },
          {
            id: 't2',
            milestoneId: 'm1',
            title: 'Kalorientracker App installieren',
            isCompleted: true,
            priority: 'medium',
            createdAt: new Date('2024-01-16'),
            completedAt: new Date('2024-01-20')
          }
        ]
      },
      {
        id: 'm2',
        projectId: '1',
        title: 'Trainingsroutine aufbauen',
        description: '3x pro Woche Krafttraining und 2x Cardio',
        weight: 40,
        isCompleted: false,
        dueDate: new Date('2024-06-01'),
        createdAt: new Date('2024-01-15'),
        tasks: [
          {
            id: 't3',
            milestoneId: 'm2',
            title: 'Fitnessstudio anmelden',
            isCompleted: true,
            priority: 'high',
            createdAt: new Date('2024-02-01'),
            completedAt: new Date('2024-02-15')
          },
          {
            id: 't4',
            milestoneId: 'm2',
            title: 'Trainingsplan erstellen',
            isCompleted: false,
            priority: 'high',
            createdAt: new Date('2024-02-16')
          }
        ]
      },
      {
        id: 'm3',
        projectId: '1',
        title: '10kg Gewichtsverlust erreichen',
        description: 'Zielgewicht von 75kg erreichen',
        weight: 30,
        isCompleted: false,
        dueDate: new Date('2024-12-31'),
        createdAt: new Date('2024-01-15'),
        tasks: []
      }
    ]
  },
  {
    id: '2',
    title: 'Karriere Entwicklung',
    description: 'Eine Beförderung zum Senior Developer erreichen und neue Technologien lernen.',
    deadline: new Date('2024-12-01'),
    progress: 70,
    color: 'warm-blue',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-08-12'),
    milestones: [
      {
        id: 'm4',
        projectId: '2',
        title: 'React & TypeScript Expertise',
        description: 'Fortgeschrittene Kenntnisse in React und TypeScript entwickeln',
        weight: 40,
        isCompleted: true,
        dueDate: new Date('2024-06-01'),
        createdAt: new Date('2024-02-01'),
        tasks: [
          {
            id: 't5',
            milestoneId: 'm4',
            title: 'TypeScript Kurs abschließen',
            isCompleted: true,
            priority: 'high',
            createdAt: new Date('2024-02-05'),
            completedAt: new Date('2024-04-20')
          }
        ]
      },
      {
        id: 'm5',
        projectId: '2',
        title: 'Portfolio Projekt',
        description: 'Ein beeindruckendes Full-Stack Projekt entwickeln',
        weight: 35,
        isCompleted: true,
        dueDate: new Date('2024-08-01'),
        createdAt: new Date('2024-02-01'),
        tasks: []
      },
      {
        id: 'm6',
        projectId: '2',
        title: 'Beförderungsgespräch',
        description: 'Erfolgreiche Beförderung zum Senior Developer',
        weight: 25,
        isCompleted: false,
        dueDate: new Date('2024-11-15'),
        createdAt: new Date('2024-02-01'),
        tasks: []
      }
    ]
  },
  {
    id: '3',
    title: 'Spanisch lernen',
    description: 'Fließend Spanisch sprechen können für den geplanten Spanien-Umzug.',
    deadline: new Date('2025-06-01'),
    progress: 25,
    color: 'warm-orange',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-08-05'),
    milestones: [
      {
        id: 'm7',
        projectId: '3',
        title: 'Grundlagen (A1-A2)',
        description: 'Basis-Spanischkenntnisse aufbauen',
        weight: 30,
        isCompleted: true,
        dueDate: new Date('2024-08-01'),
        createdAt: new Date('2024-03-01'),
        tasks: []
      },
      {
        id: 'm8',
        projectId: '3',
        title: 'Mittelstufe (B1-B2)',
        description: 'Konversationsfähigkeiten entwickeln',
        weight: 40,
        isCompleted: false,
        dueDate: new Date('2024-12-01'),
        createdAt: new Date('2024-03-01'),
        tasks: []
      },
      {
        id: 'm9',
        projectId: '3',
        title: 'Fortgeschritten (C1)',
        description: 'Fließend sprechen und verstehen',
        weight: 30,
        isCompleted: false,
        dueDate: new Date('2025-05-01'),
        createdAt: new Date('2024-03-01'),
        tasks: []
      }
    ]
  },
  {
    id: '4',
    title: 'Eigene Wohnung',
    description: 'Eine schöne 2-Zimmer Wohnung in Berlin finden und einrichten.',
    progress: 80,
    color: 'warm-violet',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-08-14'),
    milestones: [
      {
        id: 'm10',
        projectId: '4',
        title: 'Wohnung finden',
        description: 'Passende Wohnung in gewünschter Lage finden',
        weight: 50,
        isCompleted: true,
        dueDate: new Date('2024-07-01'),
        createdAt: new Date('2024-01-01'),
        tasks: []
      },
      {
        id: 'm11',
        projectId: '4',
        title: 'Umzug organisieren',
        description: 'Umzugsunternehmen buchen und Umzug durchführen',
        weight: 30,
        isCompleted: true,
        dueDate: new Date('2024-08-15'),
        createdAt: new Date('2024-01-01'),
        tasks: []
      },
      {
        id: 'm12',
        projectId: '4',
        title: 'Einrichtung komplettieren',
        description: 'Möbel kaufen und Wohnung gemütlich einrichten',
        weight: 20,
        isCompleted: false,
        dueDate: new Date('2024-10-01'),
        createdAt: new Date('2024-01-01'),
        tasks: []
      }
    ]
  }
]