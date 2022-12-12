import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, ReactNode, useEffect } from 'react';

type Pagination = {
  totalPage: number;
  active: number;
};

export const Pagination = ({ totalPage, active }: Pagination) => {
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
    router.push(`/?page=${page + 1}`);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      router.push(`/?page=${page - 1}`);
    }
  };

  useEffect(() => {
    setPage(active);
    return () => {};
  }, [active]);

  const renderElements = () => {
    let elements: ReactNode[] = [];

    for (let index = 1; index <= totalPage; index++) {
      elements.push(
        <li
          key={index}
          className={`page-item ${active === index ? 'active' : ''}`}
        >
          <Link
            className={`page-link ${
              active === index
                ? 'bg-blue-600 text-white hover:text-white hover:bg-blue-600 shadow-md'
                : 'bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200'
            } relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none`}
            href={'/?page=' + index}
            shallow={true}
          >
            {index}
            {active === index ? <span className="visually-hidden"></span> : ''}
          </Link>
        </li>,
      );
    }

    return elements;
  };

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li
            className={`page-item ${page === 1 ? 'disabled' : ''}`}
            onClick={handlePrevPage}
            key={'Previous'}
          >
            <span
              className={`page-link ${
                page === 1
                  ? 'text-gray-500 pointer-events-none'
                  : 'text-gray-800 hover:text-gray-800 hover:bg-gray-200'
              } relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full focus:shadow-none`}
              tabIndex={-1}
              aria-disabled="true"
            >
              Previous
            </span>
          </li>
          {renderElements()}
          <li
            className={`page-item ${page === totalPage ? 'disabled' : ''}`}
            onClick={handleNextPage}
            key={'Next'}
          >
            <span
              className={`page-link ${
                page === totalPage
                  ? 'text-gray-500 pointer-events-none'
                  : 'text-gray-800 hover:text-gray-800 hover:bg-gray-200'
              } relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full focus:shadow-none`}
              tabIndex={-1}
              aria-disabled="true"
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};
