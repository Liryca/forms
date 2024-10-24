import ListGroup from "react-bootstrap/ListGroup";

const List = () => {
  return (
    <ListGroup as="ol" numbered>
      <p>You can add:</p>
      <ListGroup.Item> up to 4 single lines</ListGroup.Item>
      <ListGroup.Item> up to 4 long-term texts </ListGroup.Item>
      <ListGroup.Item> up to 4 positive integers</ListGroup.Item>
      <ListGroup.Item> up to 4 checkboxes.</ListGroup.Item>
    </ListGroup>
  );
};

export default List;
