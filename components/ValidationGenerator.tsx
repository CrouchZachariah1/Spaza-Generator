
import React, { useState } from 'react';
import { generateValidation } from '../services/geminiService';
import ResultCard from './ResultCard';
import Loader from './Loader';

const ValidationGenerator: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) {
      setError('Please describe your heroic accomplishment.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResult('');

    try {
      const validation = await generateValidation(task);
      setResult(validation);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
      <h2 className="text-2xl font-bold text-amber-300 mb-4">The Validation Vault</h2>
      <p className="text-gray-400 mb-6">Share a mundane task you completed. Prepare for the standing ovation you truly deserve.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="task" className="block text-sm font-medium text-gray-300 mb-2">Accomplishment</label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="e.g., I finally folded the laundry"
            className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? <Loader /> : 'Validate Me'}
        </button>
      </form>

      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      {result && <ResultCard text={result} />}
    </div>
  );
};

export default ValidationGenerator;
