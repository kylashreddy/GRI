import React, { useState } from 'react'
import { galleryImages } from '../assets/galleryData'

export default function Gallery(){
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedImage, setSelectedImage] = useState(null)

  // Get unique categories
  const categories = ['All', ...new Set(galleryImages.map(img => img.category))]

  // Filter images based on active filter
  const filteredImages = activeFilter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter)

  return (
    <div className="gallery-container">
      <div className="section-heading" style={{textAlign: 'center', marginBottom: '40px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <small style={{color:'var(--muted)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px'}}>Visual Stories</small>
        <h2 style={{margin: '8px 0 16px', fontSize: 'clamp(28px, 4vw, 42px)'}}>Our Gallery</h2>
        <p style={{color: 'var(--muted)', maxWidth: '600px', fontSize: '16px', lineHeight: '1.6'}}>Explore moments from our grassroot innovation journey, showcasing community engagement, student projects, and rural impact initiatives.</p>
        </div>

      {/* Filter Buttons */}
      <div className="gallery-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
            style={{'--delay': `${index * 0.1}s`}}
          >
            <div className="image-container">
              <img 
                src={image.src} 
                alt={image.caption}
                loading="lazy"
              />
              <div className="image-overlay">
                <div className="image-info" style={{textAlign:'center'}}>
                  <span className="image-category">{image.category}</span>
                  <h3 className="image-title">{image.caption}</h3>
                  <button className="view-btn">View Full Size</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Count */}
      <div className="gallery-stats" style={{textAlign:'center'}}>
        <p>Showing {filteredImages.length} of {galleryImages.length} images</p>
      </div>

      {/* Modal for full-size image */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.caption} />
            <div className="modal-info" style={{textAlign:'center'}}>
              <span className="modal-category">{selectedImage.category}</span>
              <h3>{selectedImage.caption}</h3>
            </div>
            <button className="close-btn" onClick={() => setSelectedImage(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  )
}