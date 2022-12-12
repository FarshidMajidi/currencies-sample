import axios from 'axios';

export type Currencies = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: any;
  total_volume: any;
  circulating_supply: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
};

export const getCurrencies = () => {
  return axios
    .get(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`)
    .then(({ data }) => data);
};

export const getPaginationCurrency = async (page: string) => {
  const res = await axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&amp;page=${page}&amp;per_page=14&amp;price_change_percentage=24h,7d`,
    )
    .then(({ data }) => data);

  return res;
};
