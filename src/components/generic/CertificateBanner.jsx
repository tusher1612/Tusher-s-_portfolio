import './CertificateBanner.scss'
import React from 'react'

function CertificateBanner({ certificate }) {
    return (
        <div className="certificate-banner">
            <div className="certificate-image-container">
                <img 
                    src={certificate.img} 
                    alt={certificate.title}
                    className="certificate-image"
                />
            </div>
            
            <div className="certificate-content">
                <h3 className="certificate-title">
                    <span dangerouslySetInnerHTML={{ __html: certificate.title }} />
                </h3>
                
                <div className="certificate-date">
                    {certificate.dateInterval}
                </div>
                
                <p className="certificate-description">
                    {certificate.text}
                </p>
            </div>
        </div>
    )
}

export default CertificateBanner