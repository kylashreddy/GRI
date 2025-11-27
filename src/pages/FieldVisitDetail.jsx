import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { pastVisits } from './FieldVisit';

export default function FieldVisitDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleBackToFieldVisits = () => {
    navigate('/fieldvisit');
  };

  useEffect(() => {
    // Find the visit with the matching ID
    if (pastVisits && pastVisits.length > 0) {
      const foundVisit = pastVisits.find((v, index) => index.toString() === id);
      setVisit(foundVisit);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="loader"></div>
        <p>Loading visit details...</p>
      </div>
    );
  }

  if (!visit) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px',
        maxWidth: '800px',
        margin: '0 auto' 
      }}>
        <h2>Visit Not Found</h2>
        <p>Sorry, we couldn't find the field visit you're looking for.</p>
        <Link to="/fieldvisit" style={{
          display: 'inline-block',
          marginTop: '20px',
          background: 'var(--brand)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600'
        }}>
          Back to Field Visits
        </Link>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1000px', 
      margin: '0 auto', 
      padding: '40px 20px' 
    }}>
      <div style={{ marginBottom: '30px' }}>
        <Link to="/fieldvisit" style={{
          display: 'inline-flex',
          alignItems: 'center',
          color: 'var(--brand)',
          textDecoration: 'none',
          fontWeight: '500',
          transition: 'all 0.3s ease'
        }}>
          <span style={{ marginRight: '8px' }}>←</span> Back to Field Visits
        </Link>
      </div>

      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        overflow: 'hidden'
      }}>
        <div style={{
          height: '300px',
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
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            padding: '30px 20px 20px',
            color: 'white'
          }}>
            <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>{visit.title}</h1>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              fontSize: '16px', 
              opacity: '0.9' 
            }}>
              <span style={{ marginRight: '15px' }}>
                <span style={{ marginRight: '8px' }}>📅</span>
                {new Date(visit.date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
              </span>
              <span>
                <span style={{ marginRight: '8px' }}>📍</span>
                {visit.location}
              </span>
            </div>
          </div>
        </div>

        <div style={{ padding: '30px' }}>
          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '24px', 
              marginBottom: '15px',
              color: 'var(--text-dark)'
            }}>Overview</h2>
            <p style={{ 
              fontSize: '16px', 
              lineHeight: '1.7', 
              color: 'var(--text)' 
            }}>
              {visit.description}
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h2 style={{ 
              fontSize: '24px', 
              marginBottom: '15px',
              color: 'var(--text-dark)'
            }}>Key Highlights</h2>
            <ul style={{ 
              paddingLeft: '20px',
              fontSize: '16px',
              lineHeight: '1.7',
              color: 'var(--text)'
            }}>
              {visit.highlights.map((highlight, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>{highlight}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 style={{ 
              fontSize: '24px', 
              marginBottom: '15px',
              color: 'var(--text-dark)'
            }}>Detailed Report</h2>
            <p style={{ 
              fontSize: '16px', 
              lineHeight: '1.7', 
              color: 'var(--text)',
              marginBottom: '20px'
            }}>
              The detailed report for this field visit includes comprehensive findings, 
              methodologies, and insights gathered during our visit to {visit.location}.
            </p>

            <div style={{
              background: 'rgba(var(--brand-rgb), 0.05)',
              borderRadius: '12px',
              padding: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <div>
                <h3 style={{ 
                  fontSize: '18px', 
                  marginBottom: '8px',
                  color: 'var(--text-dark)'
                }}>
                  Complete Field Visit Report
                </h3>
                <p style={{ 
                  fontSize: '14px', 
                  color: 'var(--text)',
                  margin: '0'
                }}>
                  Download the full report document for detailed information
                </p>
              </div>
              <a href={visit.reportPath} download style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'var(--brand)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(var(--brand-rgb), 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(var(--brand-rgb), 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(var(--brand-rgb), 0.3)';
              }}>
                <span style={{ marginRight: '8px' }}>📄</span> Download Report
              </a>
            </div>
          </section>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={handleBackToFieldVisits} style={{
          display: 'inline-flex',
          alignItems: 'center',
          background: 'var(--brand)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          fontWeight: '600',
          boxShadow: '0 4px 15px rgba(var(--brand-rgb), 0.3)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(var(--brand-rgb), 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(var(--brand-rgb), 0.3)';
        }}>
          <span style={{ marginRight: '8px' }}>←</span> Back to Field Visits
        </button>
      </div>
    </div>
  );
}
