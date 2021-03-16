import { Container, Hero, Heading } from 'react-bulma-components';

const ErrorBoundary = ({ error, children }) => {
  if (error) {
    return (
      <Hero color="danger">
        <Hero.Body>
          <Container>
            <Heading>{error.code}</Heading>
            <Heading subtitle size={4}>
              {error.message}
            </Heading>
          </Container>
        </Hero.Body>
      </Hero>
    );
  } else {
    return children;
  }
};

export default ErrorBoundary;
