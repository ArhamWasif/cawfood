import React from 'react'
import './Footer.css'
export default function Footer() {
  return (
    <div>
      <footer className="footer-container">
      {/* <div className="footer-links">
        <ul>
          <li>About Us</li>
          <li>Privacy Policy</li>
          <li>Terms &amp; Conditions</li>
        </ul>
      </div> */}
      <div className="footer-contact">
        <p>CONTACT</p>
        <p>Call +923022224797
        </p>
      </div>
      <div className="footer-help">
        <p>HELP</p>
      </div>
      <div className="footer-copyright">
        <span className="text-muted">© 2023 <i>Caw Food</i>, Inc</span>
      </div>
    </footer>
    </div>
  )
}
