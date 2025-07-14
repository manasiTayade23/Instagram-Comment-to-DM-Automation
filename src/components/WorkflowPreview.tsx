import React from 'react'
import { Instagram, MessageSquare, Send, Play, Image, Zap, CheckCircle } from 'lucide-react'
import { WorkflowData } from '../types'

interface WorkflowPreviewProps {
  workflowData: WorkflowData
}

const WorkflowPreview: React.FC<WorkflowPreviewProps> = ({ workflowData }) => {
  const { selectedPost, comment, dmMessage, isLive } = workflowData

  const canGoLive = selectedPost && comment && dmMessage

  const getStepStatus = (step: number) => {
    if (step === 0) return selectedPost ? 'completed' : 'pending'
    if (step === 1) return comment ? 'completed' : 'pending'
    if (step === 2) return dmMessage ? 'completed' : 'pending'
    return 'pending'
  }

  const getStepIcon = (step: number) => {
    const status = getStepStatus(step)
    if (status === 'completed') return <CheckCircle className="h-5 w-5 text-green-500" />
    
    switch (step) {
      case 0: return <Instagram className="h-5 w-5 text-gray-400" />
      case 1: return <MessageSquare className="h-5 w-5 text-gray-400" />
      case 2: return <Send className="h-5 w-5 text-gray-400" />
      default: return null
    }
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Workflow Preview</h2>
          <p className="text-gray-600">See how your automation will work</p>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
          isLive 
            ? 'bg-green-100 text-green-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
          {isLive ? 'Live' : 'Preview'}
        </div>
      </div>

      {/* Instagram Post Preview */}
      {selectedPost && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Content</h3>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-w-sm">
            <div className="relative">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.caption}
                className="w-full h-48 object-cover"
              />
              {selectedPost.type === 'reel' && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                  <Play className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">@{selectedPost.username}</span>
                <span className="text-xs text-gray-500">{selectedPost.timestamp}</span>
              </div>
              <p className="text-sm text-gray-800 mb-2">{selectedPost.caption}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>❤️ {selectedPost.likes.toLocaleString()}</span>
                <span>💬 {selectedPost.comments}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Steps */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Automation Flow</h3>
        
        {/* Step 1: Monitor Post */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {getStepIcon(0)}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Monitor Post</div>
            <div className="text-xs text-gray-600">
              {selectedPost 
                ? `Watching for comments on "${selectedPost.caption.substring(0, 50)}..."`
                : 'Select a post to monitor'
              }
            </div>
          </div>
        </div>

        {/* Step 2: Comment Trigger */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {getStepIcon(1)}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Comment Trigger</div>
            <div className="text-xs text-gray-600">
              {comment 
                ? `Triggers when someone comments: "${comment}"`
                : 'Set up comment trigger'
              }
            </div>
          </div>
        </div>

        {/* Step 3: Send DM */}
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            {getStepIcon(2)}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900">Send DM</div>
            <div className="text-xs text-gray-600">
              {dmMessage 
                ? `Sends message: "${dmMessage.substring(0, 50)}..."`
                : 'Configure DM message'
              }
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      {selectedPost && comment && dmMessage && (
        <div className="mt-6 p-4 bg-gradient-to-r from-instagram-50 to-primary-50 rounded-lg border border-instagram-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Live Preview</h3>
          
          {/* Simulated Comment */}
          <div className="bg-white p-3 rounded-lg border mb-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">user123 commented:</span>
            </div>
            <p className="text-sm text-gray-800">"{comment}"</p>
          </div>

          {/* Simulated DM */}
          <div className="bg-white p-3 rounded-lg border">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-instagram-500 rounded-full mr-2 flex items-center justify-center">
                <span className="text-white text-xs font-medium">You</span>
              </div>
              <span className="text-xs text-gray-600">You sent a DM:</span>
            </div>
            <p className="text-sm text-gray-800">{dmMessage}</p>
          </div>
        </div>
      )}

      {/* Status */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">Workflow Status</div>
            <div className="text-xs text-gray-600">
              {isLive ? 'Automation is active and running' : 'Ready to activate'}
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isLive 
              ? 'bg-green-100 text-green-700' 
              : canGoLive 
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-600'
          }`}>
            {isLive ? 'Active' : canGoLive ? 'Ready' : 'Incomplete'}
          </div>
        </div>
      </div>

      {/* Completion Status */}
      {!canGoLive && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <Zap className="h-4 w-4 text-yellow-600 mr-2" />
            <div className="text-sm text-yellow-800">
              Complete all steps to activate your automation
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkflowPreview 