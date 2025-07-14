import React, { useState } from 'react'
import { Send, ArrowLeft, Sparkles, Clock, User } from 'lucide-react'

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
  const [delay, setDelay] = useState(5)
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
    
    const cursorPos = (document.querySelector('textarea') as HTMLTextAreaElement)?.selectionStart || 0
    const newMessage = dmMessage.slice(0, cursorPos) + personalizations[type as keyof typeof personalizations] + dmMessage.slice(cursorPos)
    onMessageChange(newMessage)
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Set DM Message</h2>
          <p className="text-gray-600">Create the message that will be sent automatically</p>
        </div>
        <Send className="h-8 w-8 text-instagram-500" />
      </div>

      {/* Message Templates */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Quick Templates
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {messageTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => handleTemplateSelect(template)}
              className="p-3 text-left border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="flex items-center mb-1">
                <span className="text-lg mr-2">{template.emoji}</span>
                <span className="font-medium text-sm text-gray-900">{template.title}</span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">{template.message}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Message
        </label>
        <textarea
          value={dmMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Write your DM message here... (You can use personalization tags below)"
          className="input-field h-32 resize-none"
          rows={4}
        />
        
        {/* Personalization Tags */}
        <div className="mt-3">
          <label className="block text-xs font-medium text-gray-600 mb-2">
            Personalization Tags
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => addPersonalization('name')}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs transition-colors"
            >
              <User className="inline h-3 w-3 mr-1" />
              {{user_name}}
            </button>
            <button
              onClick={() => addPersonalization('username')}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs transition-colors"
            >
              @{{username}}
            </button>
            <button
              onClick={() => addPersonalization('comment')}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs transition-colors"
            >
              "{{comment}}"
            </button>
            <button
              onClick={() => addPersonalization('post')}
              className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs transition-colors"
            >
              {{post_title}}
            </button>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Send Delay
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="1"
              max="60"
              value={delay}
              onChange={(e) => setDelay(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 min-w-[60px]">{delay} min</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Wait {delay} minutes after the comment before sending the DM
          </p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="includeEmoji"
            checked={includeEmoji}
            onChange={(e) => setIncludeEmoji(e.target.checked)}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="includeEmoji" className="ml-2 text-sm text-gray-700">
            Include friendly emojis in messages
          </label>
        </div>
      </div>

      {/* Preview */}
      {dmMessage && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Message Preview</h4>
          <div className="bg-white p-3 rounded-lg border max-w-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-instagram-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">You</span>
              </div>
              <div className="ml-2 text-xs text-gray-500">
                {delay} min after comment
              </div>
            </div>
            <div className="bg-instagram-100 p-3 rounded-lg">
              <p className="text-sm text-gray-800">{dmMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation and Go Live */}
      <div className="flex justify-between items-center">
        <button
          onClick={onPrevious}
          className="btn-secondary flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
        
        <button
          onClick={onGoLive}
          disabled={!canGoLive}
          className={`
            flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${canGoLive
              ? 'bg-gradient-to-r from-instagram-500 to-instagram-600 hover:from-instagram-600 hover:to-instagram-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          <Sparkles className="h-5 w-5 mr-2" />
          Go Live
        </button>
      </div>

      {!canGoLive && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Complete all steps to activate your automation
        </p>
      )}
    </div>
  )
}

export default DMConfig 