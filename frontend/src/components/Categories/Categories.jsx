import CategoryItem from "./CategoryItem";
import "./Categories.css";

const Categories = () => {
  const categories = [
    { image: "img/categories/categories1.png", title: "Kupa" },
    { image: "img/categories/categories2.png", title: "Fincan" },
    { image: "img/categories/categories3.png", title: "Vazo" },
    { image: "img/categories/categories4.png", title: "Kase" },
    { image: "img/categories/categories5.png", title: "Biblo" },
    { image: "img/categories/categories6.png", title: "Takı Standı" },
  ];

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>All Categories</h2>
          <p>Summer Collection New Modern Design</p>
        </div>
        <ul className="category-list">
          {categories.map((category, index) => (
            <CategoryItem key={index} image={category.image} title={category.title} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Categories;