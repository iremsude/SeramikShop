import "./ProductItem.css";
import PropTypes from "prop-types";
import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { Link } from "react-router-dom";

const placeholderImg = "https://via.placeholder.com/400x400?text=No+Image";

const ProductItem = ({ productItem }) => {
  const { cartItems, addToCart } = useContext(CartContext);

  // Ürün verisi eksikse bile uygulama çökmesin
  if (!productItem) return null;

  /* ---------- Güvenli alan :) ---------- */
  const firstImg  = productItem.img?.[0] ?? placeholderImg;
  const secondImg = productItem.img?.[1] ?? firstImg;

  const originalPrice   = productItem?.price?.current   ?? 0;
  const discountPercent = productItem?.price?.discount  ?? 0;
  const discountedPrice =
    originalPrice - (originalPrice * discountPercent) / 100;

  const filteredCart = cartItems.find(
    (cartItem) => cartItem._id === productItem._id
  );
  /* ------------------------------------- */

  return (
    <div className="product-item glide__slide glide__slide--active">
      {/* Görseller */}
      <div className="product-image">
        <a href="#">
          <img src={firstImg}  alt="" className="img1" />
          <img src={secondImg} alt="" className="img2" />
        </a>
      </div>

      {/* Bilgi */}
      <div className="product-info">
        <Link to={`/product/${productItem._id}`} className="product-title">
          {productItem.name}
        </Link>

        <ul className="product-star">
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-fill"></i></li>
          <li><i className="bi bi-star-half"></i></li>
        </ul>

        <div className="product-prices">
          <strong className="new-price">${discountedPrice.toFixed(2)}</strong>
          <span   className="old-price">${originalPrice.toFixed(2)}</span>
        </div>

        <span className="product-discount">-{discountPercent}%</span>

        {/* Aksiyon butonları */}
        <div className="product-links">
          <button
            className="add-to-cart"
            onClick={() =>
              addToCart({ ...productItem, price: discountedPrice })
            }
            disabled={filteredCart}
          >
            <i className="bi bi-basket-fill"></i>
          </button>

          <button>
            <i className="bi bi-heart-fill"></i>
          </button>

          <Link to={`/product/${productItem._id}`} className="product-link">
            <i className="bi bi-eye-fill"></i>
          </Link>

          <button>
            <i className="bi bi-share-fill"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  productItem: PropTypes.object,
};

export default ProductItem;
