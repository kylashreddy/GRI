import React from 'react'

export default function About(){
  return (
    <div className="grid" style={{gap:16}}>
      <section>
        <div className="section-heading">
          <div>
            <small style={{color:'var(--muted)'}}>Who we are</small>
            <h2>About GRI</h2>
          </div>
        </div>
        <div className="card" style={{padding:16}}>
          <p>
            Grassroots Innovation is about learning directly from communities — especially in villages — by observing how people creatively address everyday challenges with limited resources and immense wisdom.
          </p>
        </div>
      </section>
    </div>
  )
}
