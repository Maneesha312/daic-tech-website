import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaseStudyDataWarehouse = () => {
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
              <span>Data Warehouse</span>
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
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80" alt="Data Warehouse" />
            </div>
            <div className="case-study-header-text">
              <h1>Case Study: Data Warehouse</h1>
              <p className="client-name">Logistics Service Provider</p>
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
                      <i className="fas fa-tachometer-alt"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>Slow & Limited Data Analysis</h3>
                      <p>Existing Oracle/SQL database struggled with data volume, leading to slow query performance and limitations in analyzing large datasets.</p>
                    </div>
                  </div>
                  <div className="challenge-item">
                    <div className="challenge-icon">
                      <i className="fas fa-server"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>On-Premise Infrastructure Constraints</h3>
                      <p>On-premise solution presented scalability, maintenance, and cost-effectiveness challenges.</p>
                    </div>
                  </div>
                  <div className="challenge-item">
                    <div className="challenge-icon">
                      <i className="fas fa-cogs"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>Need for Modernized Data Infrastructure</h3>
                      <p>Required a scalable, cost-efficient, and optimized platform for high-performance data analysis.</p>
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
                  <h3>Data Foundation</h3>
                  <ul>
                    <li><strong>Solid data foundation on GCP</strong> using IaC, data security, network perimeter, and data loss prevention.</li>
                  </ul>
                </div>
                <div className="solution-phase">
                  <h3>Cloud-Based Data Storage</h3>
                  <ul>
                    <li><strong>Utilized BigQuery's architecture</strong> for quick storage and analysis of terabytes of data, leveraging its pay-per-use model for cost reduction.</li>
                  </ul>
                </div>
                <div className="solution-phase">
                  <h3>Scalable Data Architecture</h3>
                  <ul>
                    <li><strong>Robust landing zone (GCS)</strong> connecting to on-prem Oracle DB via low-code Data Fusion, with layered curated and semantic data storage for scalability.</li>
                  </ul>
                </div>
                <div className="solution-phase">
                  <h3>Role Based Security of Data Assets</h3>
                  <ul>
                    <li><strong>Security perimeter and IAM</strong> for row/column level access control.</li>
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
                    <div className="benefit-percentage">70%</div>
                    <div className="benefit-label">Improvement in data availability (20th to 6th of every month)</div>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-percentage">100%</div>
                    <div className="benefit-label">Data Quality issues resolved</div>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-percentage">60%</div>
                    <div className="benefit-label">Reduction in storage cost (Amortized for next 10 years)</div>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-percentage">5x</div>
                    <div className="benefit-label">increase in processing time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="migration-plan">
            <h2>Architecture: Oracle & SQL to BigQuery Migration</h2>
            <div className="tech-logos">
              <div className="tech-logo">
                <i className="fab fa-google"></i>
                <span>Google Cloud Platform</span>
              </div>
              <div className="tech-logo">
                <i className="fas fa-database"></i>
                <span>BigQuery</span>
              </div>
              <div className="tech-logo">
                <i className="fas fa-cloud"></i>
                <span>Cloud Storage</span>
              </div>
              <div className="tech-logo">
                <i className="fas fa-shield-alt"></i>
                <span>Cloud IAM</span>
              </div>
            </div>
            <div className="arch-visual-diagram">
              <div className="arch-row">
                <div className="arch-box data-sources">
                  <h4>On-Premise</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Oracle DB</div>
                    <div className="arch-mini-box">PostgreSQL</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box data-integration">
                  <h4>GCP Landing Zone</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Cloud Data Fusion</div>
                    <div className="arch-mini-box">Dataflow</div>
                    <div className="arch-mini-box">Cloud Data (Cloud Storage)</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box data-storage">
                  <h4>Processing</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Dataflow</div>
                    <div className="arch-mini-box">Cloud Composer</div>
                    <div className="arch-mini-box">BigQuery Data Transfer Service</div>
                    <div className="arch-mini-box">Python</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box applications">
                  <h4>Curated Layer</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Dataset #1</div>
                    <div className="arch-mini-box">Dataset #2</div>
                    <div className="arch-mini-box">Dataset #3</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box applications">
                  <h4>Semantic Layer</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box highlight">Dataset #4</div>
                    <div className="arch-mini-box highlight">Dataset #5</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box analytics">
                  <h4>Reporting Layer</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Power Users (Business Analysis)</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box data-storage">
                  <h4>Overarching Services</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Cloud Firewall Rules</div>
                    <div className="arch-mini-box">Cloud Logging</div>
                    <div className="arch-mini-box highlight">Cloud IAM</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box data-integration">
                  <h4>Infrastructure Services</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Orchestration</div>
                    <div className="arch-mini-box">Secrets</div>
                    <div className="arch-mini-box">Logging</div>
                    <div className="arch-mini-box">Monitoring</div>
                    <div className="arch-mini-box">Notifications</div>
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

export default CaseStudyDataWarehouse
