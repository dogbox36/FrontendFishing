import React, { useState } from "react";
import "./ImageUpload.css";

interface Props {
  onImageSelected: (image: File | null, data: ImageData) => void;
}

interface ImageData {
  breed: string;
  weight: string;
  length: string;
  location: string;
}

const ImageUpload: React.FC<Props> = ({ onImageSelected }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [location, setLocation] = useState("");

  const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      const imageData: ImageData = {
        breed,
        weight,
        length,
        location,
      };
      onImageSelected(selectedFile, imageData);
      setSelectedFile(null);
      setBreed("");
      setWeight("");
      setLength("");
      setLocation("");
    }
  };

  return (
    <div className="image-upload">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileSelected}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Fajta"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Súly"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Hossz"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Hely"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="input-field">
          <button type="submit">Feltöltés</button>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
