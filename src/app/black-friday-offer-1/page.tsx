'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RedirectPage() {
  const router = useRouter()

  useEffect(() => {
    window.location.href = 'https://docs.google.com/document/d/1uPK8DhdAnYUmcbjASPcJXj6GcO-QT-RETUePdP3Zf3c/'
  }, [router])

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <p>Redirecting to document...</p>
      <p>
        If you're not redirected automatically,{' '}
        <a
          href="https://docs.google.com/document/d/1uPK8DhdAnYUmcbjASPcJXj6GcO-QT-RETUePdP3Zf3c/"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here
        </a>
      </p>
    </div>
  )
}