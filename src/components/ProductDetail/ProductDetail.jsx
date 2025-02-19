import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Ellipsis } from 'lucide-react';
import './ProductDetail.scss';
import TruncateTextByWords from '../TruncateTextByWords/TruncateTextByWords';
import AddToCartButton from '../AddToCartButton/AddToCartButton';

/**
 * ProductDetail component displays detailed information about a product including
 * its image, brand, price, description, and size options. It also handles SKU selection
 * and adding items to the cart.
 * @returns {JSX.Element} Product detail page component
 */
export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);
  const [skuData, setSkuData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    if (product) {
      // Initialize with first SKU
      handleSkuSelect(product.skus[0].code);

      // Set up polling for price/stock updates
      const interval = setInterval(updateSkuData, 5000);
      return () => clearInterval(interval);
    }
  }, [product]);

  /**
   * Fetches product details from the API and sets the product state
   * @async
   */
  const fetchProductDetails = async () => {
    try {
      const id = productId.split('-')[0];
      const response = await fetch(`http://localhost:3001/api/products`);
      const products = await response.json();
      const productData = products.find((p) => p.id.toString() === id);

      if (!productData) {
        window.alert('Product not found');
        navigate('/products');
        return;
      }

      setProduct(productData);
      setLoading(false);
    } catch (error) {
      window.alert('Error loading product details', error);
      setLoading(false);
    }
  };

  /**
   * Handles SKU selection and updates the related SKU data
   * @param {string} sku - The SKU code to select
   * @async
   */
  const handleSkuSelect = async (sku) => {
    setSelectedSku(sku);
    await updateSkuData(sku);
  };

  /**
   * Updates price and stock information for the currently selected SKU
   * @param {string} [sku=selectedSku] - The SKU code to update data for
   * @async
   */
  const updateSkuData = async (sku = selectedSku) => {
    if (!sku) return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/stock-price/${sku}`
      );
      const data = await response.json();
      setSkuData((prev) => ({
        ...prev,
        [sku]: data,
      }));
    } catch (error) {
      alert.error('Error updating stock/price:', error);
    }
  };

  /**
   * Handles adding the selected product to the cart
   * Validates that a SKU is selected before proceeding
   */
  const handleAddToCart = () => {
    if (!selectedSku) {
      window.alert('Please select a size');
      return;
    }
    window.alert(`Adding to cart: ${product.brand} - ${selectedSku}`);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const currentSkuData = skuData[selectedSku] || { price: 0, stock: 0 };

  return (
    <div className="product-detail">
      <header className="detail-header">
        <button
          className="btn back-button"
          onClick={() => navigate('/products')}
        >
          <ArrowLeft />
        </button>

        <h1>Detail</h1>
        <button className="btn more-button">
          <Ellipsis />
        </button>
      </header>

      <div className="product-content">
        <div className="product-image">
          <img src={product.image} alt={product.brand} />
        </div>

        <div className="product-info-container">
          <div className="product-info">
            <div className="product-name">
              <h2>{product.brand}</h2>
              <div className="product-meta">
                <span>
                  Origin: {product.origin} | Stock: {currentSkuData.stock}
                </span>
              </div>
            </div>
            <div className="product-price">
              ${(currentSkuData.price / 100).toFixed(2)}
            </div>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <TruncateTextByWords text={product.information} words={35} />
          </div>

          <div className="size-selector">
            <h3>Size</h3>
            <div className="size-options">
              {product.skus.map((sku) => (
                <button
                  key={sku.code}
                  className={`size-button ${
                    selectedSku === sku.code ? 'selected' : ''
                  }`}
                  onClick={() => handleSkuSelect(sku.code)}
                >
                  {sku.name}
                </button>
              ))}
            </div>
          </div>

          <div className="purchase-section">
            <div className="cart-btn">
              <AddToCartButton />
            </div>
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={false}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
