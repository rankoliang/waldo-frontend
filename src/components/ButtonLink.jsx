import { Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';

const ButtonLink = ({ children, ...props }) => {
  return (
    <Button renderAs={Link} {...props}>
      {children}
    </Button>
  );
};

export default ButtonLink;
