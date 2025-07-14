import React, { useState } from 'react'
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Chip, 
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'
import { 
  Instagram, 
  PlayArrow, 
  Image, 
  Search, 
  FilterList, 
  Close,
  Favorite,
  ChatBubbleOutline,
  Share
} from '@mui/icons-material'
import { InstagramPost } from '../types'

interface PostSelectorProps {
  selectedPost: InstagramPost | null
  onPostSelect: (post: InstagramPost) => void
  onNext: () => void
  canProceed: boolean
}

const PostSelector: React.FC<PostSelectorProps> = ({ selectedPost, onPostSelect, onNext, canProceed }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'post' | 'reel'>('all')
  const [expandedVideo, setExpandedVideo] = useState(false)

  // Mock data - in a real app, this would come from an API
  const mockPosts: InstagramPost[] = [
    {
      id: '1',
      type: 'post',
      imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop',
      caption: 'Amazing sunset at the beach! 🌅 #sunset #beach #photography',
      username: 'travel_lover',
      likes: 1247,
      comments: 89,
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'reel',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      caption: 'Quick workout routine 💪 #fitness #workout #motivation',
      username: 'fitness_guru',
      likes: 2156,
      comments: 156,
      timestamp: '1 day ago'
    },
    {
      id: '3',
      type: 'post',
      imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
      caption: 'Delicious homemade pasta! 🍝 #food #cooking #homemade',
      username: 'foodie_chef',
      likes: 892,
      comments: 67,
      timestamp: '3 days ago'
    },
    {
      id: '4',
      type: 'reel',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop',
      caption: 'New product launch! 🚀 #tech #innovation #startup',
      username: 'tech_startup',
      likes: 3421,
      comments: 234,
      timestamp: '1 week ago'
    },
    {
      id: '5',
      type: 'reel',
      imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop',
      caption: '🚀 NEW: Instagram Automation Tool! Automate your comment responses and grow your business! 💼✨\n\n🔥 Comment "interested" below to get early access!\n\n#automation #instagram #business #growth #marketing',
      username: 'automation_master',
      likes: 5421,
      comments: 423,
      timestamp: 'Just now'
    }
  ]

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || post.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleVideoClick = () => {
    setExpandedVideo(true)
  }

  const closeExpandedVideo = () => {
    setExpandedVideo(false)
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Select Post/Reel
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Choose the Instagram content to monitor for comments
          </Typography>
        </Box>
        <Instagram sx={{ color: 'primary.main', fontSize: 32 }} />
      </Box>

      {/* Search and Filter */}
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          placeholder="Search posts by caption or username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          }}
          size="small"
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant={filterType === 'all' ? 'contained' : 'outlined'}
            size="small"
            onClick={() => setFilterType('all')}
          >
            All
          </Button>
          <Button
            variant={filterType === 'post' ? 'contained' : 'outlined'}
            size="small"
            startIcon={<Image />}
            onClick={() => setFilterType('post')}
          >
            Posts
          </Button>
          <Button
            variant={filterType === 'reel' ? 'contained' : 'outlined'}
            size="small"
            startIcon={<PlayArrow />}
            onClick={() => setFilterType('reel')}
          >
            Reels
          </Button>
        </Box>
      </Box>

      {/* Posts Grid */}
      <Grid container spacing={2} sx={{ maxHeight: 400, overflow: 'auto' }}>
        {filteredPosts.map((post) => (
          <Grid item xs={12} sm={6} key={post.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                border: selectedPost?.id === post.id ? 2 : 1,
                borderColor: selectedPost?.id === post.id ? 'primary.main' : 'divider',
                boxShadow: selectedPost?.id === post.id ? 3 : 1,
                transform: selectedPost?.id === post.id ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.2s ease-in-out'
              }}
              onClick={() => onPostSelect(post)}
            >
              <Box sx={{ position: 'relative' }}>
                {post.id === '5' ? (
                  // Video reel for test content
                  <Box sx={{ position: 'relative', height: 200 }}>
                    <iframe
                      src="https://www.youtube.com/embed/JoyKXJdWKOE?controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=JoyKXJdWKOE&mute=1&autoplay=0"
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
                      onClick={(e) => {
                        e.stopPropagation()
                        handleVideoClick()
                      }}
                    >
                      <Avatar sx={{ 
                        width: 48, 
                        height: 48, 
                        backgroundColor: 'white',
                        '&:hover': {
                          backgroundColor: 'grey.100'
                        }
                      }}>
                        <PlayArrow sx={{ color: 'primary.main', ml: 0.5 }} />
                      </Avatar>
                    </Box>
                    {/* Video duration indicator */}
                    <Chip
                      label="0:30"
                      size="small"
                      sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
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
                        top: 8,
                        left: 8,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white'
                      }}
                    />
                  </Box>
                ) : (
                  // Regular image for other posts
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.imageUrl}
                    alt={post.caption}
                  />
                )}
                
                {post.type === 'reel' && post.id !== '5' && (
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
                
                {selectedPost?.id === post.id && (
                  <Box sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    backgroundColor: 'primary.main',
                    borderRadius: '50%',
                    p: 0.5
                  }}>
                    <Instagram sx={{ color: 'white', fontSize: 16 }} />
                  </Box>
                )}
              </Box>
              
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    @{post.username}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {post.timestamp}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ 
                  color: 'text.secondary', 
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {post.caption}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Favorite sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {post.likes.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ChatBubbleOutline sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      {post.comments}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Expanded Video Dialog */}
      <Dialog
        open={expandedVideo}
        onClose={closeExpandedVideo}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6">Instagram Reel Preview</Typography>
          <IconButton onClick={closeExpandedVideo}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ position: 'relative', mb: 2 }}>
            <iframe
              src="https://www.youtube.com/embed/JoyKXJdWKOE?controls=1&modestbranding=1&rel=0&showinfo=1&autoplay=1&mute=0"
              title="Instagram Automation Demo"
              style={{ width: '100%', height: 400, border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
          <Box sx={{ p: 2 }}>
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
          </Box>
        </DialogContent>
      </Dialog>

      {filteredPosts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Instagram sx={{ fontSize: 48, color: 'grey.300', mb: 2 }} />
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            No posts found matching your criteria
          </Typography>
        </Box>
      )}

      {/* Next Button */}
      {selectedPost && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            onClick={onNext}
            disabled={!canProceed}
            sx={{
              background: 'linear-gradient(135deg, #E4405F 0%, #405DE6 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #C2185B 0%, #303F9F 100%)'
              }
            }}
          >
            Next: Configure Trigger
          </Button>
        </Box>
      )}
    </Paper>
  )
}

export default PostSelector 