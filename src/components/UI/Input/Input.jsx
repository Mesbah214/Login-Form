import PropTypes from "prop-types";
import classes from "./Input.module.css";

const Input = ({
  id,
  type,
  value,
  onChangeHandler,
  onBlurHandler,
  isValid,
  label,
}) => {
  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
      />
    </div>
  );
};

export default Input;

Input.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChangeHandler: PropTypes.func,
  onBlurHandler: PropTypes.func,
  isValid: PropTypes.bool,
};
