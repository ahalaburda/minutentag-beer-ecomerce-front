import { useState, useEffect, useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import Header from '../Header/Header';

/**
 * ProductList component displays a grid of product cards with their prices.
 * It fetches product data and their corresponding stock prices from the API.
 * @returns {JSX.Element} A component that displays a list of products with their details
 */
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [stockPrices, setStockPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchProducts();
      hasFetched.current = true;
    }
  }, []);

  /**
   * Fetches products and their stock prices from the API.
   * For each product, it fetches the stock price using the first SKU code.
   * Updates the products and stockPrices state, and sets loading to false when complete.
   * @async
   * @returns {Promise<void>}
   */
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products');
      const data = await response.json();

      const prices = {};
      await Promise.all(
        data.map(async (product) => {
          const firstSku = product.skus[0].code;
          const priceResponse = await fetch(
            `http://localhost:3001/api/stock-price/${firstSku}`
          );
          const priceData = await priceResponse.json();
          prices[product.id] = priceData;
        })
      );

      setStockPrices(prices);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      window.alert('Error loading products', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="p-6">
      <Header />
      <div className="welcome-section pt-3">
        <h1 className="font-normal text-base leading-5 text-gray-700 opacity-60">
          Hi Mr. Michael,
        </h1>
        <h2 className="font-bold text-2xl leading-8 text-gray-800 mb-3">
          Welcome Back!
        </h2>
      </div>

      <h3 className="font-bold text-lg leading-6 text-gray-800 mb-4">
        Our Products
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {products.map((product, index) => {
          return (
            <ProductCard
              key={product.id}
              index={index}
              product={product}
              price={stockPrices[product.id]?.price || 0}
            />
          );
        })}
      </div>
    </div>
  );
}
