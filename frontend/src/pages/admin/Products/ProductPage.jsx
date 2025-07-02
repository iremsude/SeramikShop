import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const placeholderImg = "https://via.placeholder.com/100x100?text=No+Image";

const ProductPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  /* ------------ TABLO KOLONLARI --------------- */
  const columns = [
    {
      title: "Product Görseli",
      dataIndex: "img",
      key: "img",
      render: (imgSrc) => (
        <img src={imgSrc?.[0] ?? placeholderImg} alt="Image" width={100} />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Kategori",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span>{text || "—"}</span>,
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (price) =>
        price?.current ? `$${price.current.toFixed(2)}` : "—",
    },
    {
      title: "İndirim",
      dataIndex: "price",
      key: "discount",
      render: (price) =>
        price?.discount ? `-%${price.discount}` : "Yok",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate(`/admin/products/update/${record._id}`)}
          >
            Güncelle
          </Button>
          <Popconfirm
            title="Ürünü Sil"
            description="Ürünü silmek istediğinizden emin misiniz?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteProduct(record._id)}
          >
            <Button type="primary" danger>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  /* -------------------------------------------- */

  /* ------------ ÜRÜN SİLME -------------------- */
  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`${apiUrl}/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) return message.error("Silme işlemi başarısız.");
      message.success("Ürün başarıyla silindi.");
      setDataSource((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error(err);
      message.error("Silme hatası.");
    }
  };
  /* -------------------------------------------- */

  /* ------------ VERİ ÇEKME -------------------- */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch(`${apiUrl}/api/categories`),
          fetch(`${apiUrl}/api/products`),
        ]);
        if (!catRes.ok || !prodRes.ok)
          return message.error("Veri getirme başarısız.");

        const [categories, products] = await Promise.all([
          catRes.json(),
          prodRes.json(),
        ]);

        const data = products.map((p) => {
          const category = categories.find((c) => c._id === p.category);
          return { ...p, categoryName: category?.name ?? "" };
        });

        setDataSource(data);
      } catch (err) {
        console.error(err);
        message.error("Veri hatası.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);
  /* -------------------------------------------- */

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(record) => record._id}
      loading={loading}
      pagination={{ pageSize: 8 }}
    />
  );
};

export default ProductPage;
