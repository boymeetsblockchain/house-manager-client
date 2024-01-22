import React, { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const uploadImageToFirebaseStorage = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected for upload");
        return;
      }

      const storage = getStorage();
      const storageRef = ref(storage, `images/${selectedFile.name}`);
      const snapshot = await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImageUrl(downloadURL);
    } catch (error) {
      console.error("Error uploading image to Firebase Storage:", error);
    }
  };

  return (
    <div>
      {/* File input field */}
      <input type="file" onChange={handleFileChange} />

      {/* Upload button */}
      <button onClick={uploadImageToFirebaseStorage}>Upload Image</button>

      {/* Display the image URL if available */}
      {imageUrl && (
        <div>
          <p>Image URL:</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
