import { useState } from "react";
import React from "react";
import "./SignUp.css";
import { FiEdit3 } from "react-icons/fi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [fullname, setFullname] = useState<string>("");

    const [message, setMessage] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [allFields, setAllFields] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!fullname || !email || !password || !confirmPassword) {
            setAllFields("All fields are required");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
            return;
        } else {
            setEmailError("");
        }

        if (!email.endsWith(".edu")) {
            setEmailError("Please use a college email address (.edu)");
            return;
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
            return;
        } else {
            setPasswordError("");
        }

        if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match");
            return;
        } else {
            setConfirmPasswordError("");
        }

    try {
      const dataSend = await fetch(
        "https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api/SignUpPage.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ⭐ in case we want to set cookies in the future
          body: JSON.stringify({
            username: fullname, // ⭐ important
            email: email,
            password: password,
          }),
        },
      );

            const response = await dataSend.json();

            if (response.success) {

                setMessage("Sign up successful!");
                setIsSuccess(true);
                localStorage.setItem("user_id", response.user_id);
                navigate("/dob");
            } else {
                setMessage(response.message || "Sign up failed. Please try again.");
                setIsSuccess(false);
            }

        } catch (error) {
            console.error("Error during sign up:", error);
            setMessage("Server error occurred.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="SignUP-container">

                <h2 className="signup-heading">
                    DORMDASH 🏃‍♂️
                </h2>

                <p className="text-below">
                    College students helping college students
                </p>

                <div className="form-container">
                    <p className="form-textp">Create Account</p>

                    <p className="form-texts">
                        Sign up with your .edu email to get started
                    </p>

       

                   

                    <p className="form-fullnames">Full Name</p>
                    <input
                        type="text"
                        className="form-input"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        placeholder="Enter your full name"
                    />

                    <p className="form-names">College Email</p>
                    <input
                        type="text"
                        className="form-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@university.edu"
                    />

                    {emailError && (
                        <p className="error-text">{emailError}</p>
                    )}

                    <p className="form-names">Password</p>

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-inputpassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            onBlur={() => {
                                if (password.length < 8) {
                                    setPasswordError("Password must be at least 8 characters");
                                } else {
                                    setPasswordError("");
                                }
                            }}
                        />

                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </span>
                    </div>

                    {passwordError && (
                        <p className="error-text3">{passwordError}</p>
                    )}

                    <p className="form-names">Confirm Password</p>

                    <div className="password-wrapper">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-inputpassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            onBlur={() => {
                                if (confirmPassword !== password) {
                                    setConfirmPasswordError("Passwords do not match");
                                } else {
                                    setConfirmPasswordError("");
                                }
                            }}
                        />

                        <span
                            className="eye-icon"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        >
                            {showConfirmPassword ? (
                                <FiEyeOff />
                            ) : (
                                <FiEye />
                            )}
                        </span>
                    </div>

                    <div className="error-container">
                          
                          {confirmPasswordError && (
                        <p className="error-text">
                            {confirmPasswordError}
                        </p>
                    )}

                    {message && (
                        <p
                            className={
                                isSuccess
                                    ? "success-text"
                                    : "error-text"
                            }
                        >
                            {message}
                        </p>
                    )}

                     {allFields && (
                        <p className="error-text">{allFields}</p>
                    )}

                    




                    </div>

                  

                    <button
                        type="submit"
                        className="form-button"
                    >
                        Sign Up
                    </button>

                    <p onClick={() => navigate("/signin")} className="form-loginNav">

                        Already have an account? Sign in
                    </p>
                </div>

                <div className="form-containerSecond">
                    <p className="form-textp">
                        Why DormDash?
                    </p>

                    <div className="checkMark">
                        <p style={{ color: "#29AC3D" }}>✓</p>
                        <p>
                            Connect with fellow students for help
                        </p>
                    </div>

                    <div className="checkMark">
                        <p style={{ color: "#29AC3D" }}>✓</p>
                        <p>
                            Earn money by sharing your skills
                        </p>
                    </div>

                    <div className="checkMark">
                        <p style={{ color: "#29AC3D" }}>✓</p>
                        <p>
                            Safe and verified .edu community
                        </p>
                    </div>
                </div>

            </div>
        </form>
    );
}
