import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaseStudies = () => {
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
      const response = await fetch('http://localhost:5000/api/contact', {
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
    <div className="case-studies-page">
      {/* Case Study Hero */}
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
              <span>Case Studies</span>
            </div>
            <h1>Our Work</h1>
            <p>Driving Real-World Results Through Innovation. Our case studies showcase how we leverage cutting-edge technologies like cloud computing and artificial intelligence to deliver tangible outcomes for our clients.</p>
          </div>
        </div>
      </section>

      {/* Our Work Intro */}
      <section className="our-work-intro">
        <div className="container">
          <div className="our-work-content">
            <h2>Driving Real-World Results Through Innovation</h2>
            <p>At DAIC Tech Solutions, we partner with businesses to unlock the power of their data, optimize their technology infrastructure, and drive data-driven success. Our case studies showcase how we leverage cutting-edge technologies like cloud computing and artificial intelligence to deliver tangible outcomes for our clients. From strategic planning to seamless implementation, we are committed to delivering excellence and driving performance, growth, and efficiency for organizations across industries.</p>
          </div>
        </div>
      </section>

      {/* Case Studies List */}
      <section className="case-studies-list">
        <div className="container">
          <div className="case-studies-grid">
            <Link to="/case-studies/data-migration" className="case-study-card">
              <div className="case-study-card-image">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80" alt="Data Migration" />
              </div>
              <div className="case-study-card-icon">
                <i className="fas fa-exchange-alt"></i>
              </div>
              <h3>Data Migration</h3>
              <p className="case-client">A Big Retailer</p>
              <p className="case-description">Migrated from Teradata to Snowflake, achieving 80%+ faster query performance and 40% cost reduction.</p>
              <div className="case-benefits">
                <span className="benefit-tag">80%+ Faster Queries</span>
                <span className="benefit-tag">40% Cost Reduction</span>
              </div>
            </Link>

            <Link to="/case-studies/data-integration" className="case-study-card">
              <div className="case-study-card-image">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop&q=80" alt="Data Integration" />
              </div>
              <div className="case-study-card-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <h3>Data Integration</h3>
              <p className="case-client">Health Service Aggregator</p>
              <p className="case-description">Unified provider information from multiple sources with real-time analytics and self-service portal.</p>
              <div className="case-benefits">
                <span className="benefit-tag">90% Data Quality</span>
                <span className="benefit-tag">10x Engagement</span>
              </div>
            </Link>

            <Link to="/case-studies/ai-ml" className="case-study-card">
              <div className="case-study-card-image">
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop&q=80" alt="Custom AI/ML" />
              </div>
              <div className="case-study-card-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>Custom AI/ML</h3>
              <p className="case-client">Ed-Tech Service Provider</p>
              <p className="case-description">Built scalable ML platform enabling 100% team adoption and 70% faster time-to-market.</p>
              <div className="case-benefits">
                <span className="benefit-tag">70% Faster Time-to-Market</span>
                <span className="benefit-tag">100% Team Adoption</span>
              </div>
            </Link>

            <Link to="/case-studies/data-warehouse" className="case-study-card">
              <div className="case-study-card-image">
                <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80" alt="Data Warehouse" />
              </div>
              <div className="case-study-card-icon">
                <i className="fas fa-database"></i>
              </div>
              <h3>Data Warehouse</h3>
              <p className="case-client">Logistics Service Provider</p>
              <p className="case-description">Migrated Oracle/SQL to BigQuery, achieving 70% improvement in data availability and 60% storage cost reduction.</p>
              <div className="case-benefits">
                <span className="benefit-tag">70% Better Availability</span>
                <span className="benefit-tag">60% Cost Reduction</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Data Infrastructure?</h2>
            <p>Let's discuss how DAIC Tech Solutions can help you achieve similar results for your organization.</p>
            <div className="cta-buttons">
              <Link to="/#contact" className="btn btn-secondary">Get Started</Link>
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

export default CaseStudies
