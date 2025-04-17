import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetRecordByIdQuery } from "../slices/recordsSlice";
import { MutatingDots } from "react-loader-spinner";

const RecordDetail = () => {
    const { id } = useParams();

    const {record,isLoading,error}=useGetRecordByIdQuery(id,{
        skip:!id
    });

console.log(record);
  return (
    <>
      {error ||
        (!record && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Oops! Something went wrong!.</h3>
          </div>
        ))}
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
      <Container className="my-4">
        <Row>
          <h1>Record Detail Page id is : {id}</h1>
        </Row>
      </Container>
    </>
  );
};

export default RecordDetail;
