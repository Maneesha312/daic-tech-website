import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const WhyChooseUs = () => {
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
    <div className="why-choose-us-page">
      {/* Page Header */}
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
          <div className="careers-hero-content">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Why Choose Us</span>
            </div>
            <h1>Why Choose DAIC Tech</h1>
            <p>Discover what sets DAIC Tech Solutions apart in the world of technology consulting. We combine cutting-edge technology with strategic thinking to deliver exceptional results for our clients.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Content */}
      <section className="why-choose-us">
        <div className="container">
          <div className="why-choose-intro">
            <h2>What Makes Us Different</h2>
            <p>At DAIC Tech Solutions, we combine cutting-edge technology with strategic thinking to deliver exceptional results for our clients. Our commitment to excellence and innovation drives everything we do.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80" alt="Cloud & AI Innovation" />
              </div>
              <div className="feature-number">01</div>
              <div className="feature-icon">
                <i className="fas fa-cloud"></i>
              </div>
              <h3>Expertise in Cloud & AI Innovation</h3>
              <p>Our team brings deep expertise in cloud computing and artificial intelligence, helping businesses leverage the latest technologies to stay ahead of the competition and drive digital transformation.</p>
            </div>

            <div className="feature-card">
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80" alt="Strategic Approach" />
              </div>
              <div className="feature-number">02</div>
              <div className="feature-icon">
                <i className="fas fa-chess"></i>
              </div>
              <h3>Tailored & Strategic Approach</h3>
              <p>We understand that every business is unique. Our solutions are customized to meet your specific needs, ensuring that technology aligns perfectly with your business goals and objectives.</p>
            </div>

            <div className="feature-card">
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&auto=format&fit=crop&q=80" alt="Track Record of Success" />
              </div>
              <div className="feature-number">03</div>
              <div className="feature-icon">
                <i className="fas fa-trophy"></i>
              </div>
              <h3>Proven Track Record of Success</h3>
              <p>With a history of successful projects across various industries, we have demonstrated our ability to deliver results. Our clients trust us to consistently exceed expectations and drive measurable outcomes.</p>
            </div>

            <div className="feature-card">
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80" alt="Partnership" />
              </div>
              <div className="feature-number">04</div>
              <div className="feature-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>End-to-End Support & Partnership</h3>
              <p>We don't just deliver solutions; we build lasting partnerships. From initial consultation to ongoing support, we're with you every step of the way, ensuring your success at every stage of your journey.</p>
            </div>

            <div className="feature-card">
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=80" alt="Future-Proofing" />
              </div>
              <div className="feature-number">05</div>
              <div className="feature-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Future-Proofing Your Business</h3>
              <p>We help you prepare for tomorrow's challenges today. Our forward-thinking approach ensures that your technology investments are scalable, adaptable, and ready for whatever the future holds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Let's discuss how DAIC Tech Solutions can help you achieve your technology goals and drive your business forward.</p>
            <div className="cta-buttons">
              <Link to="/#contact" className="btn btn-secondary" onClick={(e) => {
                e.preventDefault()
                window.location.href = '/#contact'
              }}>Get Started</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-form">
              <h2>Get in Touch</h2>
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
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="info-item">
                <i className="fas fa-envelope"></i>
                <span>contact@daictechsolution.com</span>
              </div>
              <div className="info-item">
                <i className="fas fa-phone"></i>
                <span>+1 512-670-8325</span>
              </div>
              <div className="info-item">
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

export default WhyChooseUs
