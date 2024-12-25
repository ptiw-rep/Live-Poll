import React, { useEffect, useState } from 'react';
import { CreatePoll } from './components/CreatePoll';
import { PollList } from './components/PollList';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Poll } from './types';
import { Vote } from 'lucide-react';
import { fetchPolls, votePoll, createEventSource } from './utils/api';

export default function App() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let eventSource: EventSource;

    async function initializeApp() {
      try {
        setLoading(true);
        const data = await fetchPolls();
        setPolls(data);
        setError(null);

        // Set up SSE connection
        eventSource = createEventSource();
        eventSource.onmessage = (event) => {
          const updatedPolls = JSON.parse(event.data);
          setPolls(updatedPolls);
        };
        eventSource.onerror = () => {
          setError('Lost connection to server. Trying to reconnect...');
        };
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }

    initializeApp();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  const handleVote = async (optionId: number) => {
    try {
      await votePoll(optionId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit vote');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <Vote className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Live Polling App</h1>
        </div>

        <ErrorBoundary>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <div className="mb-8">
            <CreatePoll />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Active Polls</h2>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <PollList polls={polls} onVote={handleVote} />
            )}
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}