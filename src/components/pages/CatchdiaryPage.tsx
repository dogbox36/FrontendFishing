import React, { useState } from "react";
import ProfilePage from '../ProfilePage';
import "./Catch.css";

interface Fish {
  species: string;
  weight: number;
  length: number;
  location: string;
}

interface Props {
  authToken: string;
  onLogout: () => Promise<void>;
}

const speciesOptions = ["Ponty", "Harcsa", "Keszeg", "Csuka"];

const CatchdiaryPage: React.FC<Props> = ({ authToken, onLogout }) => {
  const [fishList, setFishList] = useState<Fish[]>([]);
  const [currentFish, setCurrentFish] = useState<Fish>({
    species: "",
    weight: 0,
    length: 0,
    location: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentFish({ ...currentFish, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentFish({ ...currentFish, species: event.target.value });
  };

  const handleLogSave = () => {
    const newFish = { ...currentFish };
    setFishList([...fishList, newFish]);
    setCurrentFish({
      species: "",
      weight: 0,
      length: 0,
      location: "",
    });
  };

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
        
    <div className="catch-diary-container">
      <h1 className="kozepre">Fogásnapló</h1>
      <div className="catch-diary-form-container">
        <h2 className="catch-diary-form-heading">Fogás rögzítése</h2>
        <label htmlFor="species" className="catch-diary-form-label">Fajta:</label>
        <select name="species" id="species" className="catch-diary-form-select" onChange={handleSelectChange}>
          <option value="">-- Válassz --</option>
          {speciesOptions.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>
        <br />
        <label htmlFor="weight" className="catch-diary-form-label">Súly (kg):</label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={currentFish.weight}
          onChange={handleInputChange}
          className="catch-diary-form-input"
        />
        <br />
        <label htmlFor="length" className="catch-diary-form-label">Hosszúság (cm):</label>
        <input
          type="number"
          id="length"
          name="length"
          value={currentFish.length}
          onChange={handleInputChange}
          className="catch-diary-form-input"
        />
        <br />
        <label htmlFor="location" className="catch-diary-form-label">Helyszín:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={currentFish.location}
          onChange={handleInputChange}
          className="catch-diary-form-input"
        />
        <br />
<button className="catch-diary-form-save-button" onClick={handleLogSave}>
Rögzítés
</button>
</div>
<div className="catch-diary-list-container">
<h2 className="catch-diary-list-heading">Rögzített fogások:</h2>
{fishList.length === 0 ? (
<p className="catch-diary-empty-list">Nincs rögzített fogás.</p>
) : (
<ul className="catch-diary-list">
{fishList.map((fish, index) => (
<li key={index}>
<span className="catch-diary-list-item">{fish.species}</span>
<span className="catch-diary-list-item">{fish.weight} kg</span>
<span className="catch-diary-list-item">{fish.length} cm</span>
<span className="catch-diary-list-item">{fish.location}</span>
</li>
))}
</ul>
)}
</div>
</div></div>
);
};

export default CatchdiaryPage;
         
