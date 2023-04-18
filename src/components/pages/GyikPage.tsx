import React from "react";
import "./Contact.css";
import ProfilePage from '../ProfilePage';

interface Props {
  authToken: string;
  onLogout: () => Promise<void>;
}

const GyikPage: React.FC<Props> = (props) => {
  const handleLogout = async () => {
    await props.onLogout();
  }

  
  return (
    <div><div>
        <button className="logoutbutton" onClick={handleLogout}>Kijelentkezés</button>
      </div>
      <div>
        <ProfilePage authToken={props.authToken} onLogout={props.onLogout} />
      </div>
    <div className="contact-page-container">
      
      <h1>GYIK</h1>
      <div className="contact-details">
        <p><h3>Mire jó a Fogj ki ha tudsz?</h3><div className="feher"> Az oldal lehetővé teszi a felhasználók számára,
         hogy elmenthessék az általuk kiválasztott helyeket a térképen, és megjegyzéseket fűzzenek hozzájuk a horgászattal kapcsolatosan.
         Az oldal tartalmaz egy térképet, egy naptárat, egy fogásinaplót, egy fogási rekord listát, és egy blog oldalt.</div></p>
      </div>
      <div className="contact-details">
        <p><h3>Mire jó a naptár?</h3><div className="feher"> A naptár lehetővé teszi a felhasználók számára,
         hogy elmenthessék az általuk kiválasztott eseményt a naptárba, elösször egy címet kell adni az eseménynek, majd utána meg adni hogy mettől meddig tartson az esemény.</div></p>
      </div>
      <div className="contact-details">
        <p><h3>Mire jó a fogásinapló?</h3><div className="feher"> A naptár lehetővé teszi a felhasználók számára,
         hogy elmenthessék az általuk kiválasztott eseményt a naptárba, elösször egy címet kell adni az eseménynek, majd utána meg adni hogy mettől meddig tartson az esemény.</div></p>
      </div>
      <div className="bug-report">
        <p>
          Ha bármilyen hibát vagy bugot találsz az oldalon, kérlek jelezd az
          alábbi e-mail címen:<a href="mailto:dominik.budavari@gmail.com" className="email-link">
          dominik.budavari@gmail.com
          </a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default GyikPage;
