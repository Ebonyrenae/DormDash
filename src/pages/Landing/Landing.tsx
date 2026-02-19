import { useNavigate } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-content">
          <div className="nav-logo" onClick={() => navigate('/')}>🏃‍💨 DormDash</div>
          <button className="nav-signin" onClick={() => navigate('/signin')}>Sign In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-left">
            <div className="verified-badge">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M13.3319 8.66573C13.3319 11.9987 10.9988 13.6652 8.22578 14.6317C8.08056 14.6809 7.92283 14.6786 7.77916 14.6251C4.99946 13.6652 2.66638 11.9987 2.66638 8.66573V3.99957C2.66638 3.82278 2.7366 3.65322 2.86162 3.52822C2.98663 3.4032 3.15618 3.33297 3.33297 3.33297C4.66616 3.33297 6.33264 2.53306 7.49252 1.51984C7.63374 1.39918 7.81339 1.33289 7.99913 1.33289C8.18487 1.33289 8.36452 1.39918 8.50575 1.51984C9.67228 2.53972 11.3321 3.33297 12.6653 3.33297C12.8421 3.33297 13.0116 3.4032 13.1367 3.52822C13.2617 3.65322 13.3319 3.82278 13.3319 3.99957V8.66573Z" stroke="#29AC3D" strokeWidth="1.33319" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Verified .edu students only</span>
            </div>

            <h1 className="hero-title">
              College students helping <span className="text-green">college students</span>
            </h1>

            <p className="hero-description">
              Get help with assignments, projects, and skills from fellow students. Earn money by sharing your expertise. All within a verified college community.
            </p>

            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/signup')}>
                <span>Get to Dashing</span>
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4.16667 10H15.8333" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="btn-secondary" onClick={() => navigate('/jobs')}>Learn More</button>
            </div>

            <p className="hero-footer">✓ Free to join • ✓ Set your own prices • ✓ Safe & secure</p>
          </div>

          <div className="hero-right">
            <div className="hero-image-container">
              <img 
                src="https://images.unsplash.com/photo-1758270705172-07b53627dfcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBzdHVkeWluZyUyMHRvZ2V0aGVyJTIwZ3JvdXB8ZW58MXx8fHwxNzcxMDAyMjY2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="College students collaborating"
                className="hero-image"
              />
              <div className="stat-badge stat-left">
                <div className="stat-value">500+</div>
                <div className="stat-label">Active Students</div>
              </div>
              <div className="stat-badge stat-right">
                <div className="stat-value">$25k+</div>
                <div className="stat-label">Earned by Students</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="how-content">
          <h2 className="section-title">How DormDash Works</h2>
          <p className="section-subtitle">Get help or earn money in three simple steps</p>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <h3 className="step-title">Post Your Request</h3>
              <p className="step-description">
                Describe what you need help with and set a fair price. Whether it's debugging code, tutoring, or design feedback.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <h3 className="step-title">Get Offers</h3>
              <p className="step-description">
                Verified students with the right skills respond to your request. Review their profiles and choose the best helper.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <h3 className="step-title">Collaborate & Pay</h3>
              <p className="step-description">
                Work together to solve your problem. Once complete, rate your experience and the helper gets paid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="why-section">
        <div className="why-content">
          <h2 className="section-title">Why Choose DormDash?</h2>
          <p className="section-subtitle">Built specifically for college students</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon feature-icon-blue">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M19.9942 12.9962C19.9942 17.9948 16.4952 20.4941 12.3364 21.9437C12.1187 22.0174 11.8821 22.0139 11.6666 21.9337C7.49783 20.4941 3.99884 17.9948 3.99884 12.9962V5.99826C3.99884 5.73312 4.10417 5.47884 4.29165 5.29136C4.47913 5.10388 4.73341 4.99855 4.99855 4.99855C6.99797 4.99855 9.49725 3.7989 11.2367 2.27934C11.4486 2.09839 11.718 1.99897 11.9965 1.99897C12.275 1.99897 12.5445 2.09839 12.7563 2.27934C14.5058 3.8089 16.9951 4.99855 18.9945 4.99855C19.2596 4.99855 19.514 5.10388 19.7014 5.29136C19.8888 5.47884 19.9942 5.73312 19.9942 5.99826V12.9962Z" stroke="#4F39F6" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-title">Verified Students Only</h3>
              <p className="feature-description">
                All users must sign up with a .edu email, ensuring a safe and trusted community.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-green">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M11.9965 1.99942V21.9936" stroke="#00A63E" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16.9951 4.99855H9.49725C8.56926 4.99855 7.67928 5.3672 7.0231 6.02339C6.36691 6.67957 5.99826 7.56955 5.99826 8.49754C5.99826 9.42553 6.36691 10.3155 7.0231 10.9717C7.67928 11.6279 8.56926 11.9965 9.49725 11.9965H14.4958C15.4238 11.9965 16.3138 12.3651 16.97 13.0213C17.6262 13.6775 17.9948 14.5675 17.9948 15.4955C17.9948 16.4235 17.6262 17.3135 16.97 17.9697C16.3138 18.6259 15.4238 18.9945 14.4958 18.9945H5.99826" stroke="#00A63E" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-title">Earn Money From Doing Menial Task</h3>
              <p className="feature-description">
                Turn your skills into income. Help other students and get paid for your time and expertise.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-purple">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M15.9954 20.9939V18.9945C15.9954 17.9339 15.5741 16.9168 14.8241 16.1669C14.0742 15.4169 13.0571 14.9957 11.9965 14.9957H5.99826C4.9377 14.9957 3.92059 15.4169 3.17065 16.1669C2.42073 16.9168 1.99942 17.9339 1.99942 18.9945V20.9939" stroke="#9810FA" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.9974 10.9968C11.2059 10.9968 12.9962 9.20648 12.9962 6.99797C12.9962 4.78947 11.2059 2.99913 8.9974 2.99913C6.7889 2.99913 4.99855 4.78947 4.99855 6.99797C4.99855 9.20648 6.7889 10.9968 8.9974 10.9968Z" stroke="#9810FA" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21.9936 20.9939V18.9945C21.9929 18.1085 21.6981 17.2478 21.1553 16.5475C20.6124 15.8473 19.8524 15.3472 18.9945 15.1256" stroke="#9810FA" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.9954 3.12909C16.8555 3.34933 17.6179 3.84959 18.1623 4.55099C18.7068 5.2524 19.0023 6.11506 19.0023 7.00297C19.0023 7.89089 18.7068 8.75355 18.1623 9.45495C17.6179 10.1564 16.8555 10.6566 15.9954 10.8769" stroke="#9810FA" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-title">Peer-to-Peer Network</h3>
              <p className="feature-description">
                Connect with students who understand your challenges and speak your language.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-lightblue">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M21.9936 6.99797L13.4961 15.4955L8.49754 10.497L1.99942 16.9951" stroke="#155DFC" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.9954 6.99797H21.9936V12.9962" stroke="#155DFC" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-title">Flexible Pricing</h3>
              <p className="feature-description">
                Set your own rates or accept offers. You control how much you charge or pay.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-yellow">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M20.9939 14.9957C20.9939 15.5259 20.7833 16.0345 20.4083 16.4095C20.0333 16.7844 19.5248 16.9951 18.9945 16.9951H6.99797L2.99913 20.9939V4.99855C2.99913 4.46828 3.20978 3.95971 3.58475 3.58475C3.95971 3.20978 4.46828 2.99913 4.99855 2.99913H18.9945C19.5248 2.99913 20.0333 3.20978 20.4083 3.58475C20.7833 3.95971 20.9939 4.46828 20.9939 4.99855V14.9957Z" stroke="#D08700" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-title">Direct Communication</h3>
              <p className="feature-description">
                Chat directly with helpers to discuss details, share files, and stay on the same page.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-teal">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M21.7947 9.99711C22.2513 12.2378 21.9259 14.5672 20.8729 16.597C19.8198 18.6268 18.1027 20.2342 16.0079 21.1512C13.9131 22.0682 11.5673 22.2394 9.36159 21.6361C7.1559 21.0329 5.22368 19.6917 3.88716 17.8362C2.55062 15.9808 1.89057 13.7232 2.01708 11.4401C2.14359 9.15688 3.049 6.98607 4.58232 5.28964C6.11565 3.59321 8.18421 2.47371 10.4431 2.11784C12.7019 1.76197 15.0145 2.19123 16.9951 3.33404" stroke="#00A292" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.9974 10.9968L11.9965 13.996L21.9936 3.99884" stroke="#00A292" strokeWidth="1.99942" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="feature-title">Safe System</h3>
              <p className="feature-description">
                Review and rate your experience to help build a trustworthy and safe community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Join thousands of verified students</h2>
          
          <div className="cta-cards">
            <div className="cta-card">
              <p className="cta-quote">
                "DormDash saved me when I was stuck with a React assignment. Found a senior CS student who explained everything perfectly!"
              </p>
              <div className="cta-author">
                <strong>Sarah J.</strong>
                <span>Freshman at Stanford</span>
              </div>
            </div>

            <div className="cta-card">
              <p className="cta-quote">
                "I've earned $2,000 this semester tutoring and helping classmates. It's incredibly easy and fits my schedule."
              </p>
              <div className="cta-author">
                <strong>Mike T.</strong>
                <span>Junior at MIT</span>
              </div>
            </div>

            <div className="cta-card">
              <p className="cta-quote">
                "Love the verified .edu requirement. People are responsive, friendly, and you can actually trust everyone on the platform."
              </p>
              <div className="cta-author">
                <strong>Jessica K.</strong>
                <span>Sophomore at Columbia</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Start */}
      <section className="ready-section">
        <div className="ready-content">
          <h2 className="ready-title">Ready to get started?</h2>
          <p className="ready-subtitle">
            Join DormDash today and experience the easiest way for college students to help each other and earn money.
          </p>
          <button className="btn-cta" onClick={() => navigate('/signup')}>
            <span>Sign Up Now - It's FREE!</span>
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M4.16667 10H15.8333" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="white" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-heading">DORMDASH</h4>
            <p className="footer-text">
              DormDash enables students to collaborate, learn from each other, and earn money - all within a verified and safe community.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">QUICK LINKS</h4>
            <button className="footer-link" onClick={() => navigate('/jobs')}>How It Works</button>
            <button className="footer-link" onClick={() => navigate('/jobs')}>Browse Tasks</button>
            <button className="footer-link" onClick={() => navigate('/post-job')}>Post a Task</button>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">SUPPORT</h4>
            <button className="footer-link">Help Center</button>
            <button className="footer-link">Trust & Safety</button>
            <button className="footer-link">Contact Us</button>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">LEGAL</h4>
            <button className="footer-link">Terms of Service</button>
            <button className="footer-link">Privacy Policy</button>
            <button className="footer-link">Cookie Policy</button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 DormDash. All rights reserved.</p>
          <p>Made with ❤️ for college students</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
