import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {usePostRecordsMutation} from "../slices/recordsSlice"
import { useSelector } from "react-redux";

const NewRecord = () => {

  const navigate=useNavigate()

const [postRecord, { isLoading, isSuccess, isError, error }] =
  usePostRecordsMutation();

  const { user } = useSelector((state) => state.auth);


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
  const [files, setFiles] = useState([]);



// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append("userId", user.userId);
//   formData.append("type", type);
//   formData.append("street", street);
//   formData.append("city", city);
//   formData.append("state", state);
//   formData.append("postal", postal);
//   formData.append("lat", lat);
//   formData.append("long", long);
//   formData.append("date", date);
//   formData.append("time", time);
//   formData.append("pesticideName", pesticideName);
//   formData.append("quantity", quantity);
//   formData.append("unit", unit);
//   formData.append("targetPest", targetPest);
//   formData.append("method", method);
//   formData.append("exterminatorName", exterminatorName);
//   formData.append("exterminatorPhone", exterminatorPhone);
//   formData.append("customerName", customerName);
//   formData.append("customerPhone", customerPhone);
//   formData.append("customerEmail", customerEmail);
//   formData.append("notes", notes);

//   // Add each selected file
//   files.forEach((file) => {
//     formData.append("pictures", file); // field name should match multer config
//   });

//   try {
//     const res = await postRecord(formData).unwrap();
//     console.log("Record added successfully:", res);
//   } catch (err) {
//     console.error("Error creating record:", err);
//   }
// };


const handleSubmit = async (e) => {
  e.preventDefault();

const recordObject = {
  structure: {
    serviceType: serviceType,
    address: { street, city, state, postal },
  },
  extermination: {
    date,
    time,
    pesticideUsed: { name:pesticideName, quantity, unit },
    targetPest,
    method,
    coordinates: { longitude: long, latitude:lat },
  },
  exterminator: { name: exterminatorName, phone: exterminatorPhone },
  customer: { name: customerName, phone: customerPhone, email: customerEmail },
  notes,
  exterminatorId: user.userId, // Externally passed exterminatorId
};


    const formData = new FormData();
    formData.append("record", JSON.stringify(recordObject));

    files.forEach((file) => {
      formData.append("pictures", file);
    });

  try {
    const res = await postRecord(formData).unwrap();
    console.log("Record added successfully:", res);
    navigate("/records?msg=created");
  } catch (err) {
    console.error("Error creating record:", err);
  }
};


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

  return (
    <Container>
      <Row>
        <Col md={12} className="text-end">
          <Link to={"/records"} className="btn my-4 btn-primary">
            Go Back
          </Link>
        </Col>
      </Row>
      <Form onSubmit={handleSubmit} className="my-4">
        <h2 className="text-center text-primary mb-4">
          New Extermination Record
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
            <Button variant="outline-secondary" onClick={handleGetLocation}>
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
            
          </Col>
        </Row>
        <Row>
          <Col md={12} className="text-center">
            <p style={{ color: "red" }}>
              {isError && (
                <p>Error: {error?.data?.message || "Something went wrong"}</p>
              )}
            </p>
            <p>{isSuccess && <p>Record added successfully!</p>}</p>
          </Col>
        </Row>

        <Button
          disabled={isLoading}
          variant="primary"
          type="submit"
          className="w-100"
        >
          {isLoading ? "Submitting..." : "Submit Record"}
        </Button>
      </Form>
    </Container>
  );
};

export default NewRecord;
