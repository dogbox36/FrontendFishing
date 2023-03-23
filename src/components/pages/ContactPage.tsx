import React from "react";
import "./Contact.css";
import ProfilePage from '../ProfilePage';

interface Props {
  authToken: string;
  onLogout: () => Promise<void>;
}

const ContactPage: React.FC<Props> = (props) => {
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
      
      <h1>Elérhetőségek</h1>
      <div className="contact-details">
        <p>Android alkalmazásfejlesztő:<div className="feher"> Moravcsik Márk</div></p>
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

export default ContactPage;
