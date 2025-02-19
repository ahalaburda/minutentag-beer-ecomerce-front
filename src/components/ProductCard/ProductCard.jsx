import { Star, Plus } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * ProductCard component displays a product item with image, brand name, rating, price and add to cart functionality
 * @param {Object} props - Component props
 * @param {Object} props.product - Product information object
 * @param {number} props.product.id - Unique identifier for the product
 * @param {string} props.product.brand - Brand name of the product
 * @param {string} props.product.image - URL of the product image
 * @param {string} [props.product.alt] - Alternative text for the product image
 * @param {number} [props.product.rating] - Product rating (optional)
 * @param {number} props.product.price - Product price in cents
 * @param {number} props.price - Display price in cents
 * @param {number} [props.index] - Index of the product card (used for styling)
 * @returns {JSX.Element} A product card component
 */
export default function ProductCard({ product, price, index }) {
  /**
   * Handles adding a product to the shopping cart
   * @param {string} productBrand - The brand name of the product being added
   */
  const handleAddToCart = (productBrand) => {
    window.alert(`Adding product ${productBrand} to cart`);
  };
  return (
    <div
      className={`p-4 pb-0 ${
        index % 2 === 0 ? 'rounded-tr-[32px]' : 'rounded-tl-[32px]'
      } rounded-[12px] bg-white shadow-sm flex flex-col content-center max-h-[203px] max-w-[155px] sm:max-w-[180px] md:max-w-[200px]`}
    >
      <div className="flex justify-center">
        <Link
          to={`/product/${product.id}-${product.brand
            .toLowerCase()
            .replace(/\s+/g, '-')}`}
          className="flex flex-col justify-center items-center w-full hover:opacity-90 transition-opacity"
        >
          <h4 className="truncate font-medium text-base leading-4 tracking-normal w-full max-w-full overflow-hidden text-center">
            {product.brand}
          </h4>
          <div className="relative w-full h-32 overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.alt || `${product.brand} product`}
              className="w-full h-full object-scale-down mix-blend-mode-multiply"
              onError={(e) => {
                e.target.src = '/fallback-image.png';
              }}
            />
          </div>
        </Link>
      </div>
      <div className="relative flex items-center justify-between">
        <div className="flex flex-col pb-2">
          <div
            className={`flex items-center mb-2 ${!product.rating ? 'opacity-0' : 'opacity-100'}`}
          >
            <Star className="text-amber-400 fill-amber-400" size={12} />
            <span className="pl-1 font-medium text-xs leading-3 tracking-normal text-[#808080]">
              {product.rating}
            </span>
          </div>

          <span className="font-medium text-base leading-4 tracking-normal">
            ${(price / 100).toFixed(2)}
          </span>
        </div>
        <button
          className="absolute bottom-0 right-0 translate-x-4 bg-[#FF9F24] hover:bg-orange-500 transition-colors rounded-br-lg rounded-tl-lg w-10 h-10 flex items-center justify-center"
          aria-label="Add to cart"
          onClick={() => {
            handleAddToCart(product.brand);
          }}
        >
          <Plus className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    alt: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number.isRequired,
  }).isRequired,
  price: PropTypes.number.isRequired,
  index: PropTypes.number,
};
