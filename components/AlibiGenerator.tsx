import React, { useState } from 'react';
import { generateAlibi } from '../services/geminiService';
import { AlibiIntensity, AlibiTone } from '../types';
import ResultCard from './ResultCard';
import Loader from './Loader';

const AlibiGenerator: React.FC = () => {
  const [event, setEvent] = useState<string>('');
  const [intensity, setIntensity] = useState<AlibiIntensity>(AlibiIntensity.MEDIUM);
  const [tone, setTone] = useState<AlibiTone>(AlibiTone.INFORMAL);
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event.trim()) {
      setError('Please describe the event you wish to avoid.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResult('');

    try {
      const alibi = await generateAlibi(event, intensity, tone);
      setResult(alibi);
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
      <h2 className="text-2xl font-bold text-amber-300 mb-4">The Alibi Engine</h2>
      <p className="text-gray-400 mb-6">Describe the social engagement you'd rather not engage in. We'll handle the rest.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="event" className="block text-sm font-medium text-gray-300 mb-2">Event to Skip</label>
          <textarea
            id="event"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            placeholder="e.g., My cousin's interpretive dance recital on Zoom"
            className="w-full bg-gray-900 border border-gray-600 rounded-md p-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            rows={3}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">Excuse Intensity</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.values(AlibiIntensity).map((level) => (
              <label key={level} className="flex-1">
                <input
                  type="radio"
                  name="intensity"
                  value={level}
                  checked={intensity === level}
                  onChange={() => setIntensity(level)}
                  className="sr-only peer"
                />
                <div className="w-full p-3 text-center bg-gray-900 border border-gray-600 rounded-md cursor-pointer peer-checked:border-amber-400 peer-checked:ring-2 peer-checked:ring-amber-400 peer-checked:text-amber-300 transition">
                  {level}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">Emotional Flavor</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {Object.values(AlibiTone).map((level) => (
              <label key={level} className="flex-1">
                <input
                  type="radio"
                  name="tone"
                  value={level}
                  checked={tone === level}
                  onChange={() => setTone(level)}
                  className="sr-only peer"
                />
                <div className="w-full p-3 text-center bg-gray-900 border border-gray-600 rounded-md cursor-pointer peer-checked:border-amber-400 peer-checked:ring-2 peer-checked:ring-amber-400 peer-checked:text-amber-300 transition text-sm">
                  {level}
                </div>
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? <Loader /> : 'Forge My Excuse'}
        </button>
      </form>

      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      {result && <ResultCard text={result} />}
    </div>
  );
};

export default AlibiGenerator;
