import "./CategoryItem.css";

const CategoryItem = ({ image, title }) => {
  return (
    <li className="category-item">
      <a href="#">
        <img
          src={image}
          alt={title}
          className="category-image"
        />
        <span className="category-title">{title}</span>
      </a>
    </li>
  );
};

export default CategoryItem;
