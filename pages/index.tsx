import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import {
  getCurrencies,
  getPaginationCurrency,
  Currencies,
} from '../services/currency-service';
import { Pagination } from '../components/pagination';
import { CurrencyList } from '../components/currency-list';

export async function getServerSideProps(context: any) {
  const { query } = context;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['currencies'],
    async () => await getPaginationCurrency(query.page ? query.page : 1),
  );

  await queryClient.prefetchQuery(
    ['currency-list'],
    async () => await getCurrencies(),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Currencies() {
  const router = useRouter();
  const {
    query: { page },
  } = router;

  const { data: currencies } = useQuery<Currencies[]>({
    queryKey: ['currencies', { page }],
    queryFn: async () => await getPaginationCurrency(String(page)),
    keepPreviousData: true,
  });

  const { data: currencyList } = useQuery<string[]>({
    queryKey: ['currency-list'],
    queryFn: async () => await getCurrencies(),
  });

  return (
    <div className="flex flex-col w-full justify-center items-center">
      {currencies?.length && (
        <CurrencyList currencies={currencies} page={Number(page)} />
      )}

      {currencyList && (
        <Pagination
          totalPage={Math.ceil(currencyList.length / 14)}
          active={Number(page)}
        />
      )}
    </div>
  );
}

export default Currencies;
