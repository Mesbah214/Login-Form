import PropTypes from "prop-types";
import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={`${classes.card} ${props.className}`}>{props.children}</div>
  );
};

export default Card;

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
};
