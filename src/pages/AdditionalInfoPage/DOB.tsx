// AccountPage.tsx
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import "./DOB.css";


export default function DOB() {
    const navigate = useNavigate();

    const selectDob= localStorage.getItem("dob") || "";
    const selectmonth = localStorage.getItem("month") || "";
    const selectday = localStorage.getItem("day") || "";
    const selectyear = localStorage.getItem("year") || "";

    const [dob, setDob] = useState(selectDob);
    const [month, setMonth] = useState(selectmonth);
    const [day, setDay] = useState(selectday);
    const [year, setYear] = useState(selectyear);   
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const userId = localStorage.getItem("user_id");
    console.log("Current User ID from storage:", userId);
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
    const monthIndex = months.indexOf(month) + 1;
    const formattedMonth = monthIndex.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    const formattedDOB = (month && day && year) ? `${year}-${formattedMonth}-${formattedDay}` : null;
//remove this after testing
    const payload = { dob: formattedDOB, user_id: userId };
    console.log("SENDING TO PHP:", payload);

    

   

    {/* Sending data to the PHP API */}

    try{

         const dataSend= await fetch("https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api_Dob/DOB.php"
    ,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dob: formattedDOB, user_id: userId })
    });

    {/* Handling the response from the server and displaying appropriate messages based on the response status. */}
    const response = await dataSend.json();
    console.log("SERVER RESPONSE:", response);
    if (response.success) {
       
        setMessage('Sign up successful!');
        setIsSuccess(true);
        navigate("/gender");
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
                                    <select className="DOB-select" value={month} onChange={(e) => {
                                        setMonth(e.target.value);
                                        localStorage.setItem("month", e.target.value);
                                    }}>
                                    
                                    <option value=""></option>
                                    {months.map((m) => (
                                        <option key={m} value={m}>
                                        {m}</option>
                                    ))}
                                    </select>
                                </div>

                                <div className="field">
                                    <label className="field-label">Day</label>
                                    <select className="DOB-select" value={day} onChange={(e) => {
                                        setDay(e.target.value);
                                        localStorage.setItem("day", e.target.value);
                                    }}>
                                    <option value=""></option>
                                    {days.map((d) => (
                                        <option key={d} value={d}>
                                        {d}
                                        </option>
                                    ))}
                                    </select>
                                </div>

                                <div className="field">
                                    <label className="field-label">Year</label>
                                    <select className="DOB-select" value={year} onChange={(e) => {
                                        setYear(e.target.value);
                                        localStorage.setItem("year", e.target.value);
                                    }}>
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

               <p className="skip-text" onClick={() => navigate("/gender")}>Skip for now</p>
               
               
               </div>
           </form>
        );
}
