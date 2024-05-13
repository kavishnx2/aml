import { useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import '../styles/Navbar.css';

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const currentURL = window.location.href;

  const url = new URL(currentURL);

  const path = url.pathname;

  console.log('Path: ' + path); // This will log "/integration"

  return (
    <header>
      <nav ref={navRef} style={{ zIndex: '1' }}>
        <a
          href="/"
          style={{ textDecoration: path == '/' ? 'underline' : 'none' }}
        >
          Overview
        </a>
        <a
          href="/integration"
          style={{
            textDecoration: path == '/integration' ? 'underline' : 'none',
          }}
        >
          Integration
        </a>
        <a
          href="/documentation"
          style={{
            textDecoration: path == '/documentation' ? 'underline' : 'none',
          }}
        >
          Documentation
        </a>

        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>

      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>

      <h3>LOGO</h3>
    </header>
  );
}

export default Navbar;
