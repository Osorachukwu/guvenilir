import React from 'react'
import whatsappIcon from "../assets/whatsapp-icon.svg"

export default function WhatsAppWidget() {
    const phoneNumber = "+447492218174"; // Removed spaces and parentheses for URL
    
    const handleWhatsAppClick = () => {
        // Remove any non-numeric characters and ensure it's in the right format
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${cleanNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <button 
            onClick={handleWhatsAppClick}
            className='btn bg-[#4DC247] border-0 rounded-full fixed bottom-10 text-white text-lg z-50 flex items-center gap-2'
        >
           <img src={whatsappIcon} alt="whatsapp" width={28} /> 
           Chat Us
        </button>
    )
}