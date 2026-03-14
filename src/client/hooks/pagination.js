import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = (totalPages) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setSearchParams({ page: totalPages });
    }
  }, [page, totalPages, setSearchParams]);
  return page;
};
