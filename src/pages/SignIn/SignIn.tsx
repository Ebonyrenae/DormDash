import { useState } from "react";
import { useNavigate } from "react-router-dom";
import svgPaths from "../../../imports/svg-6s80u5z677";
import "./signin.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorMessage) {
      setErrorMessage("");
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch(
        "https://cattle.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api/login.php",
        {
          method: "POST",
          credentials: "include", // ⭐ REQUIRED FOR PHP SESSION COOKIE
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            identifier: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await res.json();
      if (data.success) {
  // ⭐ SAVE USER DATA TO LOCALSTORAGE AS A BACKUP
  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("userId", data.user.id.toString());
  localStorage.setItem("username", data.user.username);
  
  navigate("/dashboard");
} else {
  if (data.message === "user not found") {
    setErrorMessage("User email doesn't exist.");
  } else if (data.message === "invalid password") {
    setErrorMessage("Password is incorrect.");
  } else {
    setErrorMessage("Unable to sign in. Please try again.");
  }
}

      
    } catch (err) {
      setErrorMessage("Unable to sign in. Please try again.");
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        {/* Logo Header */}
        <div className="signin-logo">
          <h1 onClick={() => navigate("/")}>DormDash 🏃‍💨</h1>
          <p>College students helping college students</p>
        </div>

        {/* Sign In Card */}
        <div className="signin-card">
          <div className="card-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to DormDash</p>
          </div>

          <form className="signin-form" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">College Email</label>
              <div className="input-wrapper">
                <div className="input-icon">
                  <svg fill="none" viewBox="0 0 20 20">
                    <path
                      d={svgPaths.p166aa800}
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={svgPaths.p3f489440}
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@university.edu"
                  required
                />
              </div>
              <p className="input-hint">Must be a valid .edu email address</p>
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper input-wrapper-password">
                <div className="input-icon">
                  <svg fill="none" viewBox="0 0 20 20">
                    <path
                      d={svgPaths.pe80de00}
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d={svgPaths.p29959600}
                      stroke="#99A1AF"
                      strokeWidth="1.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="signin-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={0}
                >
                  {showPassword ? (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="signin-btn">
              Sign In
            </button>
            {errorMessage && <p className="signin-error">{errorMessage}</p>}
          </form>

          <div className="signin-footer">
            <p onClick={() => navigate("/signup")}>
              Don't have an account? Sign up
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
