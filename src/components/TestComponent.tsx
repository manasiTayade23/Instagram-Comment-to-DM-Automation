import React from 'react'

const TestComponent: React.FC = () => {
  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900">Test Component</h2>
      <p className="text-gray-600">This is a test component to check if rendering works.</p>
      <button className="btn-primary mt-4">Test Button</button>
    </div>
  )
}

export default TestComponent 