import { useEffect, useState } from 'react';
import './App.css';

interface HealthResponse {
  status: string;
  timestamp: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then((data: HealthResponse) => {
        setHealth(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch health:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="App">
      <h1>TypeScript Monorepo</h1>
      <div className="card">
        <h2>Backend Status</h2>
        {loading ? (
          <p>Loading...</p>
        ) : health ? (
          <div>
            <p>Status: <strong>{health.status}</strong></p>
            <p>Timestamp: {new Date(health.timestamp).toLocaleString()}</p>
          </div>
        ) : (
          <p>Failed to connect to backend</p>
        )}
      </div>
      <p className="info">
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
    </div>
  )
}

export default App
