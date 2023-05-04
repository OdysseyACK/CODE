import React, { useState } from "react";

export default function UploadImage() {
  const [image, setImage] = useState("");

  function covertToBase64(e) {
    console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("error: ", error);
    };
  }

  function imageUpload() {
    fetch("/uploadimage", {
      method: "POST",
      crossDomain: true,
      Headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        base64: image,
      })
        .then((res) => res.json())
        .then((data) => console.log(data)),
    });
  }

  return (
    <div>
      <input accept="image/*" type="file" onChange={covertToBase64} />
      {image == "" || image == null ? "" : <img src={image} alt="" />}
      <button onClick={imageUpload}>Upload</button>
    </div>
  );
}
