import React, { useState } from 'react'
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  Avatar,
  Checkbox,
  FormControlLabel,
  Divider
} from '@mui/material'
import { Send, ArrowBack, AutoAwesome } from '@mui/icons-material'

interface DMConfigProps {
  dmMessage: string
  onMessageChange: (message: string) => void
  onPrevious: () => void
  onGoLive: () => void
  canGoLive: boolean
}

const DMConfig: React.FC<DMConfigProps> = ({
  dmMessage,
  onMessageChange,
  onPrevious,
  onGoLive,
  canGoLive
}) => {
  const [includeEmoji, setIncludeEmoji] = useState(true)

  const messageTemplates = [
    {
      title: 'Friendly Welcome',
      message: 'Hey! Thanks for your comment! 😊 I\'d love to help you out. What can I assist you with?',
      emoji: '👋'
    },
    {
      title: 'Product Inquiry',
      message: 'Hi there! Thanks for showing interest! 🎉 I\'d be happy to share more details about our products. What specific information are you looking for?',
      emoji: '💡'
    },
    {
      title: 'Quick Response',
      message: 'Thanks for reaching out! ⚡ I\'ll get back to you with all the details you need.',
      emoji: '⚡'
    },
    {
      title: 'Personal Touch',
      message: 'Hey! I noticed your comment and wanted to personally reach out. How can I help you today?',
      emoji: '💬'
    }
  ]

  const handleTemplateSelect = (template: typeof messageTemplates[0]) => {
    onMessageChange(template.message)
  }

  const addPersonalization = (type: string) => {
    const personalizations = {
      name: '{{user_name}}',
      username: '{{username}}',
      comment: '{{comment}}',
      post: '{{post_title}}'
    }
    
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement
    if (textarea) {
      const cursorPos = textarea.selectionStart || 0
      const newMessage = dmMessage.slice(0, cursorPos) + personalizations[type as keyof typeof personalizations] + dmMessage.slice(cursorPos)
      onMessageChange(newMessage)
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Set DM Message
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Create the message that will be sent automatically
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
          <Send sx={{ color: 'white' }} />
        </Avatar>
      </Box>

      {/* Message Templates */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Quick Templates
        </Typography>
        <Grid container spacing={2}>
          {messageTemplates.map((template, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    borderColor: 'primary.main',
                    backgroundColor: 'primary.light'
                  }
                }}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ mr: 1 }}>{template.emoji}</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      {template.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ 
                    color: 'text.secondary',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {template.message}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Message Input */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Your Message
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={dmMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Write your DM message here... (You can use personalization tags below)"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        
        {/* Personalization Tags */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
            Personalization Tags
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label="👤 {{user_name}}"
              size="small"
              onClick={() => addPersonalization('name')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="@{{username}}"
              size="small"
              onClick={() => addPersonalization('username')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label='"{{comment}}"'
              size="small"
              onClick={() => addPersonalization('comment')}
              sx={{ cursor: 'pointer' }}
            />
            <Chip
              label="{{post_title}}"
              size="small"
              onClick={() => addPersonalization('post')}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        </Box>
      </Box>

      {/* Settings */}
      <Box sx={{ mb: 4 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={includeEmoji}
              onChange={(e) => setIncludeEmoji(e.target.checked)}
              color="primary"
            />
          }
          label="Include friendly emojis in messages"
        />
      </Box>

      {/* Preview */}
      {dmMessage && (
        <Box sx={{ mb: 4, p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Message Preview
          </Typography>
          <Card sx={{ maxWidth: 400 }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 1 }}>
                  <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
                    You
                  </Typography>
                </Avatar>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Immediate response
                </Typography>
              </Box>
              <Box sx={{ 
                backgroundColor: 'primary.light', 
                p: 2, 
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'primary.main'
              }}>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {dmMessage}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Navigation and Go Live */}
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
          startIcon={<AutoAwesome />}
          onClick={onGoLive}
          disabled={!canGoLive}
          sx={{
            background: 'linear-gradient(135deg, #E4405F 0%, #405DE6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #C2185B 0%, #303F9F 100%)'
            },
            '&:disabled': {
              background: 'grey.300'
            }
          }}
        >
          Go Live
        </Button>
      </Box>

      {!canGoLive && (
        <Typography variant="caption" sx={{ color: 'text.secondary', mt: 2, display: 'block', textAlign: 'center' }}>
          Complete all steps to activate your automation
        </Typography>
      )}
    </Paper>
  )
}

export default DMConfig 