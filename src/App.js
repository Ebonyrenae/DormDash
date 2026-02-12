import { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  if (currentPage === 'landing') {
    return <LandingPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'signup') {
    return <SignUpPage onNavigate={setCurrentPage} />;
  }

  return <LoginPage onNavigate={setCurrentPage} />;
}

function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">🏃‍💨 DormDash</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm font-medium">Verified .edu students only</span>
            </div>

            <h2 className="text-6xl font-bold text-gray-900 mb-6">
              College students helping <span className="text-green-600">college students</span>
            </h2>

            <p className="text-xl text-gray-600 mb-8">
              Get help with assignments, projects, and skills from fellow students. Earn money by sharing your expertise. All within a verified college community.
            </p>

            <div className="flex gap-4 mb-4">
              <button
                onClick={() => onNavigate('signup')}
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Get to Dashing →
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 transition-colors">
                Learn More
              </button>
            </div>

            <p className="text-sm text-gray-500">
              ✓ Free to join • ✓ Set your own prices • ✓ Safe & secure
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 aspect-square flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎓</div>
                <div className="space-y-4">
                  <div className="bg-green-100 px-6 py-3 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">500+</p>
                    <p className="text-sm text-gray-600">Active Students</p>
                  </div>
                  <div className="bg-green-50 px-6 py-3 rounded-lg">
                    <p className="text-3xl font-bold text-green-600">$25k+</p>
                    <p className="text-sm text-gray-600">Earned by Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">How DormDash Works</h3>
            <p className="text-xl text-gray-600">Get help or earn money in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Post Your Request</h4>
              <p className="text-gray-600">
                Describe what you need help with and set a fair price. Whether it's debugging code, tutoring, or design feedback.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Get Offers</h4>
              <p className="text-gray-600">
                Verified students with the right skills respond to your request. Review their profiles and choose the best helper.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 text-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Collaborate & Pay</h4>
              <p className="text-gray-600">
                Work together to solve your problem. Once complete, rate your experience and the helper gets paid.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose DormDash?</h3>
            <p className="text-xl text-gray-600">Built specifically for college students</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🎓', title: 'Verified Students Only', desc: 'All users must sign up with a .edu email, ensuring a safe and trusted community.', bg: 'bg-blue-100' },
              { icon: '💰', title: 'Earn Money From Tasks', desc: 'Turn your skills into income. Help other students and get paid for your time and expertise.', bg: 'bg-green-100' },
              { icon: '🤝', title: 'Peer-to-Peer Network', desc: 'Connect with students who understand your challenges and speak your language.', bg: 'bg-purple-100' },
              { icon: '💵', title: 'Flexible Pricing', desc: 'Set your own rates or accept offers. You control how much you charge or pay.', bg: 'bg-blue-50' },
              { icon: '💬', title: 'Direct Communication', desc: 'Chat directly with helpers to discuss details, share files, and collaborate effectively.', bg: 'bg-yellow-50' },
              { icon: '⭐', title: 'Rating System', desc: 'Build your reputation with reviews and ratings from other students.', bg: 'bg-red-50' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6">
                <div className={`${item.bg} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl`}>
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h3>
          <p className="text-xl text-green-100 mb-8">
            Join hundreds of students already helping each other succeed
          </p>
          <button
            onClick={() => onNavigate('signup')}
            className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Sign Up with Your .edu Email
          </button>
        </div>
      </div>
    </div>
  );
}

function SignUpPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    university: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Sign up successful! (This is a proof of concept)');
    onNavigate('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-600 mb-2">DORMDASH 🏃‍💨</h1>
          <p className="text-gray-600">College students helping college students</p>
        </div>

        {/* Form */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create Account</h2>
          <p className="text-sm text-gray-600">Sign up with your .edu email to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email (.edu required)</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="john.doe@university.edu"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
            <input
              type="text"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="University Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Create a password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <button
            onClick={() => onNavigate('login')}
            className="text-green-600 font-medium hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

function LoginPage({ onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Sign in successful! (This is a proof of concept)');
    onNavigate('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600 mb-2">DormDash 🏃‍💨</h1>
          <p className="text-lg text-gray-600">College students helping college students</p>
        </div>

        {/* Form */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-600">Sign in to continue to DormDash</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="your.email@university.edu"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 rounded" />
              <span className="text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-green-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => onNavigate('signup')}
            className="text-green-600 font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

