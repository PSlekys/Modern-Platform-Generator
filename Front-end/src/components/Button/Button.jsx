import React from "react";
import * as S from "./Button.style";
import PropTypes from "prop-types";

function Button({ children, handleClick, color }) {
  return (
    <S.Button onClick={handleClick} color={color}>
      {children}
    </S.Button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.func,
  color: PropTypes.string,
};

export default Button;
