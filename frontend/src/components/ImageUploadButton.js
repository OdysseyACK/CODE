import {
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function ImageUploadButton({ authToken }) {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const params = useParams();
  const { id: userId } = params;
  const fileInputRef = useRef(null);
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
      // Update the images state with the new uploaded image
      setImages((prevImages) => [...prevImages, data]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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
      <div>
        <div className="upload-btn-div">
          {" "}
          <MDBBtn className="mt-3 mb-3" onClick={toggleShow}>
            Upload images to build your Gallery!
          </MDBBtn>
        </div>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog size="sm">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Upload Photos</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <form onSubmit={submitImageHandler}>
                  <div className="form-group">
                    <MDBInput
                      type="file"
                      id="image"
                      accept="image/*"
                      ref={fileInputRef}
                      required
                      onChange={handleFileChange}
                    />
                  </div>
                  <MDBBtn
                    className="mt-4"
                    type="submit"
                    block
                    onClick={toggleShow}
                  >
                    Submit
                  </MDBBtn>
                </form>
              </MDBModalBody>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </div>

      <div className="vendor-gallery">
        {images.map((img) => (
          <div className="vcard-img" key={img._id}>
            <img src={img.image} alt={img.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
