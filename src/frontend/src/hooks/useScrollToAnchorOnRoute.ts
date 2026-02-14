import { useEffect } from 'react';
import { useSearch } from '@tanstack/react-router';

export function useScrollToAnchorOnRoute() {
  const search = useSearch({ strict: false }) as { scrollTo?: string };

  useEffect(() => {
    if (search.scrollTo) {
      const elementId = `${search.scrollTo}-section`;
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [search.scrollTo]);
}
