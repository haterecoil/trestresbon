'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('Effect running')
    fetch('./data/restaurants_latest.jsonl')
      .then(r => r.text())
      .then(text => {
        const lines = text.trim().split('\n')
        const parsed = lines.map(l => JSON.parse(l))
        setData(parsed)
        setLoading(false)
      })
      .catch(err => {
        console.error('Fetch error:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div style={{padding: 20}}>Loading... (check console)</div>
  }

  return (
    <div style={{padding: 20}}>
      <h1>Loaded {data?.length} restaurants!</h1>
      <p>First: {data?.[0]?.name}</p>
    </div>
  )
}
