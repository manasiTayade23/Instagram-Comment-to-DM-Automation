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
      description: 'Choose Instagram content to monitor',
      icon: <Instagram />
    },
    {
      label: 'Configure Trigger',
      description: 'Set up comment conditions',
      icon: <Message />
    },
    {
      label: 'Set DM Message',
      description: 'Create automated response',
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
          />
        )
      case 1:
        return (
          <CommentConfig
            comment={workflowData.comment}
            onCommentChange={(comment) => handleWorkflowUpdate({ comment })}
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
    <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
      {/* Main Workflow Area */}
      <Box sx={{ flex: 1 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
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
      <Box sx={{ width: { xs: '100%', lg: 400 } }}>
        <WorkflowPreview workflowData={workflowData} />
      </Box>
    </Box>
  )
}

export default WorkflowBuilder 