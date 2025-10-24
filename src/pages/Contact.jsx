import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'

export default function Contact(){
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Add message to Firebase
      await addDoc(collection(db, 'contact_us'), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: serverTimestamp(),
        read: false
      })

      setSubmitStatus({ 
        type: 'success', 
        message: 'Message sent successfully! We will get back to you soon.' 
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })

      // Clear success message after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000)
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again.' 
      })
    }

    setIsSubmitting(false)
  }
  return (
    <div className="grid" style={{gap:32}}>
      <div className="section-heading" style={{textAlign:'center', justifyContent:'center'}}>
        <div>
          <small style={{color:'var(--muted)'}}>Say hello</small>
          <h2>Contact</h2>
        </div>
      </div>

      <div className="card" style={{padding:24, textAlign:'center'}}>
        <h3 style={{fontSize:'clamp(20px, 2.5vw, 28px)', marginBottom:16, color:'var(--text)'}}>Get in Touch</h3>
        <p style={{fontSize:'clamp(16px, 1.4vw, 18px)', lineHeight:1.6, color:'var(--muted)', maxWidth:'700px', margin:'0 auto 24px'}}>
          Have questions about our grassroot innovation programs? Want to collaborate or contribute? We'd love to hear from you.
        </p>
      </div>

      <div className="card-grid" style={{gap:20}}>
        <article className="card">
          <div className="body" style={{textAlign:'center'}}>
            <h3>Address</h3>
            <p>JAIN (Deemed-to-be-University)<br />45th km, NH - 209,Jakkasandra Post, Bengaluru - Kanakapura Rd, Bengaluru, Karnataka 562112<br />India</p>
          </div>
        </article>
        
        <article className="card">
          <div className="body" style={{textAlign:'center'}}>
            <h3>Email</h3>
            <p><a href="mailto:griresearch.jain@gmail.com" style={{color:'var(--brand)'}}>griresearch.jain@gmail.com</a></p>
          </div>
        </article>
        
        <article className="card">
          <div className="body" style={{textAlign:'center'}}>
            <h3>Office Hours</h3>
            <p>Monday - Friday<br />9:00 AM - 6:00 PM IST</p>
          </div>
        </article>
      </div>

      <div className="card" style={{padding:32, background:'linear-gradient(135deg, #fafbfc 0%, #f8f9fa 100%)', border:'2px solid var(--border)'}}>
        <h3 style={{fontSize:'clamp(18px, 2vw, 24px)', marginBottom:24, color:'var(--text)', textAlign:'center'}}>Send us a Message</h3>
        
        {submitStatus && (
          <div style={{
            padding: 12,
            marginBottom: 16,
            borderRadius: 8,
            backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
            color: submitStatus.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            textAlign: 'center'
          }}>
            {submitStatus.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={{display:'grid', gap:16, maxWidth:600, margin:'0 auto'}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
            <input 
              name="name"
              placeholder="Your name" 
              value={formData.name}
              onChange={handleChange}
              style={{
                padding:12, 
                borderRadius:8, 
                border:'1px solid var(--border)', 
                background:'white', 
                color:'var(--text)',
                fontSize:14
              }} 
            />
            <input 
              name="email"
              placeholder="Email" 
              type="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                padding:12, 
                borderRadius:8, 
                border:'1px solid var(--border)', 
                background:'white', 
                color:'var(--text)',
                fontSize:14
              }} 
            />
          </div>
          
          <input 
            name="subject"
            placeholder="Subject" 
            value={formData.subject}
            onChange={handleChange}
            style={{
              padding:12, 
              borderRadius:8, 
              border:'1px solid var(--border)', 
              background:'white', 
              color:'var(--text)',
              fontSize:14
            }} 
          />
          
          <textarea 
            name="message"
            placeholder="Your message" 
            rows="5" 
            value={formData.message}
            onChange={handleChange}
            style={{
              padding:12, 
              borderRadius:8, 
              border:'1px solid var(--border)', 
              background:'white', 
              color:'var(--text)',
              fontSize:14,
              resize:'vertical'
            }} 
          />
          
          <button 
            className="btn" 
            type="submit"
            disabled={isSubmitting}
            style={{
              fontSize:'16px', 
              padding:'12px 24px',
              justifySelf:'center',
              maxWidth:'200px',
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  )
}
