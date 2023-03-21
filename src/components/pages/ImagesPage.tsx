import React, { useEffect, useState } from "react";
import ProfilePage from '../ProfilePage';
import "./Image.css";
import ImageUpload from "./ImageUpload";

interface ImageData {
  id: number;
  breed: string;
  weight: string;
  length: string;
  location: string;
  src: string;
}

interface Props {
  authToken: string;
  onLogout: () => Promise<void>;
}

const ImagesPage: React.FC<Props> = ({ authToken, onLogout }) => {
  const [images, setImages] = useState<ImageData[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("http://localhost:3000/images/info", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const images = await response.json();
      setImages(images);
    };
    fetchImages();
  }, [authToken]);

  const handleLogout = async () => {
    await onLogout();
  };

const handleImageSelected = async (image: File | null) => {
  if (!image) {
    return;
  }

  const formData = new FormData();
  formData.append("image", image);

  // Az új adatokat is hozzáadjuk a form adatokhoz
  formData.append("breed", "");
  formData.append("weight", "");
  formData.append("length", "");
  formData.append("location", "");

  const response = await fetch("http://localhost:3000/images/add", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });

  if (response.ok) {
    const imageData = await response.json();
    // Az új képet és az összes adatot hozzáadjuk a tömbhöz
    setImages((prevState) => [...prevState, imageData]);
  } else {
    console.error("Error uploading image");
  }
};

  

  return (
    <div>
      <div>
        <button className="logoutbutton" onClick={handleLogout}>Logout</button>
      </div>
      <div>
        <ProfilePage authToken={authToken} onLogout={onLogout} />
      </div>
      <div className="catch-container">
        <div className="catch-images">
          {images.map((image) => (
            <div key={image.id} className="catch-image">
              <img src={image.src}/>
              <div className="catch-image-data">
                <p>Fajta: {image.breed}</p>
                <p>Súly: {image.weight}</p>
                <p>Hossz: {image.length}</p>
                <p>Hely: {image.location}</p>
              </div>
            </div>
          ))}
          <div className="catch-image">
            <ImageUpload onImageSelected={handleImageSelected} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesPage;
