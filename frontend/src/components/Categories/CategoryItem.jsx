import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./CategoryItem.css";

const CategoryItem = ({ category }) => {
  return (
    <li className="category-item">
      <Link to={`/category/${category._id}`}>
        <img src={category.img} alt="" className="category-image" />
        <span className="category-title">{category.name}</span>
      </Link>
    </li>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.object,
};

export default CategoryItem;

