import React from 'react'
import { Box, Paper, Stepper, Step, StepLabel, StepContent, Button, Typography } from '@mui/material'
import { CheckCircle, Instagram, Message, Send } from '@mui/icons-material'
import PostSelector from './PostSelector'
import CommentConfig from './CommentConfig'
import DMConfig from './DMConfig'
import WorkflowPreview from './WorkflowPreview'
import { WorkflowData } from '../types'

interface WorkflowBuilderProps {
  currentStep: number
  workflowData: WorkflowData
  setWorkflowData: (data: WorkflowData) => void
  onNext: () => void
  onPrevious: () => void
  onGoLive: () => void
}

const WorkflowBuilder: React.FC<WorkflowBuilderProps> = ({
  currentStep,
  workflowData,
  setWorkflowData,
  onNext,
  onPrevious,
  onGoLive
}) => {
  const steps = [
    {
      label: 'Select Post/Reel',
      description: 'Choose Instagram content to monitor for comments',
      icon: <Instagram />
    },
    {
      label: 'Configure Comment Trigger',
      description: 'Set up when comments should trigger DM automation',
      icon: <Message />
    },
    {
      label: 'Set DM Response',
      description: 'Create the DM message to send automatically',
      icon: <Send />
    }
  ]

  const handleWorkflowUpdate = (updates: Partial<WorkflowData>) => {
    setWorkflowData({ ...workflowData, ...updates })
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!workflowData.selectedPost
      case 1:
        return !!workflowData.comment
      case 2:
        return !!workflowData.dmMessage
      default:
        return false
    }
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <PostSelector
            selectedPost={workflowData.selectedPost}
            onPostSelect={(post) => handleWorkflowUpdate({ selectedPost: post })}
            onNext={onNext}
            canProceed={canProceed()}
          />
        )
      case 1:
        return (
          <CommentConfig
            comment={workflowData.comment}
            triggerType={workflowData.triggerType}
            onCommentChange={(comment) => handleWorkflowUpdate({ comment })}
            onTriggerTypeChange={(triggerType) => handleWorkflowUpdate({ triggerType })}
            onPrevious={onPrevious}
            onNext={onNext}
            canProceed={canProceed()}
          />
        )
      case 2:
        return (
          <DMConfig
            dmMessage={workflowData.dmMessage}
            onMessageChange={(dmMessage) => handleWorkflowUpdate({ dmMessage })}
            onPrevious={onPrevious}
            onGoLive={onGoLive}
            canGoLive={canProceed()}
          />
        )
      default:
        return null
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'flex-start', gap: 4 }}>
      {/* Main Workflow Area */}
      <Box sx={{ flex: 1, minWidth: 340, maxWidth: 480 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600, color: 'text.primary', textAlign: 'left' }}>
            Build Your Automation
          </Typography>
          <Stepper activeStep={currentStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={({ active, completed }) => (
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      backgroundColor: completed ? 'success.main' : active ? 'primary.main' : 'grey.300',
                      color: completed || active ? 'white' : 'grey.600'
                    }}>
                      {completed ? <CheckCircle /> : step.icon}
                    </Box>
                  )}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {step.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {step.description}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Box sx={{ mt: 2 }}>
                    {renderStepContent(index)}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>

      {/* Preview Panel */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', width: '100%' }}>
        <WorkflowPreview workflowData={workflowData} />
      </Box>
    </Box>
  )
}

export default WorkflowBuilder 