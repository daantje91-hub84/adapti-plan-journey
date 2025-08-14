export interface Project {
  id: string
  title: string
  description: string
  deadline?: Date
  progress: number
  color: 'warm-blue' | 'warm-violet' | 'warm-green' | 'warm-orange'
  milestones: Milestone[]
  createdAt: Date
  updatedAt: Date
}

export interface Milestone {
  id: string
  projectId: string
  title: string
  description: string
  weight: number
  isCompleted: boolean
  tasks: Task[]
  dueDate?: Date
  createdAt: Date
}

export interface Task {
  id: string
  milestoneId: string
  title: string
  isCompleted: boolean
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
  completedAt?: Date
}

export interface ProjectFormData {
  title: string
  description: string
  deadline?: Date
  color: Project['color']
  milestones: Omit<Milestone, 'id' | 'projectId' | 'createdAt' | 'tasks'>[]
}