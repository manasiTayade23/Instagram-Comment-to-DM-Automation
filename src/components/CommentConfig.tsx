import React, { useState } from 'react'
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Divider
} from '@mui/material'
import { Message, ArrowBack, ArrowForward } from '@mui/icons-material'

interface CommentConfigProps {
  comment: string
  onCommentChange: (comment: string) => void
  onPrevious: () => void
  onNext: () => void
  canProceed: boolean
}

const CommentConfig: React.FC<CommentConfigProps> = ({
  comment,
  onCommentChange,
  onPrevious,
  onNext,
  canProceed
}) => {
  const [triggerType, setTriggerType] = useState<'exact' | 'keyword' | 'contains'>('exact')

  const triggerTypes = [
    {
      value: 'exact',
      label: 'Exact Match',
      description: 'Triggers only when comment exactly matches',
      example: '"interested"'
    },
    {
      value: 'keyword',
      label: 'Keyword Match',
      description: 'Triggers when comment contains specific keywords',
      example: 'interested, want, need'
    },
    {
      value: 'contains',
      label: 'Contains Text',
      description: 'Triggers when comment contains the text',
      example: 'interested'
    }
  ]

  const quickTriggers = [
    'interested',
    'want more info',
    'how much',
    'details please',
    'sign me up',
    'tell me more'
  ]

  const handleQuickTrigger = (trigger: string) => {
    onCommentChange(trigger)
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Configure Comment Trigger
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Set up when your automation should activate
          </Typography>
        </Box>
        <Message sx={{ color: 'primary.main', fontSize: 32 }} />
      </Box>

      {/* Trigger Type Selection */}
      <Box sx={{ mb: 4 }}>
        <FormControl component="fieldset">
          <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Trigger Type
          </FormLabel>
          <RadioGroup
            value={triggerType}
            onChange={(e) => setTriggerType(e.target.value as 'exact' | 'keyword' | 'contains')}
          >
            {triggerTypes.map((type) => (
              <FormControlLabel
                key={type.value}
                value={type.value}
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {type.label}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                      {type.description}
                    </Typography>
                    <Chip 
                      label={type.example} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontSize: '0.75rem' }}
                    />
                  </Box>
                }
                sx={{ 
                  mb: 2,
                  p: 2,
                  border: '1px solid',
                  borderColor: triggerType === type.value ? 'primary.main' : 'divider',
                  borderRadius: 2,
                  backgroundColor: triggerType === type.value ? 'primary.light' : 'transparent',
                  '&:hover': {
                    backgroundColor: triggerType === type.value ? 'primary.light' : 'grey.50'
                  }
                }}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Comment Input */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Trigger Comment
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder={`Enter the comment that will trigger your automation...\n\nExample: ${triggerType === 'exact' ? '"interested"' : triggerType === 'keyword' ? 'interested, want, need' : 'interested'}`}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        
        {comment && (
          <Box sx={{ p: 2, backgroundColor: 'primary.light', borderRadius: 1 }}>
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
              Automation will trigger when someone comments: "{comment}"
            </Typography>
          </Box>
        )}
      </Box>

      {/* Quick Triggers */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Quick Triggers
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Click to use common trigger phrases
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {quickTriggers.map((trigger) => (
            <Chip
              key={trigger}
              label={trigger}
              onClick={() => handleQuickTrigger(trigger)}
              variant={comment === trigger ? 'filled' : 'outlined'}
              color={comment === trigger ? 'primary' : 'default'}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={onPrevious}
        >
          Previous
        </Button>
        
        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={onNext}
          disabled={!canProceed}
          sx={{
            background: 'linear-gradient(135deg, #E4405F 0%, #405DE6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #C2185B 0%, #303F9F 100%)'
            }
          }}
        >
          Next
        </Button>
      </Box>

      {!canProceed && (
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 2, display: 'block', textAlign: 'center' }}>
          Enter a trigger comment to continue
        </Typography>
      )}
    </Paper>
  )
}

export default CommentConfig 