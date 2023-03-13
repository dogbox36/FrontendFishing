import React from "react";
import ProfilePage from '../ProfilePage';
import "./Image.css";

interface ImageData {
  breed: string;
  weight: string;
  length: string;
  location: string;
}

interface Props {
  authToken: string;
  onLogout: () => Promise<void>;
}

interface Image {
  id: number;
  src: string;
  alt: string;
  data: ImageData;
}

const images: Image[] = [
  {
    id: 1,
    src: 'https://pecaverzum.hu/upload/articles/thumb_850x565_crop3_80/105.harcsanyito.jpg',
    alt: 'Harcsa',
    data: {
      breed: 'Harcsa',
      weight: '30 kg',
      length: '1 m',
      location: 'Beach'
    }
  },
  {
    id: 2,
    src: 'https://pecaverzum.hu/upload/articles/thumb_850x565_crop3_80/105.harcsanyito.jpg',
    alt: 'hal',
    data: {
      breed: 'harcsa',
      weight: '5 kg',
      length: '0.5 m',
      location: 'Living Room'
    }
  },
  {
    id: 3,
    src: 'https://pecaverzum.hu/upload/articles/thumb_850x565_crop3_80/105.harcsanyito.jpg',
    alt: 'harcsa',
    data: {
      breed: 'harcsa',
      weight: '500 kg',
      length: '2 m',
      location: 'Meadow'
    }
  }
];

const Images: React.FC<Props> = ({ authToken, onLogout }) => {
  const handleLogout = async () => {
    await onLogout();
  }

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
          <img src={image.src} alt={image.alt} />
          <div className="catch-image-data">
            <p>Fajta: {image.data.breed}</p>
            <p>Súly: {image.data.weight}</p>
            <p>Hossz: {image.data.length}</p>
            <p>Hely: {image.data.location}</p>
          </div>
        </div>
      ))}
      </div>
      </div>
      </div>
  );
};

export default Images;
