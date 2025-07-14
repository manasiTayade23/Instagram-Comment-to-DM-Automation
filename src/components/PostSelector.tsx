import React, { useState } from 'react'
import { Instagram, Play, Image, Search, Filter } from 'lucide-react'
import { InstagramPost } from '../types'

interface PostSelectorProps {
  selectedPost: InstagramPost | null
  onPostSelect: (post: InstagramPost) => void
}

const PostSelector: React.FC<PostSelectorProps> = ({ selectedPost, onPostSelect }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'post' | 'reel'>('all')

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
    }
  ]

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.username.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || post.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Select Post/Reel</h2>
          <p className="text-gray-600">Choose the Instagram content to monitor for comments</p>
        </div>
        <Instagram className="h-8 w-8 text-instagram-500" />
      </div>

      {/* Search and Filter */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts by caption or username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filterType === 'all' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('post')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filterType === 'post' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Image className="inline h-4 w-4 mr-1" />
            Posts
          </button>
          <button
            onClick={() => setFilterType('reel')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filterType === 'reel' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Play className="inline h-4 w-4 mr-1" />
            Reels
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => onPostSelect(post)}
            className={`
              relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-md
              ${selectedPost?.id === post.id 
                ? 'border-instagram-500 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
          >
            <div className="relative">
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              {post.type === 'reel' && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1">
                  <Play className="h-4 w-4 text-white" />
                </div>
              )}
              {selectedPost?.id === post.id && (
                <div className="absolute top-2 left-2 bg-instagram-500 rounded-full p-1">
                  <Instagram className="h-4 w-4 text-white" />
                </div>
              )}
            </div>
            
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">@{post.username}</span>
                <span className="text-xs text-gray-500">{post.timestamp}</span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 mb-2">{post.caption}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>❤️ {post.likes.toLocaleString()}</span>
                <span>💬 {post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Instagram className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No posts found matching your criteria</p>
        </div>
      )}
    </div>
  )
}

export default PostSelector 