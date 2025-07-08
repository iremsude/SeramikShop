import "./CategoryProductsPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItem from "../components/Products/ProductItem"; // 🔹 Çalışan bileşeni kullanıyoruz

const CategoryProductsPage = () => {
  const { id } = useParams(); // /category/:id
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        // Ürünleri getir
        const productRes = await fetch(`${apiUrl}/api/products?category=${id}`);
        const productData = await productRes.json();
        setProducts(productData);

        // Kategori adını getir
        const categoryRes = await fetch(`${apiUrl}/api/categories/${id}`);
        const categoryData = await categoryRes.json();
        setCategoryName(categoryData.name || "Kategori");
      } catch (err) {
        console.error("Kategori verisi alınamadı:", err);
      }
    };

    fetchCategoryData();
  }, [id, apiUrl]);

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "600",
          marginBottom: "2rem",
          textAlign: "center",
          color: "#333",
          borderBottom: "2px solid #eee",
          paddingBottom: "0.5rem",
        }}
      >
        {categoryName} Ürünleri
      </h2>

      {products.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {products.map((product) => (
            <ProductItem key={product._id} productItem={product} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#888", marginTop: "2rem" }}>
          Bu kategoriye ait ürün bulunamadı.
        </p>
      )}
    </div>
  );
};

export default CategoryProductsPage;
