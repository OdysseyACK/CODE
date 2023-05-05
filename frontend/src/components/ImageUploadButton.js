import {
  MDBInput,
  MDBBtn,
  MDBCardImage,
  MDBCard,
  MDBCardOverlay,
  MDBCardText,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalFooter,
  MDBModalBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ImageUploadButton({ authToken }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const params = useParams();
  const { id: userId } = params;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data } = await axios.get(`/api/gallery/profilepage/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImages();
  }, [userId, authToken]);

  const submitImageHandler = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      image,
    };

    try {
      const { data } = await axios.post(
        `/api/gallery/profilepage/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);

      // Update the images state with the new uploaded image
      setImages((prevImages) => [...prevImages, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  return (
    <div>
      <form onSubmit={submitImageHandler}>
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            required
            onChange={handleFileChange}
          />
        </div>
        <div>
          <MDBBtn onClick={toggleShow}>LAUNCH DEMO MODAL</MDBBtn>
          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Modal title</MDBModalTitle>
                  <MDBBtn
                    className="btn-close"
                    color="none"
                    onClick={toggleShow}
                  ></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>Modal body text goes here.</MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={toggleShow}>
                    Close
                  </MDBBtn>
                  <MDBBtn>Save changes</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>
        </div>

        <MDBBtn type="submit" className="mb-4" block>
          Submit
        </MDBBtn>
      </form>
      <div className="vendor-gallery">
        {images.map((img) => (
          <MDBCard
            background="dark"
            className="text-white"
            key={img._id}
            style={{ height: "auto", width: "400px", margin: "5px" }}
          >
            <MDBCardImage overlay src={img.image} alt={img.name} />
          </MDBCard>
        ))}
      </div>

      {/* <div key={img._id}>
            <p>{img.name}</p>
            <img src={img.image} alt={img.name} />
          </div> */}
    </div>
  );
}
