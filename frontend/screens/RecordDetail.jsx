import { Col, Container, Image, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteRecordMutation, useGetRecordByIdQuery, useLazyGetReportQuery, useUpdateRecordMutation,  } from "../slices/recordsSlice";
import { ClipLoader } from "react-spinners";
import Carousel from "react-bootstrap/Carousel";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import placeHolderImage from "../src/assets/placeholder.png"
import Modal from "react-bootstrap/Modal";
import toast, { Toaster } from "react-hot-toast";
import { TypeAnimation } from "react-type-animation";

const RecordDetail = () => {
    const { id } = useParams();

  const navigate= useNavigate()

  const [updateRecord, { isLoading:isUpdating, isSuccess, isError, error:UpdatingError }] =
    useUpdateRecordMutation();

  const [deleteRecord,{isLoading:isDeleting,isSuccess:isDeleted,error:deletionError}] = useDeleteRecordMutation();


  const [trigger, result, lastPromiseInfo] = useLazyGetReportQuery();




  const {
    data: record,
    isLoading,
    error,
  } = useGetRecordByIdQuery(id, {
    skip: !id,
  });

  if (error) {
    navigate("/");
  }
    const [serviceType, setServiceType] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postal, setPostal] = useState("");
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [pesticideName, setPesticideName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");
    const [targetPest, setTargetPest] = useState("");
    const [method, setMethod] = useState("");
    const [exterminatorName, setExterminatorName] = useState("");
    const [exterminatorPhone, setExterminatorPhone] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [notes, setNotes] = useState("");
    const [report,setReport]=useState("");
    const [files, setFiles] = useState([]);
    const [animatedText, setAnimatedText] = useState("");

    const [startTyping, setStartTyping] = useState(false);

    const [delId,setDelId]=useState("");
    const [confirmDelModal,setConfirmDelModal]=useState(false);

  const { user } = useSelector((state) => state.auth);

      useEffect(() => {
        if (record) {
          setServiceType(record.structure?.serviceType || "");
          setStreet(record.structure?.address?.street || "");
          setCity(record.structure?.address?.city || "");
          setState(record.structure?.address?.state || "");
          setPostal(record.structure?.address?.postal || "");
          setLat(record.extermination?.coordinates?.latitude || "");
          setLong(record.extermination?.coordinates?.longitude || "");
          setDate(
               new Date(record.extermination.date).toISOString().split("T")[0]
            || "");
          setTime(record.extermination?.time || "");
          setPesticideName(record.extermination?.pesticideUsed?.name || "");
          setQuantity(record.extermination?.pesticideUsed?.quantity || "");
          setUnit(record.extermination?.pesticideUsed?.unit || "");
          setTargetPest(record.extermination?.targetPest || "");
          setMethod(record.extermination?.method || "");
          setExterminatorName(record.exterminator?.name || "");
          setExterminatorPhone(record.exterminator?.phone || "");
          setCustomerName(record.customer?.name || "");
          setCustomerPhone(record.customer?.phone || ""); // Fixed typo: cutomer -> customer
          setCustomerEmail(record.customer?.email || ""); // Fixed typo: cutomer -> customer
          setNotes(record.notes || "");
          setDelId(record._id.toString());
          setReport(record.exterminationReport);
        }
      }, [record]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude.toFixed(6));
        setLong(position.coords.longitude.toFixed(6));
      },
      (error) => {
        alert("Error fetching location: " + error.message);
      }
    );
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();
 
    const recordObject = {
      structure: {
        serviceType: serviceType,
        address: { street, city, state, postal },
      },
      extermination: {
        date,
        time,
        pesticideUsed: { name: pesticideName, quantity, unit },
        targetPest,
        method,
        coordinates: { longitude: long, latitude: lat },
      },
      exterminator: { name: exterminatorName, phone: exterminatorPhone },
      customer: {
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
      },
      notes,
      exterminatorId: user.userId,
      exterminationReport:report,
    };


    const formData = new FormData();
    formData.append("updatedRecord", JSON.stringify(recordObject));

    files.forEach((file) => {
      formData.append("pictures", file);
    });

  try {
    const res = await updateRecord({id,formData}).unwrap();
           toast("Record Update Successful.");
    console.log("Record added successfully:", res);
  } catch (err) {
    console.error("Error creating record:", err);
  }


  }


  const handleDelete= async (e)=>{
e.preventDefault();

try{
const res=await deleteRecord(delId);
console.log("Record Deleted Successfully",res);
navigate('/records?msg=delete');
}catch(err){
    console.error("Error deleting record:", err);
}

  }


  const confirmDelete=()=>{
setConfirmDelModal(true);
  }

  const handleClose = () => setConfirmDelModal(false);

  const writeReport=async ()=>{
    try{
 const res=await trigger(id);
 console.log(res);
  setReport(res.data?.report);
     setAnimatedText(res.data?.report);
  setStartTyping(true)
  console.log(res)
  console.log("Report Writing Successful.")
    }catch(error){
  console.log("Something went wrong",error);
    }
  }

    const handleTypingFinished = () => {
      setReport(animatedText); 
      setStartTyping(false); 
    };

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
      <Container className="my-4">
        <Row>
          <Col md={12} className="text-end">
            <Link to={"/records"} className="btn my-4 btn-primary">
              Go Back
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            {record?.extermination?.pictures?.length > 0 ? (
              <Carousel touch={true}>
                {record.extermination.pictures.map((picture, idx) => (
                  <Carousel.Item key={idx}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "400px",
                        overflow: "hidden",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <Image
                        src={picture}
                        rounded
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid black",
                }}
              >
                <Image src={placeHolderImage} alt="No Image" />
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={handleSubmit} className="my-4">
              <h2 className="text-center text-primary mb-4">
                Edit Extermination Record
              </h2>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Structure Type</Form.Label>
                    <Form.Control
                      required
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      placeholder="Resident, Restaurant, Building"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      required
                      value={postal}
                      onChange={(e) => setPostal(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      value={long}
                      onChange={(e) => setLong(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Button
                    variant="outline-secondary"
                    onClick={handleGetLocation}
                  >
                    Get Current Location
                  </Button>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Pesticide Name</Form.Label>
                    <Form.Control
                      required
                      value={pesticideName}
                      onChange={(e) => setPesticideName(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>Unit</Form.Label>
                    <Form.Control
                      required
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Target Pest</Form.Label>
                    <Form.Control
                      required
                      value={targetPest}
                      onChange={(e) => setTargetPest(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Method</Form.Label>
                    <Form.Control
                      value={method}
                      onChange={(e) => setMethod(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Exterminator Name</Form.Label>
                    <Form.Control
                      required
                      value={exterminatorName}
                      onChange={(e) => setExterminatorName(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Exterminator Phone</Form.Label>
                    <Form.Control
                      required
                      value={exterminatorPhone}
                      onChange={(e) => setExterminatorPhone(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                {/* Optional customer info */}
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Customer Phone</Form.Label>
                    <Form.Control
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Customer Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Upload Photos (max 3)</Form.Label>
                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const selectedFiles = Array.from(e.target.files);
                        if (selectedFiles.length > 3) {
                          alert("You can only upload up to 3 images.");
                          e.target.value = ""; // clear the input
                          setFiles([]); // reset state
                          return;
                        }
                        setFiles(selectedFiles);
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Extermination Report</Form.Label>
                    {/* <Form.Control 
                    value={report}
                    onChange={(e)=>setReport(e.target.value)}
                    as="textarea" rows={4} /> */}
                    {startTyping ? (
                      <div
                        style={{
                          whiteSpace: "pre-line",
                          marginTop: "20px",
                          border: "1px solid #ccc",
                          padding: "10px",
                          borderRadius: "8px",
                          minHeight: "100px",
                        }}
                      >
                        <TypeAnimation
                          sequence={[
                            animatedText,
                            800,
                            handleTypingFinished, // 👈 Callback after typing completes
                          ]}
                          wrapper="span"
                          cursor={true}
                          speed={50}
                          repeat={0}
                        />
                      </div>
                    ) : (
                      <Form.Control
                        className="mt-3"
                        as="textarea"
                        rows={6}
                        value={report}
                        onChange={(e) => setReport(e.target.value)}
                      />
                    )}
                    <Button
                      type="button"
                      onClick={writeReport}
                      variant="info"
                      className="my-2"
                    >
                      Write with AI
                    </Button>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="text-center">
                  <p style={{ color: "red" }}>
                    {isError && (
                      <p>
                        Error: {error?.data?.message || "Something went wrong"}
                        toast("Something went wrong.");
                      </p>
                    )}
                  </p>
                  <p>{isSuccess && <p>Record updated successfully!</p>}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    disabled={isDeleting}
                    variant="danger"
                    type="button"
                    className="w-100 my-4"
                    onClick={() => confirmDelete()}
                  >
                    {isDeleting ? <p>Deleting...</p> : "Delete Record"}
                  </Button>
                </Col>
                <Col>
                  <Button
                    disabled={isLoading}
                    variant="primary"
                    type="submit"
                    className="w-100 my-4"
                  >
                    {isUpdating ? "Submitting..." : "Update Record"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <Modal show={confirmDelModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Are you sure you want to delete this record?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>This record will be permanantly deleted.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <form onSubmit={handleDelete}>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Confirm
            </Button>
          </form>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </>
  );
};

export default RecordDetail;
