// AccountPage.tsx
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./DOB.css";
import Gender from "./Gender";

export default function DOB() {
    const navigate = useNavigate();

    const [dob, setDob] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");   
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const userId = 2; // 👈 temporary testing user
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
        ];
    
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const currentYear = new Date().getFullYear();

    const years = Array.from(
        { length: currentYear - 1900 + 1 },
        (_, i) => 1900 + i
    );

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //  Stops page refresh
     // ✅ Format proper date
    const formattedDOB = `${year}-${month}-${day}`;

   

    {/* Sending data to the PHP API */}

    try{

         const dataSend= await fetch("https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api_Dob/DOB.php"
    ,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dob: formattedDOB, userId })
    });

    {/* Handling the response from the server and displaying appropriate messages based on the response status. */}
    const response = await dataSend.json();
    if (response.success) {
        navigate("/gender");
        setMessage('Sign up successful!');
        setIsSuccess(true)
    } else {
        setMessage(response.message || 'Sign up failed. Please try again.');
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
                <h2 className="DOB-heading">Date Of Birth </h2>
                <p className="text-below">We need your date of birth to verify you're age</p>

                <div className="dropdown-container">

                                <div className="field">
                                    <label className="field-label">Month</label>
                                    <select className="DOB-select">
                                    <option value=""></option>
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                        {month}
                                        </option>
                                    ))}
                                    </select>
                                </div>

                                <div className="field">
                                    <label className="field-label">Day</label>
                                    <select className="DOB-select">
                                    <option value=""></option>
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                        {day}
                                        </option>
                                    ))}
                                    </select>
                                </div>

                                <div className="field">
                                    <label className="field-label">Year</label>
                                    <select className="DOB-select">
                                    <option value=""></option>
                                    {years.map((year) => (
                                        <option key={year} value={year}>
                                        {year}
                                        </option>
                                    ))}
                                    </select>
                                </div>
                                </div>
                <div className="button-container">
                    <button className="button-n" type='submit' >Next Step</button>
                    
                    </div>

               <p className="skip-text" onClick={() => navigate("/Gender")}>Skip for now</p>
               
               
               </div>
           </form>
        );
}
