import { ButtonLoad } from './Button.styled';

const Button = ({ onClick }) => {
  return (
    <ButtonLoad type="button" onClick={onClick}>
      Load More
    </ButtonLoad>
  );
};

export default Button;
