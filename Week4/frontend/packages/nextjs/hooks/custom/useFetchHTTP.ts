import { useState, useEffect } from 'react';


const useFetchHTTP = (url: string, options = {}) => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
            setError(new Error(`HTTP error! status: ${response.status}`));
        }
        const result = await response.json();
        if (isMounted) {
          setData(result.result);
          setLoading(false);
        }
      } catch (error ) {
        if (isMounted) {
          setError(error as Error);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, options]);

  return { data, loading, error };
};

export default useFetchHTTP;