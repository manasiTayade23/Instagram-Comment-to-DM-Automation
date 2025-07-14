import React, { useState } from 'react'
import WorkflowBuilder from './components/WorkflowBuilder'
import Header from './components/Header'
import { WorkflowData } from './types'

function App() {
  const [workflowData, setWorkflowData] = useState<WorkflowData>({
    selectedPost: null,
    comment: '',
    dmMessage: '',
    isLive: false
  })

  const handleWorkflowUpdate = (data: Partial<WorkflowData>) => {
    setWorkflowData(prev => ({ ...prev, ...data }))
  }

  const handleGoLive = () => {
    setWorkflowData(prev => ({ ...prev, isLive: true }))
    // Here you would typically make an API call to start the automation
    console.log('Going live with workflow:', workflowData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-instagram-50 to-primary-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <WorkflowBuilder 
          workflowData={workflowData}
          onWorkflowUpdate={handleWorkflowUpdate}
          onGoLive={handleGoLive}
        />
      </main>
    </div>
  )
}

export default App 