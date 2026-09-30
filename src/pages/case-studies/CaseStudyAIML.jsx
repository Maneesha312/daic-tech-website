import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaseStudyAIML = () => {
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^ \s@]+$/.test(formData.email)) {
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
              <span>Custom AI/ML</span>
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
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80" alt="Custom AI/ML" />
            </div>
            <div className="case-study-header-text">
              <h1>Case Study: Custom AI/ML</h1>
              <p className="client-name">Ed-Tech Service Provider</p>
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
                      <i className="fas fa-database"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>Overwhelming Data Volume</h3>
                      <p>An ed-tech customer struggling with AI/ML use cases due to overwhelming data volume.</p>
                    </div>
                  </div>
                  <div className="challenge-item">
                    <div className="challenge-icon">
                      <i className="fas fa-code"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>Limited ML Expertise</h3>
                      <p>Team sought a low-code solution for developing custom ML models with limited ML expertise.</p>
                    </div>
                  </div>
                  <div className="challenge-item">
                    <div className="challenge-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>Democratize ML Use</h3>
                      <p>Goal: Democratize ML use across the organization.</p>
                    </div>
                  </div>
                  <div className="challenge-item">
                    <div className="challenge-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="challenge-text">
                      <h3>High Time-to-Market</h3>
                      <p>High time-to-market for ML use case deployments.</p>
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
                  <h3>Data Consolidation</h3>
                  <ul>
                    <li><strong>Created a consolidated data layer</strong> using BigQuery as a Data Lake with multiple sources (Salesforce, Google Analytics, Oracle DB, etc.).</li>
                  </ul>
                </div>
                <div className="solution-phase">
                  <h3>ML Training Pipeline</h3>
                  <ul>
                    <li><strong>Developed an AI/ML training, testing, and evaluation pipeline</strong> using GCP services like Vertex AI notebook instances and BigQuery ML, with access based on organizational policy.</li>
                  </ul>
                </div>
                <div className="solution-phase">
                  <h3>Scalable Architecture</h3>
                  <ul>
                    <li><strong>Utilized various GCP services</strong> to enable a scalable architecture for the entire organization to experiment with multiple use cases simultaneously, and to train, test, validate, and deploy on demand, reducing time to market.</li>
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
                    <div className="benefit-label">Reduction in time to market for ML use case lifecycle</div>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-percentage">50%</div>
                    <div className="benefit-label">Reduction in infrastructure & storage cost combined</div>
                  </div>
                  <div className="benefit-card">
                    <div className="benefit-percentage">100%</div>
                    <div className="benefit-label">teams onboarded to ML platform for model exploration and development</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="migration-plan">
            <h2>Architecture: AI/ML Pipeline</h2>
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
                <i className="fas fa-brain"></i>
                <span>Vertex AI</span>
              </div>
              <div className="tech-logo">
                <i className="fas fa-code"></i>
                <span>BigQuery ML</span>
              </div>
            </div>
            <div className="arch-visual-diagram">
              <div className="arch-row">
                <div className="arch-box data-sources">
                  <h4>Data Sources</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Salesforce</div>
                    <div className="arch-mini-box">Google Analytics</div>
                    <div className="arch-mini-box">Oracle DB</div>
                    <div className="arch-mini-box">Other Sources</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box data-integration">
                  <h4>Data Migration Services</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Dataflow</div>
                    <div className="arch-mini-box">Application Integration</div>
                    <div className="arch-mini-box">Data Transfer</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box data-storage">
                  <h4>GCP Data Layer Experimental</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Experimental BigQuery</div>
                    <div className="arch-mini-box">Cloud IAM</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box data-storage">
                  <h4>GCP Data Layer Production</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box highlight">Production BigQuery</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box applications">
                  <h4>AI/ML Experimental</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">Vertex AI</div>
                    <div className="arch-mini-box">BigQuery ML</div>
                    <div className="arch-mini-box">AutoML</div>
                    <div className="arch-mini-box">Experimental Repository</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box applications">
                  <h4>AI/ML Production</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box highlight">Vertex AI</div>
                    <div className="arch-mini-box">Prediction Cloud Endpoints</div>
                    <div className="arch-mini-box">API Gateway</div>
                    <div className="arch-mini-box">Production Repository</div>
                  </div>
                </div>
              </div>
              <div className="arch-connector"><i className="fas fa-arrow-down"></i></div>
              <div className="arch-row">
                <div className="arch-box analytics">
                  <h4>User/Reporting Layer</h4>
                  <div className="arch-box-content">
                    <div className="arch-mini-box">External Users</div>
                    <div className="arch-mini-box">BigQuery Analysts</div>
                    <div className="arch-mini-box">Jupyter (Power Users)</div>
                    <div className="arch-mini-box">BI Reports</div>
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

export default CaseStudyAIML
