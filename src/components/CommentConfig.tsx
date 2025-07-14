import React, { useState } from 'react'
import { MessageSquare, Hash, Zap, ArrowLeft, ArrowRight } from 'lucide-react'

interface CommentConfigProps {
  comment: string
  onCommentChange: (comment: string) => void
  onNext: () => void
  onPrevious: () => void
}

const CommentConfig: React.FC<CommentConfigProps> = ({
  comment,
  onCommentChange,
  onNext,
  onPrevious
}) => {
  const [commentType, setCommentType] = useState<'exact' | 'keyword' | 'contains'>('keyword')

  const suggestedKeywords = [
    'interested',
    'more info',
    'details',
    'price',
    'contact',
    'DM me',
    'help',
    'question'
  ]

  const handleKeywordSelect = (keyword: string) => {
    onCommentChange(keyword)
  }

  const canProceed = comment.trim().length > 0

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Configure Comment Trigger</h2>
          <p className="text-gray-600">Set up what comments will trigger your DM automation</p>
        </div>
        <MessageSquare className="h-8 w-8 text-primary-500" />
      </div>

      {/* Comment Type Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Trigger Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => setCommentType('exact')}
            className={`
              p-4 rounded-lg border-2 text-left transition-all duration-200
              ${commentType === 'exact'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center mb-2">
              <MessageSquare className={`h-5 w-5 mr-2 ${commentType === 'exact' ? 'text-primary-500' : 'text-gray-400'}`} />
              <span className={`font-medium ${commentType === 'exact' ? 'text-primary-700' : 'text-gray-700'}`}>
                Exact Match
              </span>
            </div>
            <p className="text-xs text-gray-600">Trigger only on exact comment text</p>
          </button>

          <button
            onClick={() => setCommentType('keyword')}
            className={`
              p-4 rounded-lg border-2 text-left transition-all duration-200
              ${commentType === 'keyword'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center mb-2">
              <Hash className={`h-5 w-5 mr-2 ${commentType === 'keyword' ? 'text-primary-500' : 'text-gray-400'}`} />
              <span className={`font-medium ${commentType === 'keyword' ? 'text-primary-700' : 'text-gray-700'}`}>
                Keyword
              </span>
            </div>
            <p className="text-xs text-gray-600">Trigger when comment contains keyword</p>
          </button>

          <button
            onClick={() => setCommentType('contains')}
            className={`
              p-4 rounded-lg border-2 text-left transition-all duration-200
              ${commentType === 'contains'
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="flex items-center mb-2">
              <Zap className={`h-5 w-5 mr-2 ${commentType === 'contains' ? 'text-primary-500' : 'text-gray-400'}`} />
              <span className={`font-medium ${commentType === 'contains' ? 'text-primary-700' : 'text-gray-700'}`}>
                Contains
              </span>
            </div>
            <p className="text-xs text-gray-600">Trigger when comment contains phrase</p>
          </button>
        </div>
      </div>

      {/* Comment Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {commentType === 'exact' ? 'Exact Comment Text' : 
           commentType === 'keyword' ? 'Keyword to Match' : 
           'Phrase to Match'}
        </label>
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder={
            commentType === 'exact' ? 'Enter the exact comment text...' :
            commentType === 'keyword' ? 'Enter keyword (e.g., "interested")' :
            'Enter phrase (e.g., "more information")'
          }
          className="input-field h-24 resize-none"
          rows={3}
        />
        <p className="text-xs text-gray-500 mt-1">
          {commentType === 'exact' ? 'Only triggers when someone comments exactly this text' :
           commentType === 'keyword' ? 'Triggers when comment contains this keyword (case-insensitive)' :
           'Triggers when comment contains this phrase (case-insensitive)'}
        </p>
      </div>

      {/* Suggested Keywords */}
      {commentType === 'keyword' && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Popular Keywords
          </label>
          <div className="flex flex-wrap gap-2">
            {suggestedKeywords.map((keyword) => (
              <button
                key={keyword}
                onClick={() => handleKeywordSelect(keyword)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {comment && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Preview</h4>
          <div className="text-sm text-gray-600">
            <p>When someone comments:</p>
            <div className="mt-1 p-2 bg-white rounded border">
              <span className="font-medium">"{comment}"</span>
            </div>
            <p className="mt-2">→ Your automation will trigger and send a DM</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          className="btn-secondary flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </button>
        
        <button
          onClick={onNext}
          disabled={!canProceed}
          className={`
            flex items-center px-6 py-2 rounded-lg font-medium transition-colors
            ${canProceed
              ? 'bg-primary-500 hover:bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          Next
          <ArrowRight className="h-4 w-4 ml-2" />
        </button>
      </div>
    </div>
  )
}

export default CommentConfig 