import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Location.css";

export default function Location() {
  const navigate = useNavigate();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const userId = 2; // 👈 temporary testing user

  const cities = ["Buffalo", "New York", "Chicago", "Miami"];
  const states = ["NY", "CA", "TX", "FL"];

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); //  Stops page refresh
  
      {/* Sending data to the PHP API */}
  
      try{
  
           const dataSend= await fetch("https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api_Dob/Location.php"
      ,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ street, city, zip, state, userId })
      });
  
      {/* Handling the response from the server and displaying appropriate messages based on the response status. */}
      const response = await dataSend.json();
      if (response.success) {
          setMessage('Saved successfully!');
          setIsSuccess(true)
          navigate("/dashboard");
      } else {
          setMessage(response.message || 'Failed to save. Please try again.');
          setIsSuccess(false);
      }
      
       }
  
       catch(error){
          console.error("Error during sign up:", error);
      }
  }




  return (

     <form onSubmit={handleSubmit}>
        <div className="Outer-container">

      <h2 className="address-heading">Address</h2>

      <p className="address-text">
        Where should DormDashers deliver to you?
      </p>

      {/* Street Address */}
      <div className="input-full">
        <input
          type="text"
          placeholder="Street Address"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          className="address-input"
        />
      </div>

      {/* City + Zip */}
      <div className="row">
        <select
          className="small-dropdown"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="">City</option>
          {cities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="small-input"
        />
      </div>

      {/* State */}
      <div className="input-full">
        <select
          className="address-input"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Bottom Buttons */}
      <div className="bottom-section">
        <div className="buttons-row">
          <p
            className="previous-text"
            onClick={() => navigate("/academic-info")}
          >
            Previous
          </p>

          <button
                type="submit"
            className="button-n"
          >
            Get Dashing
          </button>
        </div>

        <p
          className="skip-text"
          onClick={() => navigate("/dashboard")}
        >
          Skip for now
        </p>
      </div>

      {message && <p>{message}</p>}

    </div>

    



     </form>
    
  );
}