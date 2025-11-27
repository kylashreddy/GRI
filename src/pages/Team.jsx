import React from 'react'
import chair1 from '../assets/chair1.jpg'
import chair2 from '../assets/chair2.png'
import chair3 from '../assets/chair3.jpg'
import chair4 from '../assets/chair4.jpg'
import arulsir from '../assets/arulsir_1.jpg'
import beemsir from '../assets/beemsir.jpg'

export default function Team(){
  const facultyMembers = [
    { name: 'Dr. M John Basha', role: 'Assistant Professor CSE', image: '/assets/faculty-1.jpg'},
    { name: 'Dr. Sowmya M S', role: 'Assistant Professor CSE', image: '/assets/faculty-2.jpg'},
    {name : 'Dr.Victhitra M', role: 'Assistant Professor CIVIL', image: '/assets/faculty-5.jpg'},  
    { name: 'Ms. Agashini V. Kumar', role: 'Assistant Professor CSE', image: '/assets/faculty-3.jpg'},
    { name: 'Ms. Savitha R', role: 'Assistant Professor EEE', image: '/assets/faculty-4.jpg'},
    {name : 'Prof. Geetha Rani', role: 'Assistant Professor CSE', image: '/assets/faculty-6.jpg'},
  ];

  const studentCoordinators = [
    { name: 'Dharshan S', department: 'CSE-DS', year: '3rd Year', image: '/assets/student-1.jpg'},
    { name: 'Busireddy Kylash Reddy', department: 'CSE', year: '3rd Year', image: '/assets/student-2.jpg'},
    { name: 'Dharmanshoo Chopra', department: 'CSE-DS', year: '3rd Year', image: '/assets/student-3.jpg'},
    { name: 'Shaarukesh G V', department: 'CSE-DS', year: '3rd Year', image: '/assets/student-4.jpg'},
    { name: 'V Kusuma', department: 'CSE-DS', year: '3rd Year', image: '/assets/student-5.jpg'},
    { name: 'Navya S', department: 'CSE* C', year: '3rd Year', image: '/assets/student-6.jpg'},
    { name: 'Kushal', department: 'CSE-DS', year: '3rd Year', image: '/assets/student-7.jpg'},
    { name: 'Adithya Gowda', department: 'CSE', year: '2nd Year', image: '/assets/student-8.jpg'},
    { name: 'Nikhith Gowda', department: 'CSE Cyber Security', year: '2nd Year', image: '/assets/student-9.jpg'},
    { name: 'Yajamanyam Naga Ashok Kumar Sastri', department: 'CSE-DS', year: '2nd Year', image: '/assets/student-10.jpg'},
    { name: 'Smriti Shreya', department: 'CSE GEN B', year: '2nd Year', image: '/assets/student-11.jpg'},
    { name: 'Srishti Mishra', department: 'CSE GEN B', year: '2nd Year', image: '/assets/student-12.jpg'},
    { name: 'Kanishka J', department: 'CSE-AIDE', year: '2nd Year', image: '/assets/student-13.jpg'},
    { name: 'Sarika G Pawar', department: 'CSE-AIDE', year: '2nd Year', image: '/assets/student-14.jpg'},
  ];

  const honoraryChair = [
    { name: 'Prof. Anjula Gurtoo', role: 'Professor & Chair, Lab for Sustainable Solutions Department of Management Studies, Indian Institute of Science, Bangalore', image: chair4 }
  ];

  const chairMember = [
    { name: 'Dr.M. Arul Prakasajothi', role: 'Director – Innovation, JAIN University', image: arulsir }
  ];

  const coChairMember = [
    { name: 'Dr.N. Beemkumar', role: 'Deputy Dean (Research), JAIN University', image: beemsir }
  ];

  const honoraryMembers = [
    { name: 'Dr. K. Elangovan ', role: 'Assistant Innovation Director, Innovation Cell Ministry of Education', image: chair1 },
    { name: 'Dr. Gurubalan Annadurai ', role: 'Assistant Professor, Department of Energy Science and Engineering(IIT Bombay)', image: chair2 },
    { name: 'Mr. K. S. Rajamanokar ', role: 'CEO of Aquaconnect, Chennai', image: chair3 }
  ];



  return (
    <div className="team-container">
      <div className="section-heading" style={{textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        <div>
          <small style={{textAlign: 'center', display: 'block'}}>People</small>
          <h2>Our Team</h2>
          <p style={{color: 'var(--muted)', maxWidth: '600px', fontSize: '16px', lineHeight: '1.6', marginTop: '16px'}}>Discover the <strong>people</strong> driving innovation: our visionary leaders, dedicated faculty, and enthusiastic students working together to create impactful solutions.</p>
        </div>
      </div>

      {/* Honourable Members Section */}
      <div className="honourable-section">
        {/* Honorary chair */}
        <h3 style={{textAlign: 'center'}}>Honorary chair</h3>
        <div className="single-card">
          <div className="honourable-card">
            <div className="honourable-color-bar"></div>
            <div className="honourable-content">
              <div className="honourable-avatar">
                <img
                  src={honoraryChair[0].image}
                  alt={honoraryChair[0].name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span style="font-size: 28px; font-weight: bold; color: var(--brand);">${honoraryChair[0].name.charAt(0)}</span>`;
                  }}
                />
              </div>
              <h4 style={{textAlign: 'center'}}>{honoraryChair[0].name}</h4>
              <p style={{textAlign: 'center'}}>{honoraryChair[0].role}</p>
            </div>
          </div>
        </div>

        {/* Chair */}
        <h3 style={{textAlign: 'center'}}>Chair Person</h3>
        <div className="single-card">
          <div className="honourable-card">
            <div className="honourable-color-bar"></div>
            <div className="honourable-content">
              <div className="honourable-avatar">
                <img
                  src={chairMember[0].image}
                  alt={chairMember[0].name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span style="font-size: 28px; font-weight: bold; color: var(--brand);">${chairMember[0].name.charAt(0)}</span>`;
                  }}
                />
              </div>
              <h4 style={{textAlign: 'center'}}>{chairMember[0].name}</h4>
              <p style={{textAlign: 'center'}}>{chairMember[0].role}</p>
            </div>
          </div>
        </div>

        {/* Co-chair members */}
        <h3 style={{textAlign: 'center'}}>Co-chair Person</h3>
        <div className="single-card">
          <div className="honourable-card">
            <div className="honourable-color-bar"></div>
            <div className="honourable-content">
              <div className="honourable-avatar">
                <img
                  src={coChairMember[0].image}
                  alt={coChairMember[0].name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span style="font-size: 28px; font-weight: bold; color: var(--brand);">${coChairMember[0].name.charAt(0)}</span>`;
                  }}
                />
              </div>
              <h4 style={{textAlign: 'center'}}>{coChairMember[0].name}</h4>
              <p style={{textAlign: 'center'}}>{coChairMember[0].role}</p>
            </div>
          </div>
        </div>

        {/* Honorary members */}
        <h3>Honorary Mentors</h3>
        <div className="honourable-grid">
          {honoraryMembers.map((member, index) => (
            <div key={index} className="honourable-card">
              <div className="honourable-color-bar"></div>
              <div className="honourable-content">
                <div className="honourable-avatar">
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<span style="font-size: 28px; font-weight: bold; color: var(--brand);">${member.name.charAt(0)}</span>`;
                    }}
                  />
                </div>
                <h4>{member.name}</h4>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Section */}
      <div className="faculty-section">
        <h3>Faculty Co-ordinators</h3>

        <div className="faculty-grid">
          {facultyMembers.map((faculty, index) => (
            <div key={index} className="faculty-card">
              <div className="faculty-color-bar"></div>
              <div className="faculty-content">
                <div className="faculty-avatar">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<span style="font-size: 28px; font-weight: bold; color: var(--brand);">${faculty.name.charAt(0)}</span>`;
                    }}
                  />
                </div>
                <h4>{faculty.name}</h4>
                <p>{faculty.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Student Co-ordinators Section */}
      <div className="faculty-section">
        <h3>Student Co-ordinators</h3>

        <div className="faculty-grid">
          {studentCoordinators.map((student, index) => (
            <div key={index} className="faculty-card">
              <div className="faculty-color-bar"></div>
              <div className="faculty-content">
                <div className="faculty-avatar">
                  <img
                    src={student.image}
                    alt={student.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<span style="font-size: 28px; font-weight: bold; color: var(--brand);">${student.name.charAt(0)}</span>`;
                    }}
                  />
                </div>
                <h4>{student.name}</h4>
                <p>{student.department} - {student.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}