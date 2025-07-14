import React from 'react'
import { AppBar, Toolbar, Typography, Box, Avatar, Chip } from '@mui/material'
import { Instagram, AutoAwesome } from '@mui/icons-material'

const Header: React.FC = () => {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid #DBDBDB',
        color: 'text.primary'
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Instagram sx={{ color: 'primary.main', fontSize: 32, mr: 2 }} />
          <Box>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Instagram Automation
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Comment-to-DM Workflow Builder
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            icon={<AutoAwesome />}
            label="Beta"
            size="small"
            sx={{
              backgroundColor: 'primary.light',
              color: 'primary.main',
              fontWeight: 600,
            }}
          />
          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 600 }}>
              U
            </Typography>
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header 