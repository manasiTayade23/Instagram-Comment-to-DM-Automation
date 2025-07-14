import React from 'react'
import { Instagram, Zap } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Instagram className="h-8 w-8 text-instagram-500" />
              <Zap className="h-6 w-6 text-primary-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Workflow Builder</h1>
              <p className="text-sm text-gray-600">Instagram Comment to DM Automation</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Ready to automate</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header 