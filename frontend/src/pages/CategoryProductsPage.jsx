import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../components/Products/ProductItem";

const CategoryProductsPage = () => {
  const { id } = useParams(); // /category/:id
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // 1. Ürünleri getir (kategoriye göre)
        const productRes = await fetch(`${apiUrl}/api/products?category=${id}`);
        const productData = await productRes.json();
        setProducts(productData);

        // 2. Kategori adını getir
        const categoryRes = await fetch(`${apiUrl}/api/categories/${id}`);
        const categoryData = await categoryRes.json();
        setCategoryName(categoryData.name || "Kategori");
      } catch (err) {
        console.error("Kategori verisi alınamadı:", err);
      }
    };

    fetchCategoryData();
  }, [id]);

  return (
    <div className="category-products-page">
      <h2>{categoryName} Ürünleri</h2>

      <div className="products-wrapper">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem key={product._id} productItem={product} />
          ))
        ) : (
          <p>Bu kategoriye ait ürün bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
