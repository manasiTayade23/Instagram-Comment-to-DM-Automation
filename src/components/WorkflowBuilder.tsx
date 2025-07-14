import React, { useState } from 'react'
import PostSelector from './PostSelector'
import CommentConfig from './CommentConfig'
import DMConfig from './DMConfig'
import WorkflowPreview from './WorkflowPreview'
import { WorkflowData, WorkflowStep } from '../types'

interface WorkflowBuilderProps {
  workflowData: WorkflowData
  onWorkflowUpdate: (data: Partial<WorkflowData>) => void
  onGoLive: () => void
}

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({
  workflowData,
  onWorkflowUpdate,
  onGoLive
}) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps: WorkflowStep[] = [
    {
      id: 'post',
      title: 'Select Post/Reel',
      description: 'Choose the Instagram post or reel to monitor',
      isCompleted: !!workflowData.selectedPost,
      isActive: currentStep === 0
    },
    {
      id: 'comment',
      title: 'Configure Comment',
      description: 'Set up the comment or keyword to trigger the automation',
      isCompleted: !!workflowData.comment,
      isActive: currentStep === 1
    },
    {
      id: 'dm',
      title: 'Set DM Message',
      description: 'Create the message to send via DM',
      isCompleted: !!workflowData.dmMessage,
      isActive: currentStep === 2
    }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canGoLive = workflowData.selectedPost && workflowData.comment && workflowData.dmMessage

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium
                  ${step.isCompleted 
                    ? 'bg-green-500 text-white' 
                    : step.isActive 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  {step.isCompleted ? '✓' : index + 1}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  w-16 h-0.5 mx-4
                  ${step.isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Configuration */}
        <div className="space-y-6">
          {currentStep === 0 && (
            <PostSelector
              selectedPost={workflowData.selectedPost}
              onPostSelect={(post) => {
                onWorkflowUpdate({ selectedPost: post })
                handleNext()
              }}
            />
          )}

          {currentStep === 1 && (
            <CommentConfig
              comment={workflowData.comment}
              onCommentChange={(comment) => onWorkflowUpdate({ comment })}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          )}

          {currentStep === 2 && (
            <DMConfig
              dmMessage={workflowData.dmMessage}
              onMessageChange={(dmMessage) => onWorkflowUpdate({ dmMessage })}
              onPrevious={handlePrevious}
              onGoLive={onGoLive}
              canGoLive={canGoLive}
            />
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="lg:sticky lg:top-8">
          <WorkflowPreview workflowData={workflowData} />
        </div>
      </div>
    </div>
  )
}

export default WorkflowBuilder 