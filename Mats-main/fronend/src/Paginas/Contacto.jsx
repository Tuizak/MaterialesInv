import React from 'react';
import './Desing/ContactoDesing.css';
import camionImage from '../../public/camion.jpg'; 

const Contacto = () => {
  return (
    <div className="contacto-page">
      <div className="contacto-split-container">
        <div className="contacto-image-section">
          <img src={camionImage} alt="Camión" />
          <div className="contacto-overlay">
            <h2>Materiales Rojo</h2>
            <p>Tu socio en construcción y materiales de calidad.</p>
          </div>
        </div>
        <div className="contacto-info-section">
          <h2>Información de Contacto</h2>
          <p><strong>Teléfono:</strong> (55) 6538495427</p>
          <p><strong>Correo:</strong> Mchuy98rojo@gmail.com</p>
          <p><strong>Dirección:</strong> Ley de alfabetización 18 y 19</p>
          
          {}
          <div className="contacto-social-media">
            <a 
              href="https://www.facebook.com/profile.php?id=61567160294128&mibextid=LQQJ4d" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="facebook-link"
            >
              {}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32" height="32"
                viewBox="0 0 24 24"
                fill="#4267B2"
              >
                <path d="M22.675 0h-21.35c-.733 0-1.325.593-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.129v-3.622h3.129v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.732 0 1.324-.593 1.324-1.326v-21.348c0-.733-.592-1.326-1.325-1.326z"/>
              </svg>
              <span>Visítanos en Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
