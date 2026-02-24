import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Gender.css";


export default function Gender() {
  const navigate = useNavigate();
  const [selectedGender, setSelectedGender] = useState("");
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const userId = 2; // 👈 temporary testing user



  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); //  Stops page refresh
  
      {/* Sending data to the PHP API */}
  
      try{
  
           const dataSend= await fetch("https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api_Dob/Onboarding.php"
      ,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({  selectedGender, userId })
      });
  
      {/* Handling the response from the server and displaying appropriate messages based on the response status. */}
      const response = await dataSend.json();
      if (response.success) {
        
          setMessage('Saved successfully!');
          setIsSuccess(true)
          navigate("/academic-info");
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
      <h2 className="Gender-heading">Gender</h2>

      <div className="gender-container">
        {/* Female FIRST */}
        <div
          className={`gender-option ${
            selectedGender === "Female" ? "selected" : ""
          }`}
          onClick={() => setSelectedGender("Female")}
        >
          <span className="gender-emoji">👩</span>
          <p>Female</p>
        </div>

        <div
          className={`gender-option ${
            selectedGender === "Male" ? "selected" : ""
          }`}
          onClick={() => setSelectedGender("Male")}
        >
          <span className="gender-emoji">👨</span>
          <p>Male</p>
        </div>
      </div>

      <div className="bottom-section">

  <div className="buttons-row">
    <p
      className="previous-text"
      onClick={() => navigate("/")}
    >
      Previous
    </p>
    <button
    className="button-n"
    type="submit"
     >
      Next Step
    </button>
  </div>

  <p
    className="skip-text"
    onClick={() => navigate("/academic-info")}
  >
    Skip for now
  </p>

</div>
      {message && <p>{message}</p>}
    </div>
         
         
         
         </form>
    
  );
}