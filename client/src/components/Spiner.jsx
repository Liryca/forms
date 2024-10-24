import { Container, Spinner } from "react-bootstrap";
const SpinerLoader = () => {
  return (
    <Container>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Spinner />
      </div>
    </Container>
  );
};

export default SpinerLoader;
