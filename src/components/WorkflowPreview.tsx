import React, { useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Chip,
  Tabs,
  Tab
} from '@mui/material'
import {
  Instagram,
  PlayArrow,
  Favorite,
  ChatBubbleOutline
} from '@mui/icons-material'
import { WorkflowData } from '../types'

interface WorkflowPreviewProps {
  workflowData: WorkflowData
}

const TABS = [
  { label: 'Post' },
  { label: 'Comments' },
  { label: 'DM' }
]

const WorkflowPreview: React.FC<WorkflowPreviewProps> = ({ workflowData }) => {
  const { selectedPost, comment, dmMessage } = workflowData
  const [tab, setTab] = useState(0)
  const [testComment, setTestComment] = useState('')
  const [simulatedComments, setSimulatedComments] = useState<Array<{ id: string, text: string, username: string, timestamp: string }>>([])

  const shouldTriggerAutomation = (commentText: string) => {
    if (!comment || !dmMessage) return false
    const commentLower = commentText.toLowerCase()
    const triggerLower = comment.toLowerCase()
    switch (workflowData.triggerType) {
      case 'exact':
        return commentLower === triggerLower
      case 'keyword':
        const keywords = triggerLower.split(',').map(k => k.trim())
        return keywords.some(keyword => commentLower.includes(keyword))
      case 'contains':
        return commentLower.includes(triggerLower)
      default:
        return commentLower.includes(triggerLower)
    }
  }

  const addTestComment = () => {
    if (testComment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        text: testComment,
        username: 'test_user_' + Math.floor(Math.random() * 1000),
        timestamp: 'Now'
      }
      setSimulatedComments(prev => [newComment, ...prev])
      setTestComment('')
    }
  }

  // Phone mockup style
  return (
    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'none', boxShadow: 'none' }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
        Preview
      </Typography>
      <Box
        sx={{
          width: 320,
          height: 600,
          borderRadius: 4,
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          background: '#111',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Main content area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Post Tab */}
          {tab === 0 && selectedPost && (
            <Box sx={{ background: '#222', p: 2, height: '100%', overflowY: 'auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                  {selectedPost.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  @{selectedPost.username}
                </Typography>
                <Box sx={{ flex: 1 }} />
                <Instagram sx={{ color: '#E4405F', fontSize: 20 }} />
              </Box>
              <Box sx={{ position: 'relative', mb: 1 }}>
                {selectedPost.type === 'reel' ? (
                  <Box sx={{ position: 'relative', height: 180, borderRadius: 2, overflow: 'hidden' }}>
                    <iframe
                      src="https://www.youtube.com/embed/JoyKXJdWKOE?controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=JoyKXJdWKOE&mute=1&autoplay=0"
                      title="Instagram Automation Demo"
                      style={{ width: '100%', height: '100%', border: 'none' }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <Chip
                      label="REELS"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    component="img"
                    src={selectedPost.imageUrl}
                    alt={selectedPost.caption}
                    sx={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 2 }}
                  />
                )}
              </Box>
              <Typography variant="body2" sx={{ color: 'grey.200', mb: 1 }}>
                {selectedPost.caption}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Favorite sx={{ fontSize: 16, color: 'grey.400' }} />
                  <Typography variant="caption" sx={{ color: 'grey.400' }}>{selectedPost.likes}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ChatBubbleOutline sx={{ fontSize: 16, color: 'grey.400' }} />
                  <Typography variant="caption" sx={{ color: 'grey.400' }}>{selectedPost.comments}</Typography>
                </Box>
              </Box>
            </Box>
          )}

          {/* Comments Tab */}
          {tab === 1 && (
            <Box sx={{ flex: 1, background: '#181818', p: 2, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
              {selectedPost && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 28, height: 28, mr: 1, fontSize: '0.9rem', bgcolor: '#333', color: 'white' }}>
                    {selectedPost.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" sx={{ color: 'grey.300', fontWeight: 600 }}>
                    @{selectedPost.username}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'grey.500', ml: 1 }}>
                    {selectedPost.timestamp}
                  </Typography>
                </Box>
              )}
              {simulatedComments.length === 0 && (
                <Typography variant="body2" sx={{ color: 'grey.500', textAlign: 'center', mt: 8 }}>
                  Add a comment below to test your automation!
                </Typography>
              )}
              {simulatedComments.map((commentItem) => (
                <Box key={commentItem.id} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.8rem', bgcolor: '#405DE6', color: 'white' }}>
                    {commentItem.username.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="caption" sx={{ color: 'grey.300', fontWeight: 600 }}>
                      {commentItem.username} <span style={{ color: '#888', fontWeight: 400 }}>• {commentItem.timestamp}</span>
                    </Typography>
                    <br />
                    <Box sx={{ background: '#405DE6', color: 'white', borderRadius: 2, px: 2, py: 1, mt: 0.5, fontSize: 15, fontWeight: 500, textAlign: 'left', display: 'inline-block' }}>
                      {commentItem.text}
                    </Box>
                  </Box>
                </Box>
              ))}
              {/* Comment input at the bottom of Comments tab */}
              <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
                <TextField
                  fullWidth
                  size="small"
                  value={testComment}
                  onChange={e => setTestComment(e.target.value)}
                  placeholder="Add a comment to test..."
                  variant="outlined"
                  sx={{
                    background: '#181818',
                    borderRadius: 2,
                    input: { color: 'white' },
                    mr: 1
                  }}
                  InputProps={{
                    style: { color: 'white' }
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') addTestComment()
                  }}
                />
                <Button
                  variant="contained"
                  onClick={addTestComment}
                  disabled={!testComment.trim()}
                  sx={{
                    background: 'linear-gradient(135deg, #E4405F 0%, #405DE6 100%)',
                    minWidth: 0,
                    px: 2
                  }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          )}

          {/* DM Tab */}
          {tab === 2 && (
            <Box sx={{ flex: 1, background: '#181818', p: 2, display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
              {simulatedComments.length === 0 && (
                <Typography variant="body2" sx={{ color: 'grey.500', textAlign: 'center', mt: 8 }}>
                  No DM conversation yet. Add a comment in the Comments tab to trigger a DM!
                </Typography>
              )}
              {simulatedComments.map((commentItem) => (
                <React.Fragment key={commentItem.id}>
                  {/* User message as DM */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', mb: 1 }}>
                    <Box sx={{ maxWidth: '75%' }}>
                      <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, textAlign: 'left', display: 'block', mb: 0.5 }}>
                        User
                      </Typography>
                      <Box sx={{ background: '#405DE6', color: 'white', borderRadius: 2, px: 2, py: 1, fontSize: 15, fontWeight: 500, textAlign: 'left' }}>
                        {commentItem.text}
                      </Box>
                    </Box>
                  </Box>
                  {/* Automated DM response */}
                  {shouldTriggerAutomation(commentItem.text) && (
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', mb: 2 }}>
                      <Box sx={{ maxWidth: '75%' }}>
                        <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, textAlign: 'right', display: 'block', mb: 0.5 }}>
                          Automated DM
                        </Typography>
                        <Box sx={{ background: '#E4405F', color: 'white', borderRadius: 2, px: 2, py: 1, fontSize: 15, fontWeight: 500, textAlign: 'right' }}>
                          {dmMessage}
                        </Box>
                      </Box>
                    </Box>
                  )}
                </React.Fragment>
              ))}
            </Box>
          )}
        </Box>
        {/* Tab bar at the bottom */}
        <Box sx={{ background: '#181818', borderTop: '1px solid #222', p: 0, height: 48 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            TabIndicatorProps={{ style: { background: 'linear-gradient(90deg, #E4405F 0%, #405DE6 100%)', height: 3 } }}
            sx={{
              minHeight: 48,
              '& .MuiTab-root': {
                color: 'grey.400',
                fontWeight: 600,
                fontSize: 15,
                minHeight: 48,
                textTransform: 'none',
                letterSpacing: 0.2,
                '&.Mui-selected': {
                  color: 'white',
                }
              }
            }}
          >
            {TABS.map((t, i) => (
              <Tab key={t.label} label={t.label} />
            ))}
          </Tabs>
        </Box>
      </Box>
    </Paper>
  )
}

export default WorkflowPreview 