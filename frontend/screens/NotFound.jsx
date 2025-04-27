import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound=()=>{
    return (
      <>
        <Container>
          <Row className="text-center" style={{height:"100vh",alignItems:"center"}}>
            <Col>
              <h5>
                Once upon a midnight dreary, While I web surfed, weak and weary,
              </h5>
              <h4>
                For pages long forgotten yore. When I clicked my fav'rite href,
              </h4>
              <h3>
                Suddenly there came a warning, Mourning for my dear /missing.pdf
              </h3>
              <h2>
                "Tis not possible!",I muttered, "Give thine pages, I emplore!"
              </h2>
              <h1>Quoth the server, 404.</h1>
              <Link className="btn btn-primary" to={"/records"}>Go Home</Link>
            </Col>
          </Row>
          
        </Container>
      </>
    );
}

export default NotFound;