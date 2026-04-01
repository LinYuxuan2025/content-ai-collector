import { useState, useCallback } from 'react';
import { analyzeContent } from '../services/claude';

export function useClaude() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyze = useCallback(async (content, apiKey, apiUrl, model) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await analyzeContent(content, apiKey, apiUrl, model);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { analyze, isLoading, error, clearError };
}
