import { useState, useEffect } from 'react';

export default function useFetch<T>(url: string): {
  data: T | null;
  errorMessage: string | null;
  isLoading: boolean;
  refetch: () => void;
} {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const isLoading = data === null;

  function refetch() {
    fetch(url, {
      headers: {
        Authorization: 'e63f4351-b625ddac-254af606-5a2d8ef0',
      },
    })
      .then((response) => response.json())
      .then((response) => setData(response))
      .catch((error) => setErrorMessage(error.toString()));
  }

  useEffect(() => {
    refetch();
  }, [url]);

  return { data, isLoading, errorMessage, refetch };
}
