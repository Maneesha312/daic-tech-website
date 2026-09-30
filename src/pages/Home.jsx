import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSubmitStatus({ type: 'success', message: data.message })
        setFormData({ firstName: '', lastName: '', email: '', message: '' })
      } else {
        setSubmitStatus({ type: 'error', message: data.message })
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'An error occurred. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="careers-hero-background">
          <div className="hero-left-image"></div>
          <div className="hero-right-image"></div>
          <div className="hero-center-graphic"></div>
          <div className="hero-overlay"></div>
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        <div className="container">
          <div className="careers-hero-content animate-fade-in-up">
            <div className="breadcrumb animate-fade-in delay-100">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Our Services</span>
            </div>
            <h1 className="animate-fade-in-up delay-200">IT Consulting & Services</h1>
            <p className="animate-fade-in-up delay-300">As a technology consulting and delivery company, we partner with businesses to unlock the power of their data, optimize their technology infrastructure, and drive data-driven success through expert guidance and solutions in data analytics and cloud technologies.</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2 className="section-title animate-fade-in-up">Our Services</h2>
          <p className="services-intro animate-fade-in-up delay-100">We empower businesses to transform data into actionable insights, leverage the cloud for agility and scalability, and ultimately thrive in the digital age.</p>
          <div className="services-grid">
            <div className="service-card animate-fade-in-up delay-200">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80" alt="Cloud Services" />
              </div>
              <div className="service-icon">
                <i className="fas fa-cloud"></i>
              </div>
              <h3>Cloud Services</h3>
              <p>The cloud market is complex and constantly changing, making it hard to choose the right provider. We help deploy your workloads—whether for data analytics, data lakes, or production applications—on Google Cloud Platform (GCP), AWS, and Azure.</p>
            </div>
            <div className="service-card animate-fade-in-up delay-300">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80" alt="Data Platform" />
              </div>
              <div className="service-icon">
                <i className="fas fa-database"></i>
              </div>
              <h3>Data Platform</h3>
              <p>We build scalable, secure data lakes on leading cloud platforms to handle all your data. We also modernize your data warehouse by migrating it to the cloud, delivering faster performance, improved scalability, and reduced costs.</p>
            </div>
            <div className="service-card animate-fade-in-up delay-400">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop&q=80" alt="AI/ML" />
              </div>
              <div className="service-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>AI/ML</h3>
              <p>We provide comprehensive AI/ML services, specializing in custom machine learning models tailored to your specific data and needs—including predictive analytics, Generative AI, and computer vision—to help you drive innovation and efficiency.</p>
            </div>
            <div className="service-card animate-fade-in-up delay-500">
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80" alt="Business Intelligence" />
              </div>
              <div className="service-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Business Intelligence</h3>
              <p>We provide intuitive Business Intelligence (BI) solutions that empower your business users to analyze data, create interactive dashboards, and make data-driven decisions independently, without needing to rely on IT.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="animate-fade-in-up">Have an Idea? Let's Build It Together.</h2>
          <p className="animate-fade-in-up delay-100">Whether you're looking to modernize your business, automate processes, harness your data, or build a new digital solution, DAIC Tech Solutions is ready to help.</p>
          <a href="#contact" className="btn btn-secondary animate-fade-in-up delay-200">Get in Touch</a>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-form animate-fade-in-up">
              <h3>Get in Touch</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="firstName"
                    placeholder="First Name" 
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                    required 
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="lastName"
                    placeholder="Last Name" 
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                    required 
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email" 
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    required 
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <textarea 
                    name="message"
                    placeholder="Message" 
                    rows="5" 
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    required
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
                <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                {submitStatus && (
                  <div className={`submit-status ${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>
            <div className="contact-info animate-fade-in-up delay-100">
              <h2>Contact Information</h2>
              <div className="info-item animate-fade-in delay-200">
                <i className="fas fa-envelope"></i>
                <span>contact@daictechsolution.com</span>
              </div>
              <div className="info-item animate-fade-in delay-300">
                <i className="fas fa-phone"></i>
                <span>+1 512-670-8325</span>
              </div>
              <div className="info-item animate-fade-in delay-400">
                <i className="fas fa-map-marker-alt"></i>
                <span>WeWork Prestige Tech Park, 3rd & 4th Floor, Jupiter Block, Prestige Tech Park, Kadubeesanahalli Bengaluru, Karnataka</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 DAIC Tech Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
