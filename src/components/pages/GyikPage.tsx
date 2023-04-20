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
        <p><h3>Mire jó a naptár?</h3><div className="feher"> A naptár lehetővé teszi a felhasználók számára,
         hogy elmenthessék az általuk kiválasztott eseményt a naptárba, elösször egy címet kell adni az eseménynek, majd utána meg adni hogy mettől meddig tartson az esemény.</div></p>
      </div>
      <div className="contact-details">
        <p><h3>Mire jó a fogásinapló?</h3><div className="feher">
           A fogási napló oldalon lehetőség van a fogások rögzítésére.
            A felhasználónak meg kell adnia a hal fajtáját, a súlyát és méretét, valamint azt, hogy hol fogta azt.</div></p>
      </div>
      <div className="contact-details">
        <p><h3>Mire jó a Blog?</h3><div className="feher">
           A blog oldalon számos hasznos tipp és tanács található a horgászathoz, a halászathoz és a halak feldolgozásához.
           </div></p>
      </div>
      <div className="contact-details">
        <p><h3>Mire jó a elérhetőség?</h3><div className="feher">
           Az elérhetőség oldalon a fejlesztők elérhetők, hogy a felhasználók jelezni tudják, ha bármilyen problémába ütköznek az oldal használata során.</div></p>
      </div>
    </div>
    </div>
  );
};

export default GyikPage;
