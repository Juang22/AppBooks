import "./CardBook.css";

import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardSubtitle,
  CardImg,
} from "reactstrap";
import { Accordion } from "react-bootstrap";

export function CardBook({ item }) {
  return (
    <Card className="card">
      <CardImg alt="Card image cap" src={item.url_image} top width="100%" />
      <CardBody className="card-content">
        <CardTitle tag="h5">{item.title}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {item.author} {item.release_year}
        </CardSubtitle>
        <CardText>
          <Accordion flush>
            <Accordion.Item eventKey="1" flush>
              <Accordion.Header>Description</Accordion.Header>
              <Accordion.Body>{item.description}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </CardText>
      </CardBody>
    </Card>
  );
}
