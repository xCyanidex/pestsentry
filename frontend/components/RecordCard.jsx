import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useGetRecordByIdQuery } from "../slices/recordsSlice";
import { MutatingDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import placeHolderImage from "../src/assets/placeholder.png"

const RecordCard = ({ recordId }) => {

  const { data: record, isLoading, error } = useGetRecordByIdQuery(recordId);


  if (isLoading) return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
  );
  if (error) return <p>Error fetching record</p>;

  return (
    <>
      <Card style={{ width: "18rem" }}>
        {record.extermination.pictures[0] ? (
          <div className="ratio ratio-4x3 ">
            <Card.Img
              src={record.extermination.pictures[0]}
              variant="top"
              alt="site-image"
              className="object-fit-cover"
            />
          </div>
        ) : (
          <Card.Img
            variant="top"
            alt="site-image"
            className="object-fit-cover"
            src={placeHolderImage}
          />
        )}
        <Card.Body>
          <Card.Title
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {record?.structure.serviceType || "Record Title"}
          </Card.Title>
          <Card.Text
            style={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {record?.structure.address?.city ||
              "Some details about the record go here."}
          </Card.Text>
          <Link to={`/records/${record._id}`} className="btn my-4 btn-primary">
            View Details
          </Link>
          {/* <Button variant="primary">View Details</Button> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default RecordCard;
