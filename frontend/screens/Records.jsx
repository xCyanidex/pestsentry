import { useSelector } from "react-redux";
import { useGetRecordsByUserQuery } from "../slices/recordsSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import RecordCard from "../components/RecordCard";
import { Link } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";

const Records = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: records,
    isLoading,
    error,
  } = useGetRecordsByUserQuery(user?.userId, {
    skip: !user?.userId,
  });

  return (
    <Container className="my-4">
      <Row>
        <Col md={12} className="text-end">
          <Link to={"/records/create"} className="btn my-4 btn-primary">
            Add a new record
          </Link>
          {/* <Button className="btn-primary my-4">Add a New Record</Button> */}
        </Col>
      </Row>
      <Row>
        {isLoading && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#0d6efd"
                secondaryColor="#0d6efd"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          </>
        )}
        {error && <p>Error fetching records</p>}
        {records && records.length === 0 ? (
          <h2>No records found</h2>
        ) : (
          records?.map((record) => (
            <Col key={record.structure} md={4} className="mb-4">
              <RecordCard recordId={record._id} />
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Records;
