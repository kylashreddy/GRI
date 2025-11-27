import React, { useState, useEffect } from 'react';
import { homeImages } from '../assets/galleryData';
import { Link } from 'react-router-dom';
import visit2Image from '../assets/2.jpg';

// Export pastVisits for use in FieldVisitDetail
export const pastVisits = [
  {
    title: "Devarakaggalahalli Village Visit",
    date: "2023-09-15",
    location: "Devarakaggalahalli, Karnataka",
    description: "Our team explored local agricultural practices including Ragi cultivation, silk worm production, and flower cultivation. We engaged with farmers to understand traditional farming techniques and challenges faced by the community.",
    image: homeImages[0].src,
    reportPath: "c:\\Users\\Admin\\Downloads\\GRI\\Report on GRI Visit 1.docx",
    highlights: [
      "Documented traditional Ragi cultivation methods",
      "Studied silk worm rearing practices",
      "Analyzed local flower production supply chain"
    ]
  },
  {
    title: "Visit-2 - Paduvanagere",
    date: "2025-11-22",
    location: "Paduvanagere",
    description: "Our team conducted a comprehensive field visit to Paduvanagere, focusing on community development, education, and agricultural practices. We engaged with local stakeholders to understand various challenges and opportunities in the region.",
    image: visit2Image,
    reportPath: "c:\\Users\\Admin\\Downloads\\GRI\\Report on GRI Visit 2.docx",
    highlights: [
      "Observed school related issues",
      "Traditional Ragi cultivation methods",
      "Studied silk worm rearing practices",
      "Analyzed local flower production supply chain"
    ]
  }
];

export default function FieldVisit() {
  const [futureVisits, setFutureVisits] = useState([]);

  // Since Firebase is removed, we'll use static data for now
  useEffect(() => {
    // Static future visits data (can be updated manually)
    const staticFutureVisits = [
      // Add future visits here if needed
    ];
    setFutureVisits(staticFutureVisits);
  }, []);

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <small style={{ color: 'var(--muted)' }}>Experiences</small>
        <h2>Field Visits</h2>
        <p style={{ maxWidth: '600px', margin: '10px auto' }}>
          Join our immersive field visits to rural communities and innovation centers.
          Experience firsthand the challenges and opportunities in rural development.
        </p>
      </div>

      {/* Future Visits */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{
          textAlign: 'center',
          fontSize: '28px',
          marginBottom: '30px',
          borderBottom: '2px solid var(--primary)',
          display: 'inline-block',
          paddingBottom: '10px'
        }}>
          Upcoming Field Visits
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '30px',
          margin: '0 auto',
          maxWidth: '1200px'
        }}>
          {futureVisits.length > 0 ? futureVisits.map((visit, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '180px',
                backgroundImage: `url(${visit.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
              <div style={{ padding: '20px' }}>
                <div style={{
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  marginBottom: '10px',
                  display: 'inline-block'
                }}>
                  {new Date(visit.date).toLocaleDateString()}
                </div>
                <h4>{visit.title}</h4>
                <p><strong>Location:</strong> {visit.location}</p>
                <p>{visit.description}</p>
                <button style={{
                  marginTop: '15px',
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  Register
                </button>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
              <h4>No upcoming field visits scheduled.</h4>
              <p>Please check back later.</p>
            </div>
          )}
        </div>
      </div>

      {/* Past Visit Section */}
      <div style={{ marginBottom: '60px' }}>
        <h3 style={{
          textAlign: 'center',
          fontSize: '28px',
          marginBottom: '30px',
          borderBottom: '2px solid var(--brand)',
          display: 'inline-block',
          paddingBottom: '10px'
        }}>
          Past Field Visits
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '30px',
          margin: '0 auto',
          maxWidth: '1200px'
        }}>
          {pastVisits.map((visit, index) => (
            <div key={index} style={{
              background: 'linear-gradient(135deg, white 0%, #f8f9fa 100%)',
              borderRadius: '12px',
              boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              transition: 'all 0.4s ease',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)';
              e.currentTarget.style.borderColor = 'rgba(var(--brand-rgb), 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(${visit.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                  padding: '20px 15px 10px',
                  color: 'white'
                }}>
                  <h4 style={{fontSize: '20px', marginBottom: '5px'}}>{visit.title}</h4>
                  <div style={{fontSize: '14px', opacity: '0.9'}}>{new Date(visit.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
                </div>
              </div>
              <div style={{ padding: '20px' }}>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(var(--brand-rgb), 0.1)',
                  color: 'var(--brand)',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  marginBottom: '12px',
                  fontWeight: '500'
                }}>
                  <span style={{marginRight: '5px'}}>📍</span> {visit.location}
                </div>
                <p style={{fontSize: '15px', lineHeight: '1.6', marginBottom: '15px'}}>{visit.description}</p>
                
                {visit.highlights && (
                  <div style={{marginTop: '15px'}}>
                    <h5 style={{fontSize: '16px', marginBottom: '10px', color: 'var(--brand)'}}>Key Highlights:</h5>
                    <ul style={{paddingLeft: '20px', margin: '0'}}>
                      {visit.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                    
                    {visit.reportPath && (
                      <div style={{marginTop: '20px', textAlign: 'center'}}>
                        <Link to={`/fieldvisit/${index}`} style={{
                          display: 'inline-block',
                          background: 'linear-gradient(135deg, var(--brand) 0%, rgba(var(--brand-rgb), 0.8) 100%)',
                          color: 'white',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: '600',
                          boxShadow: '0 4px 15px rgba(var(--brand-rgb), 0.3)',
                          transition: 'all 0.3s ease',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 8px 20px rgba(var(--brand-rgb), 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(var(--brand-rgb), 0.3)';
                        }}
                      >
                        <span style={{marginRight: '8px'}}>📄</span> Know More
                      </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
