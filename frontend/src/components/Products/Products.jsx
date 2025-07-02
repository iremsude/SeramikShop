import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import PropTypes from "prop-types";
import { message } from "antd";
import "./Products.css";

function NextBtn({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--right" onClick={onClick}>
      <i className="bi bi-chevron-right"></i>
    </button>
  );
}
NextBtn.propTypes = { onClick: PropTypes.func };

function PrevBtn({ onClick }) {
  return (
    <button className="glide__arrow glide__arrow--left" onClick={onClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
}
PrevBtn.propTypes = { onClick: PropTypes.func };

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/products`);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        message.error("Veri getirme başarısız.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [apiUrl]);

  const sliderSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextBtn />,
    prevArrow: <PrevBtn />,
    autoplaySpeed: 3000,
    autoplay: true,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 520, settings: { slidesToShow: 1 } },
    ],
  };

  if (loading) {
    return (
      <section className="products">
        <div className="container">
          <p>Ürünler yükleniyor…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>New Modern Design</p>
        </div>

        <div className="product-wrapper product-carousel">
          {products.length ? (
            <Slider {...sliderSettings}>
              {products.map((product) => (
                <ProductItem key={product._id} productItem={product} />
              ))}
            </Slider>
          ) : (
            <p>Şu an ürün bulunamadı 🥺</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
