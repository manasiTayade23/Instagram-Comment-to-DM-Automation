import React, { useState } from 'react'
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent, 
  Avatar, 
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import { 
  Instagram, 
  Message, 
  Send, 
  PlayArrow, 
  CheckCircle, 
  Close,
  Favorite,
  ChatBubbleOutline,
  Share,
  Science
} from '@mui/icons-material'
import { WorkflowData } from '../types'

interface WorkflowPreviewProps {
  workflowData: WorkflowData
}

const WorkflowPreview: React.FC<WorkflowPreviewProps> = ({ workflowData }) => {
  const { selectedPost, comment, dmMessage, isLive } = workflowData
  const [testComment, setTestComment] = useState('')
  const [simulatedComments, setSimulatedComments] = useState<Array<{id: string, text: string, username: string, timestamp: string}>>([])
  const [expandedVideo, setExpandedVideo] = useState(false)

  const canGoLive = selectedPost && comment && dmMessage

  const getStepStatus = (step: number) => {
    if (step === 0) return selectedPost ? 'completed' : 'pending'
    if (step === 1) return comment ? 'completed' : 'pending'
    if (step === 2) return dmMessage ? 'completed' : 'pending'
    return 'pending'
  }

  const getStepIcon = (step: number) => {
    const status = getStepStatus(step)
    if (status === 'completed') return <CheckCircle sx={{ color: 'success.main' }} />
    
    switch (step) {
      case 0: return <Instagram sx={{ color: 'grey.400' }} />
      case 1: return <Message sx={{ color: 'grey.400' }} />
      case 2: return <Send sx={{ color: 'grey.400' }} />
      default: return null
    }
  }

  const addTestComment = () => {
    if (testComment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: testComment,
        username: 'test_user_' + Math.floor(Math.random() * 1000),
        timestamp: 'Just now'
      }
      setSimulatedComments(prev => [newComment, ...prev])
      setTestComment('')
    }
  }

  const shouldTriggerAutomation = (commentText: string) => {
    if (!comment) return false
    return commentText.toLowerCase().includes(comment.toLowerCase())
  }

  const handleVideoClick = () => {
    setExpandedVideo(true)
  }

  const closeExpandedVideo = () => {
    setExpandedVideo(false)
  }

  return (
    <Paper sx={{ p: 3, height: 'fit-content' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Workflow Preview
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            See how your automation will work
          </Typography>
        </Box>
        <Chip
          icon={isLive ? <CheckCircle /> : <Instagram />}
          label={isLive ? 'Live' : 'Preview'}
          color={isLive ? 'success' : 'default'}
          variant={isLive ? 'filled' : 'outlined'}
        />
      </Box>

      {/* Instagram Post Preview */}
      {selectedPost && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Selected Content
          </Typography>
          
          {expandedVideo && selectedPost.id === '5' ? (
            // Expanded video view
            <Card sx={{ overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Instagram Reel Preview
                </Typography>
                <Button
                  size="small"
                  onClick={closeExpandedVideo}
                  startIcon={<Close />}
                >
                  Close
                </Button>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <iframe
                  src="https://www.youtube.com/embed/Ux2zKPR6RD0?controls=1&modestbranding=1&rel=0&showinfo=1&autoplay=1&mute=0"
                  title="Instagram Automation Demo"
                  style={{ width: '100%', height: 320, border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>@automation_master</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>Just now</Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  🚀 NEW: Instagram Automation Tool! Automate your comment responses and grow your business! 💼✨
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  🔥 Comment "interested" below to get early access!
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  #automation #instagram #business #growth #marketing
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Favorite sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>5,421</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ChatBubbleOutline sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>423</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Share sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Share</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ) : (
            // Regular preview
            <Card sx={{ maxWidth: 400 }}>
              <Box sx={{ position: 'relative' }}>
                {selectedPost.id === '5' ? (
                  // Video reel preview with clickable overlay
                  <Box sx={{ position: 'relative', height: 200 }}>
                    <iframe
                      src="https://www.youtube.com/embed/Ux2zKPR6RD0?controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=Ux2zKPR6RD0&mute=1&autoplay=0"
                      title="Instagram Automation Demo"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {/* Clickable play button overlay */}
                    <Box 
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'rgba(0,0,0,0.4)'
                        }
                      }}
                      onClick={handleVideoClick}
                    >
                      <Avatar sx={{ 
                        width: 64, 
                        height: 64, 
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: 'grey.100'
                        }
                      }}>
                        <PlayArrow sx={{ color: 'primary.main', ml: 0.5, fontSize: 32 }} />
                      </Avatar>
                    </Box>
                    {/* Video duration indicator */}
                    <Chip
                      label="0:30"
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 12,
                        right: 12,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        color: 'white'
                      }}
                    />
                    {/* Reel indicator */}
                    <Chip
                      label="REELS"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white'
                      }}
                    />
                  </Box>
                ) : (
                  // Regular image preview
                  <Box
                    component="img"
                    src={selectedPost.imageUrl}
                    alt={selectedPost.caption}
                    sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                  />
                )}
                {selectedPost.type === 'reel' && selectedPost.id !== '5' && (
                  <Box sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    borderRadius: '50%',
                    p: 0.5
                  }}>
                    <PlayArrow sx={{ color: 'white', fontSize: 16 }} />
                  </Box>
                )}
              </Box>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    @{selectedPost.username}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {selectedPost.timestamp}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                  {selectedPost.caption}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Favorite sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {selectedPost.likes.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ChatBubbleOutline sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {selectedPost.comments}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      )}

      {/* Interactive Comment Test Section */}
      {selectedPost && comment && dmMessage && (
        <Box sx={{ mb: 3, p: 3, background: 'linear-gradient(135deg, #E4405F10 0%, #405DE610 100%)', borderRadius: 2, border: '1px solid', borderColor: 'primary.main' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Science sx={{ color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Test Your Automation
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
              Add a test comment:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                value={testComment}
                onChange={(e) => setTestComment(e.target.value)}
                placeholder={`Try commenting "${comment}" to trigger automation`}
                variant="outlined"
              />
              <Button
                variant="contained"
                onClick={addTestComment}
                disabled={!testComment.trim()}
                sx={{ minWidth: 'auto' }}
              >
                Comment
              </Button>
            </Box>
          </Box>

          {/* Simulated Comments */}
          {simulatedComments.length > 0 && (
            <Box>
              <Typography variant="body2" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
                Recent Comments:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {simulatedComments.map((commentItem) => (
                  <Box key={commentItem.id}>
                    {/* User Comment */}
                    <Card sx={{ mb: 1 }}>
                      <CardContent sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
                            {commentItem.username.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                            {commentItem.username} commented:
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                          "{commentItem.text}"
                        </Typography>
                      </CardContent>
                    </Card>
                    
                    {/* Immediate Automation Response */}
                    {shouldTriggerAutomation(commentItem.text) && (
                      <Card sx={{ ml: 2, backgroundColor: 'success.light' }}>
                        <CardContent sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar sx={{ bgcolor: 'primary.main', width: 20, height: 20, mr: 1, fontSize: '0.625rem' }}>
                              You
                            </Avatar>
                            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                              DM sent immediately:
                            </Typography>
                          </Box>
                          <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="body2" sx={{ color: 'text.primary' }}>
                              {dmMessage}
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {/* Workflow Steps */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
          Automation Flow
        </Typography>
        
        <List sx={{ p: 0 }}>
          {/* Step 1: Monitor Post */}
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              {getStepIcon(0)}
            </ListItemIcon>
            <ListItemText
              primary="Monitor Post"
              secondary={selectedPost 
                ? `Watching for comments on "${selectedPost.caption.substring(0, 50)}..."`
                : 'Select a post to monitor'
              }
            />
          </ListItem>

          {/* Step 2: Comment Trigger */}
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              {getStepIcon(1)}
            </ListItemIcon>
            <ListItemText
              primary="Comment Trigger"
              secondary={comment 
                ? `Triggers when someone comments: "${comment}"`
                : 'Set up comment trigger'
              }
            />
          </ListItem>

          {/* Step 3: Send DM */}
          <ListItem sx={{ px: 0 }}>
            <ListItemIcon>
              {getStepIcon(2)}
            </ListItemIcon>
            <ListItemText
              primary="Send DM"
              secondary={dmMessage 
                ? `Sends message: "${dmMessage.substring(0, 50)}..."`
                : 'Configure DM message'
              }
            />
          </ListItem>
        </List>
      </Box>

      {/* Status */}
      <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Workflow Status
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {isLive ? 'Automation is active and running' : 'Ready to activate'}
            </Typography>
          </Box>
          <Chip
            label={isLive ? 'Active' : canGoLive ? 'Ready' : 'Incomplete'}
            color={isLive ? 'success' : canGoLive ? 'primary' : 'default'}
            variant={isLive ? 'filled' : 'outlined'}
          />
        </Box>
      </Box>

      {/* Completion Status */}
      {!canGoLive && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: 'warning.light', borderRadius: 2 }}>
          <Typography variant="body2" sx={{ color: 'warning.dark', fontWeight: 600 }}>
            Complete all steps to activate your automation
          </Typography>
        </Box>
      )}
    </Paper>
  )
}

export default WorkflowPreview 