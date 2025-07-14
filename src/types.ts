export interface InstagramPost {
  id: string
  type: 'post' | 'reel'
  imageUrl: string
  caption: string
  username: string
  likes: number
  comments: number
  timestamp: string
}

export interface WorkflowData {
  selectedPost: InstagramPost | null
  comment: string
  triggerType: 'exact' | 'keyword' | 'contains'
  dmMessage: string
  isLive: boolean
}

export interface WorkflowStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
} 