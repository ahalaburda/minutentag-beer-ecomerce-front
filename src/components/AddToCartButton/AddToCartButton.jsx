import PropTypes from 'prop-types';
import './AddToCartButton.scss';
import ShoppingBagIcon from '../../icons/ShoppingBagIcon';

export default function AddToCartButton({ onClick, disabled = false }) {
  return (
    <button
      className="icon-button"
      aria-label="Shopping cart"
      disabled={disabled}
      onClick={onClick}
    >
      <ShoppingBagIcon size={24} stroke={'#FF9F24'} />
    </button>
  );
}

AddToCartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
