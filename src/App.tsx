import React, { useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box, Container, Paper } from '@mui/material'
import Header from './components/Header'
import WorkflowBuilder from './components/WorkflowBuilder'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

// Create Instagram-inspired theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#E4405F', // Instagram pink
      light: '#F8BBD9',
      dark: '#C2185B',
    },
    secondary: {
      main: '#405DE6', // Instagram blue
      light: '#5C6BC0',
      dark: '#303F9F',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#262626',
      secondary: '#8E8E93',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #DBDBDB',
        },
      },
    },
  },
})

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [workflowData, setWorkflowData] = useState({
    selectedPost: null,
    comment: '',
    triggerType: 'exact' as const,
    dmMessage: '',
    isLive: false
  })

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 2))
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleGoLive = () => {
    setWorkflowData(prev => ({ ...prev, isLive: true }))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'background.default',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <ErrorBoundary>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            <Header />
            <Box sx={{ mt: 4 }}>
              <WorkflowBuilder
                currentStep={currentStep}
                workflowData={workflowData}
                setWorkflowData={setWorkflowData}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onGoLive={handleGoLive}
              />
            </Box>
          </Container>
        </ErrorBoundary>
      </Box>
    </ThemeProvider>
  )
}

export default App 