import React, { useEffect, useState } from 'react';
import type { Poll } from '../types';

interface PollListProps {
  polls: Poll[];
  onVote: (optionId: number) => void;
}

export function PollList({ polls, onVote }: PollListProps) {
  const calculatePercentage = (votes: number, totalVotes: number) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="space-y-6">
      {polls.map((poll) => {
        const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

        return (
          <div key={poll.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">{poll.question}</h3>
            <div className="space-y-3">
              {poll.options.map((option) => {
                const percentage = calculatePercentage(option.votes, totalVotes);

                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">{option.text}</span>
                      <span className="text-sm text-gray-500">
                        {option.votes} votes ({percentage}%)
                      </span>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <button
                        onClick={() => onVote(option.id)}
                        className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded-full transition-colors"
                      >
                        Vote
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}