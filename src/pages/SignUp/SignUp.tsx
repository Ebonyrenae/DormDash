import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

/* ── Icons ── */
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="2"
      y="4"
      width="20"
      height="16"
      rx="2"
      stroke="#9ca3af"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 7l10 7 10-7"
      stroke="#9ca3af"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="3"
      y="11"
      width="18"
      height="11"
      rx="2"
      stroke="#9ca3af"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 11V7a5 5 0 0 1 10 0v4"
      stroke="#9ca3af"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="12"
      r="3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 1l22 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#29ac3d" />
    <path
      d="M8 12l3 3 5-6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SignUp = () => {
  const navigate = useNavigate();

  // Form values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Password match validation
    if (password !== confirm) {
      setConfirmError("Passwords do not match");
      return;
    }

    setConfirmError("");
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://aptitude.cse.buffalo.edu/CSE442/2026-Spring/cse-442i/api/SignUpPage.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: name, // ⭐ important
            email: email,
            password: password,
          }),
        },
      );

      const data = await res.json();
      console.log(data);

      if (data.success) {
        setSuccess(true);

        // ⭐ redirect to SIGN IN after success
        setTimeout(() => navigate("/signin"), 1400);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmChange = (val: string) => {
    setConfirm(val);
    if (confirmError) setConfirmError("");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Logo */}
        <div className="signup-logo">
          <h1 onClick={() => navigate("/")}>DORMDASH 🏃‍💨💨</h1>
          <p>College students helping college students</p>
        </div>

        {/* Card */}
        <div className="signup-card">
          {/* ── Success state ── */}
          {success ? (
            <div className="signup-success">
              <div className="signup-success-icon">
                <CheckCircleIcon />
              </div>
              <p className="signup-success-text">
                Account created successfully
              </p>
            </div>
          ) : (
            <>
              <div className="signup-header">
                <h2>Create Account</h2>
                <p>Sign up with your .edu email to get started</p>
              </div>

              <form className="signup-form" onSubmit={handleSubmit} noValidate>
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="su-name">Full Name</label>
                  <input
                    id="su-name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>

                {/* College Email */}
                <div className="form-group">
                  <label htmlFor="su-email">College Email</label>
                  <div className="input-with-icon">
                    <span className="input-icon">
                      <MailIcon />
                    </span>
                    <input
                      id="su-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                  <p className="input-hint">
                    Must be a valid .edu email address
                  </p>
                </div>

                {/* Password */}
                <div className="form-group">
                  <label htmlFor="su-password">Password</label>
                  <div className="input-with-icon input-with-eye">
                    <span className="input-icon">
                      <LockIcon />
                    </span>
                    <input
                      id="su-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className="eye-toggle-btn"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                {/* Re-enter Password */}
                <div className="form-group">
                  <label htmlFor="su-confirm">Re-enter Password</label>
                  <div className="input-with-icon input-with-eye">
                    <span className="input-icon">
                      <LockIcon />
                    </span>
                    <input
                      id="su-confirm"
                      type={showConfirm ? "text" : "password"}
                      className={confirmError ? "input-error" : ""}
                      value={confirm}
                      onChange={(e) => handleConfirmChange(e.target.value)}
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className="eye-toggle-btn"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={
                        showConfirm ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {confirmError && (
                    <p className="input-hint-error">{confirmError}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="signup-btn"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </button>
              </form>

              {/* Sign in link */}
              <div className="signup-footer">
                <p onClick={() => navigate("/signin")}>
                  Already have an account? Sign in
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
