import { useSelector } from "react-redux";
import { useGetRecordsByUserQuery } from "../slices/recordsSlice";
import { Container, Row, Col, Button } from "react-bootstrap";
import RecordCard from "../components/RecordCard";
import { Link, useLocation } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Records = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: records,
    isLoading,
    error,
  } = useGetRecordsByUserQuery(
    user?.userId,
    {
      skip: !user?.userId,
      refetchOnMountOrArgChange: true,
    },
  );


      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const msg = queryParams.get("msg");

        useEffect(() => {
          if (msg === "delete") {
         toast("Record Delete Successful.");
          }else if (msg==="created") {
                     toast("Record Creation Successful.");
          }
        }, [msg]);

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
              <ClipLoader
                // color={color}
                // loading={loading}
                // cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          </>
        )}
        {error && <p>Error fetching records</p>}
        {records && records.length === 0 ? (
          <div style={{height:"65vh",display:"flex",textAlign:"center",justifyContent:"center",alignItems:"center"}}>
            <h2>No records found</h2>
          </div>
        ) : (
          records?.map((record) => (
            <Col key={record._id} md={4} className="mb-4">
              <RecordCard recordId={record._id} />
            </Col>
          ))
        )}
      </Row>
      <Toaster />
    </Container>
  );
};

export default Records;
