import Image from 'next/image';
import { Currencies } from '../services/currency-service';
import { formatAsPercent, formatCurrency } from '../utils/formatter';

type ListProps = {
  currencies: Currencies[];
  page: number;
};

export const CurrencyList = ({ currencies, page }: ListProps) => {
  return (
    <div className="flex flex-col w-3/4">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Coins
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    24H
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    7D
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Market Cap
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Total Volume
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Circulating Supply
                  </th>
                </tr>
              </thead>
              <tbody>
                {currencies.length &&
                  currencies.map((item: any, index: number) => {
                    return (
                      <>
                        <tr key={item.ath} className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {(page - 1) * 14 + (index + 1)}
                          </td>
                          <td className="flex">
                            <div className="flex items-center">
                              <Image
                                src={item.image.split('?')[0]}
                                alt="Picture of the currency"
                                width={12}
                                height={12}
                              />
                              <div className="flex flex-col justify-center">
                                <span className="text-sm text-gray-900 font-light pl-2 whitespace-nowrap">
                                  {item.name}
                                </span>
                                <span className="text-sm text-gray-900 font-light pl-2 whitespace-nowrap">
                                  {item.symbol}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {formatCurrency.format(item.current_price)}
                          </td>
                          <td className="flex">
                            <div className="flex items-center">
                              {item.price_change_percentage_24h > 0 ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-3 h-3 text-green-700"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 15.75l7.5-7.5 7.5 7.5"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-3 h-3 text-red-700"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                  />
                                </svg>
                              )}
                              <span className="text-sm text-gray-900 font-light pl-2 whitespace-nowrap">
                                {formatAsPercent(
                                  item.price_change_percentage_24h,
                                )}
                              </span>
                            </div>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {formatAsPercent(
                              item.price_change_percentage_7d_in_currency,
                            )}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {formatCurrency.format(item.market_cap)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {formatCurrency.format(item.total_volume)}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item.circulating_supply}
                          </td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
