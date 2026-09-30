import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaseStudyDataMigration = () => {
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
    <div className="case-study-detail-page">
      {/* Case Study Hero */}
      <section className="case-study-hero">
        <div className="case-study-hero-background">
          <div className="hero-left-image"></div>
          <div className="hero-right-image"></div>
          <div className="hero-center-graphic"></div>
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="case-study-hero-content">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <Link to="/case-studies">Case Studies</Link>
              <span>/</span>
              <span>Data Migration</span>
            </div>
            <h1>Our Work</h1>
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

      {/* Case Study Content */}
      <section className="case-study-content">
        <div className="container">
          <div className="case-study-header">
            <div className="case-study-header-image">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80" alt="Data Migration" />
            </div>
            <div className="case-study-header-text">
              <h1>Case Study: Data Migration</h1>
              <p className="client-name">A Big Retailer</p>
            </div>
          </div>
          <div className="case-study-grid">
            {/* Challenge Section */}
            <div className="case-study-section">
              <div className="section-header challenge">
                <div className="section-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <h2>Challenge</h2>
              </div>
              <div className="section-content">
                <div className="challenge-list">
                  <div className="challenge-item">
                    <div className="challenge-icon">
                      <i className="fas fa-expand-arrows-alt"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>Capacity</h3>
                      <p>Challenging to scale to meet analytical needs</p>
                    </div>
                  </div>
                  <div className="challenge-item">
                    <div className="challenge-icon">
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>Cost</h3>
                      <p>Expensive to operate and maintain on-premise data platform</p>
                    </div>
                  </div>
                  <div className="challenge-item">
                    <div className="challenge-icon">
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>Performance</h3>
                      <p>Select statements are slow, impacting real-time decision-making</p>
                    </div>
                  </div>
                  <div className="challenge-item">
                    <div className="challenge-icon">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>Elastic Scale On-Demand</h3>
                      <p>Spiky workloads resulted in needs for data infrastructure to scale up and down with demand</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Section */}
            <div className="case-study-section">
              <div className="section-header solution">
                <div className="section-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <h2>Solution</h2>
              </div>
              <div className="section-content">
                <div className="solution-phase">
                  <h3>Assessment and Planning</h3>
                  <ul>
                    <li><strong>Inventory:</strong> Thoroughly cataloged 60 ETL jobs, identifying dependencies, data sources, and target destinations in Snowflake</li>
                    <li><strong>Schema Mapping:</strong> Mapped Teradata table schemas to Snowflake equivalents, addressing data type differences and optimizing performance</li>
                    <li><strong>Data Validation:</strong> Defined clear validation rules to ensure data integrity throughout the migration process</li>
                    <li><strong>Performance Testing:</strong> Established performance benchmarks for Teradata jobs and set target performance goals on Snowflake</li>
                  </ul>
                </div>
                <div className="solution-phase">
                  <h3>Migration Execution</h3>
                  <ul>
                    <li><strong>Phased Approach:</strong> Migrated in phases, starting with less critical jobs and data to minimize disruption and allow for iterative learning</li>
                    <li><strong>Automated Tools:</strong> Leveraged tools like Teradata Parallel Transporter and Data Build Tool (dbt) for efficient data transfer</li>
                  </ul>
                </div>
                <div className="solution-phase">
                  <h3>Post-Migration</h3>
                  <ul>
                    <li><strong>Testing and Validation:</strong> Rigorously tested migrated jobs and data against predefined rules</li>
                    <li><strong>Performance Tuning:</strong> Optimized Snowflake table schemas, partition strategies, and query patterns</li>
                    <li><strong>Monitoring and Maintenance:</strong> Established ongoing processes for health and performance of the Snowflake environment</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefit Section */}
            <div className="case-study-section">
              <div className="section-header benefit">
                <div className="section-icon">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <h2>Benefit</h2>
              </div>
              <div className="section-content">
                <div className="benefits-grid">
                  <div className="benefit-card">
                    <div className="benefit-percentage">80%+</div>
                    <div className="benefit-label">of SELECT queries ran faster</div>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-percentage">25%</div>
                    <div className="benefit-label">improvement in Data Visualization processing time</div>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-percentage">40%</div>
                    <div className="benefit-label">reduction in platform cost</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Migration Design & Plan */}
          <div className="migration-plan">
            <h2>Migration Design & Plan</h2>
            <div className="tech-logos">
              <div className="tech-logo">
                <i className="fas fa-database"></i>
                <span>Teradata</span>
              </div>
              <div className="tech-logo">
                <i className="fab fa-microsoft"></i>
                <span>Azure</span>
              </div>
              <div className="tech-logo">
                <i className="fas fa-cube"></i>
                <span>dbt</span>
              </div>
              <div className="tech-logo">
                <i className="fas fa-snowflake"></i>
                <span>Snowflake</span>
              </div>
            </div>
            <div className="arch-visual-diagram">
              <div className="arch-row">
                <div className="arch-box data-sources">
                  <h4>Source: Teradata</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Define Schemas</div>
                    <div className="arch-mini-box">Schema Translation</div>
                    <div className="arch-mini-box">Validate Schemas</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box data-integration">
                  <h4>Query Processing</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Query Translation</div>
                    <div className="arch-mini-box">Validate Queries</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box data-storage">
                  <h4>Migration Phase</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box highlight">Schema and Data Migration</div>
                    <div className="arch-mini-box highlight">Historical Data Migration</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box applications">
                  <h4>Testing & Integration</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Test Incremental Data Feed</div>
                    <div className="arch-mini-box">End-to-End Testing + Security</div>
                    <div className="arch-mini-box">App Integration</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box analytics">
                  <h4>Optimization</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box highlight">Performance Optimization</div>
                    <div className="arch-mini-box">Monitoring & Maintenance</div>
                  </div>
                </div>
              </div>
            </div>
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

export default CaseStudyDataMigration
