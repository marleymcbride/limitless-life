'use client';

import { useState } from 'react';

export default function ProcessWebhooksPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processWebhooks = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/admin/process-webhooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Don't send API key from client - let server-side auth handle it
        },
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Process Webhooks</h1>

      <div className="mb-8">
        <button
          onClick={processWebhooks}
          disabled={loading}
          className="bg-[#940909] text-white font-bold py-3 px-6 rounded hover:bg-[#B90021] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Process Webhooks'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-white p-4 rounded mb-4">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="bg-gray-900 border border-gray-700 p-6 rounded">
          <h2 className="text-2xl font-bold mb-4">Result</h2>
          <pre className="text-sm text-green-400 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8 text-gray-400">
        <p>This will process up to 10 pending webhooks from the queue.</p>
        <p>Users will be created in the database when webhooks are successfully delivered to n8n.</p>
      </div>
    </div>
  );
}
