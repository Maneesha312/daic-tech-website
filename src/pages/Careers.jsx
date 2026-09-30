import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Careers = () => {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    resume: null
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleApplyNow = (positionValue) => {
    setFormData(prev => ({
      ...prev,
      position: positionValue
    }))
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
    
    if (!formData.position) {
      newErrors.position = 'Position is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    if (!formData.resume) {
      newErrors.resume = 'Resume file is required'
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

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      resume: file
    }))
    if (errors.resume) {
      setErrors(prev => ({
        ...prev,
        resume: ''
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
    
    const formDataToSend = new FormData()
    formDataToSend.append('firstName', formData.firstName)
    formDataToSend.append('lastName', formData.lastName)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('phone', formData.phone)
    formDataToSend.append('position', formData.position)
    formDataToSend.append('message', formData.message)
    formDataToSend.append('resume', formData.resume)
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/careers/apply`, {
        method: 'POST',
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (data.success) {
        setSubmitStatus({ type: 'success', message: data.message })
        setFormData({ firstName: '', lastName: '', email: '', phone: '', position: '', message: '', resume: null })
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
    <div className="careers-page">
      {/* Careers Hero */}
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
              <span>Careers</span>
            </div>
            <h1>Join Our Team</h1>
            <p>Build the future with DAIC Tech Solutions. Join a team of innovators, problem-solvers, and visionaries who are passionate about transforming businesses through cutting-edge cloud solutions, AI/ML implementations, and data-driven strategies.</p>
          </div>
        </div>
      </section>

      {/* Careers Intro */}
      <section className="careers-intro">
        <div className="container">
          <div className="careers-intro-content">
            <h2>Shape the Future of Technology</h2>
            <p>At DAIC Tech Solutions, we're not just building technology – we're building the future. Join a team of innovators, problem-solvers, and visionaries who are passionate about transforming businesses through cutting-edge cloud solutions, AI/ML implementations, and data-driven strategies. We believe in empowering our employees to grow, innovate, and make a real impact.</p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="why-work-section">
        <div className="container">
          <h2 className="section-title">Why Work With Us</h2>
          <div className="benefits-grid-extended">
            <div className="benefit-card-extended">
              <div className="benefit-image">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&auto=format&fit=crop&q=80" alt="Innovation" />
              </div>
              <div className="benefit-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Innovation-Driven Culture</h3>
              <p>Work on cutting-edge projects with the latest technologies in cloud, AI, and data analytics.</p>
            </div>
            <div className="benefit-card-extended">
              <div className="benefit-image">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&auto=format&fit=crop&q=80" alt="Growth" />
              </div>
              <div className="benefit-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Growth Opportunities</h3>
              <p>Continuous learning programs, mentorship, and clear career progression paths.</p>
            </div>
            <div className="benefit-card-extended">
              <div className="benefit-image">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80" alt="Collaboration" />
              </div>
              <div className="benefit-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Collaborative Environment</h3>
              <p>Work with talented professionals who support and inspire each other.</p>
            </div>
            <div className="benefit-card-extended">
              <div className="benefit-image">
                <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&auto=format&fit=crop&q=80" alt="Work-Life Balance" />
              </div>
              <div className="benefit-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Work-Life Balance</h3>
              <p>Flexible working arrangements and policies that respect your personal time.</p>
            </div>
            <div className="benefit-card-extended">
              <div className="benefit-image">
                <img src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&auto=format&fit=crop&q=80" alt="Compensation" />
              </div>
              <div className="benefit-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Competitive Compensation</h3>
              <p>Industry-leading salaries, performance bonuses, and comprehensive benefits.</p>
            </div>
            <div className="benefit-card-extended">
              <div className="benefit-image">
                <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&auto=format&fit=crop&q=80" alt="Global Impact" />
              </div>
              <div className="benefit-icon">
                <i className="fas fa-globe"></i>
              </div>
              <h3>Global Impact</h3>
              <p>Work with clients worldwide and make a difference on a global scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="open-positions">
        <div className="container">
          <h2 className="section-title">Open Positions</h2>
          <div className="positions-grid">
            <div className="position-card">
              <div className="position-image">
                <img src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop&q=80" alt="Cloud Engineer" />
              </div>
              <div className="position-header">
                <h3>Senior Cloud Engineer</h3>
                <span className="position-location">Bengaluru, India</span>
              </div>
              <div className="position-details">
                <div className="position-tag full-time">Full Time</div>
                <div className="position-tag experience">5+ Years</div>
              </div>
              <p>We're looking for an experienced Cloud Engineer to design and implement scalable cloud solutions on GCP and Azure.</p>
              <button onClick={() => handleApplyNow('cloud-engineer')} className="btn btn-secondary position-btn">Apply Now</button>
            </div>

            <div className="position-card">
              <div className="position-image">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80" alt="Data Engineer" />
              </div>
              <div className="position-header">
                <h3>Data Engineer</h3>
                <span className="position-location">Bengaluru, India</span>
              </div>
              <div className="position-details">
                <div className="position-tag full-time">Full Time</div>
                <div className="position-tag experience">3+ Years</div>
              </div>
              <p>Join our data team to build robust data pipelines and implement modern data warehouse solutions.</p>
              <button onClick={() => handleApplyNow('data-engineer')} className="btn btn-secondary position-btn">Apply Now</button>
            </div>

            <div className="position-card">
              <div className="position-image">
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&auto=format&fit=crop&q=80" alt="ML Engineer" />
              </div>
              <div className="position-header">
                <h3>ML Engineer</h3>
                <span className="position-location">Bengaluru, India</span>
              </div>
              <div className="position-details">
                <div className="position-tag full-time">Full Time</div>
                <div className="position-tag experience">4+ Years</div>
              </div>
              <p>Develop and deploy machine learning models using Vertex AI, BigQuery ML, and other GCP ML services.</p>
              <button onClick={() => handleApplyNow('ml-engineer')} className="btn btn-secondary position-btn">Apply Now</button>
            </div>

            <div className="position-card">
              <div className="position-image">
                <img src="https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&auto=format&fit=crop&q=80" alt="DevOps Engineer" />
              </div>
              <div className="position-header">
                <h3>DevOps Engineer</h3>
                <span className="position-location">Remote</span>
              </div>
              <div className="position-details">
                <div className="position-tag full-time">Full Time</div>
                <div className="position-tag experience">4+ Years</div>
              </div>
              <p>Build and maintain CI/CD pipelines, implement infrastructure as code, and ensure system reliability.</p>
              <button onClick={() => handleApplyNow('devops-engineer')} className="btn btn-secondary position-btn">Apply Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch */}
      <section className="careers-cta">
        <div className="container">
          <div className="careers-cta-content">
            <h2>Ready to Take the Next Step?</h2>
            <p>Don't see a role that matches your skills? We're always looking for talented individuals to join our team. Send us your resume and let's explore how you can contribute to our mission.</p>
            <div className="cta-buttons">
              <Link to="#careers-contact" className="btn btn-secondary">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Careers Contact Section */}
      <section className="careers-contact" id="careers-contact" ref={formRef}>
        <div className="container">
          <div className="careers-contact-wrapper">
            <div className="careers-contact-form">
              <h2>Send Us Your Resume</h2>
              <p>Fill out the form below and we'll get back to you within 24-48 hours.</p>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
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
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    required 
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone Number" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <select 
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className={errors.position ? 'error' : ''}
                    required
                  >
                    <option value="">Select Position</option>
                    <option value="cloud-engineer">Senior Cloud Engineer</option>
                    <option value="data-engineer">Data Engineer</option>
                    <option value="ml-engineer">ML Engineer</option>
                    <option value="devops-engineer">DevOps Engineer</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.position && <span className="error-message">{errors.position}</span>}
                </div>
                <div className="form-group">
                  <textarea 
                    name="message"
                    placeholder="Tell us about yourself and why you want to join DAIC Tech Solutions" 
                    rows="4" 
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    required
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>
                <div className="form-group file-upload">
                  <label htmlFor="resume" className="file-label">
                    {formData.resume ? formData.resume.name : 'Choose file...'}
                  </label>
                  <input 
                    type="file" 
                    id="resume" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleFileChange}
                    className={errors.resume ? 'error' : ''}
                    required 
                  />
                  <p className="file-hint">Accepted formats: PDF, DOC, DOCX</p>
                  {errors.resume && <span className="error-message">{errors.resume}</span>}
                </div>
                <button type="submit" className="btn btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
                {submitStatus && (
                  <div className={`submit-status ${submitStatus.type}`}>
                    {submitStatus.message}
                  </div>
                )}
              </form>
            </div>
            <div className="careers-contact-info">
              <h2>Contact Information</h2>
              <div className="contact-info-grid">
                <div className="contact-info-card">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <p>careers@daictechsolution.com</p>
                    <p>hr@daictechsolution.com</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Phone</h4>
                    <p>+1 512-670-8325</p>
                    <p>+91 80 1234 5678</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Office Location</h4>
                    <p>WeWork Prestige Tech Park</p>
                    <p>3rd & 4th Floor, Jupiter Block</p>
                    <p>Prestige Tech Park, Kadubeesanahalli</p>
                    <p>Bengaluru, Karnataka 560103</p>
                  </div>
                </div>
                <div className="contact-info-card">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-details">
                    <h4>Working Hours</h4>
                    <p>Monday - Friday</p>
                    <p>9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <h4>Connect With Us</h4>
                <div className="social-icons">
                  <a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
                  <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                  <a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                </div>
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

export default Careers
