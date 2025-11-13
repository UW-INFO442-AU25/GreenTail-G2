import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CookiePolicyPage = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="w-8 h-8" />
            <span className="text-2xl font-bold text-green-800">GreenTail</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-8 pt-24 pb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: January 2025</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies allow a website to recognize your device and store some information about your preferences or past actions. This helps us provide you with a better experience when you return to our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              GreenTail uses cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas.</li>
              <li><strong>Functionality Cookies:</strong> These cookies allow the website to remember choices you make (such as your login information, language preference, or region) and provide enhanced, personalized features.</li>
              <li><strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
              <li><strong>Preference Cookies:</strong> These cookies remember your preferences and settings to provide a personalized experience.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Strictly Necessary Cookies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These cookies are essential for you to browse the website and use its features. Without these cookies, services you have asked for cannot be provided.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Performance Cookies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These cookies collect information about how you use our website, such as which pages you visit most often. This data helps us optimize our website's performance.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Functionality Cookies</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              These cookies allow the website to remember choices you make and provide enhanced, personalized features. For example, we use these cookies to remember your saved products and preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Local Storage</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In addition to cookies, we use browser local storage to store information such as:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Your saved products and comparison lists</li>
              <li>Quiz responses and preferences</li>
              <li>User account information (when logged in)</li>
              <li>Website preferences and settings</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              This information is stored locally on your device and is not transmitted to our servers unless you explicitly create an account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may use third-party services that set cookies on your device. These include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Analytics Services:</strong> To understand how visitors use our website</li>
              <li><strong>Authentication Services:</strong> For Google and Apple sign-in functionality</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              These third parties have their own privacy policies and cookie policies. We encourage you to review them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Managing Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              However, please note that disabling cookies may affect the functionality of our website and may prevent you from using certain features.
            </p>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">How to Manage Cookies in Different Browsers:</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
              <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to This Cookie Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Cookie Policy on this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <p className="text-gray-700 leading-relaxed">
              Email: <button 
                onClick={() => setShowContactModal(true)}
                className="text-green-800 hover:text-green-900 underline cursor-pointer bg-transparent border-0 p-0"
              >
                View contact emails
              </button><br />
              Website: <a href="https://uw-info442-au25.github.io/GreenTail-G2/" target="_blank" rel="noopener noreferrer" className="text-green-800 hover:underline">https://uw-info442-au25.github.io/GreenTail-G2/</a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-700 py-12 mt-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <img src={`${import.meta.env.BASE_URL}logos/logo.png`} alt="GreenTail Logo" className="w-6 h-6" />
                GreenTail
              </h3>
              <p className="text-gray-600 leading-relaxed">Helping pet parents choose organic, planet-friendly food with confidence.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="text-gray-600 hover:text-green-800 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-gray-600 hover:text-green-800 transition-colors">Cookie Policy</Link></li>
                <li><Link to="/terms" className="text-gray-600 hover:text-green-800 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8 text-center">
            <p className="text-gray-600">© 2025 GreenTail. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">Kaibo Wang</p>
                <a href="mailto:kwang37@uw.edu" className="text-green-600 hover:text-green-800">
                  kwang37@uw.edu
                </a>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">Lele Zhang</p>
                <a href="mailto:lelez@uw.edu" className="text-green-600 hover:text-green-800">
                  lelez@uw.edu
                </a>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">Lanqi Zhang</p>
                <a href="mailto:zha12935@uw.edu" className="text-green-600 hover:text-green-800">
                  zha12935@uw.edu
                </a>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">Sammi Huang</p>
                <a href="mailto:shuang36@uw.edu" className="text-green-600 hover:text-green-800">
                  shuang36@uw.edu
                </a>
              </div>
              <div className="border-b border-gray-200 pb-3">
                <p className="font-semibold text-gray-900">Amber Lu</p>
                <a href="mailto:yuyaol@uw.edu" className="text-green-600 hover:text-green-800">
                  yuyaol@uw.edu
                </a>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowContactModal(false)}
                className="bg-green-800 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookiePolicyPage;

