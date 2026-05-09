import React from 'react'
import whatsappIcon from "../assets/whatsapp-icon.svg"

export default function WhatsAppWidget() {
    const phoneNumber = "+447492218174";

    const handleWhatsAppClick = () => {
        const cleanNumber = phoneNumber.replace(/\D/g, '');
        const whatsappUrl = `https://wa.me/${cleanNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <style>{`
                @keyframes wa-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45); }
                    50% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
                }
                .wa-widget {
                    animation: wa-pulse 2.5s ease-in-out infinite;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }
                .wa-widget:hover {
                    transform: scale(1.05);
                    box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4) !important;
                    animation: none;
                }
                .wa-widget:active {
                    transform: scale(0.97);
                }
            `}</style>

            <button
                onClick={handleWhatsAppClick}
                className="wa-widget fixed bottom-8 left-4 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-white text-sm font-medium cursor-pointer border-0 outline-none"
                style={{ background: 'linear-gradient(135deg, #25D366 0%, #1ebe5c 100%)' }}
            >
                <img src={whatsappIcon} alt="" width={20} height={20} />
                <span>Chat with us</span>
            </button>
        </>
    );
}


//NOTE: icon-only on mobile, label(the text "chat with us") shows on larger screens
// import React from 'react'
// import whatsappIcon from "../assets/whatsapp-icon.svg"

// export default function WhatsAppWidget() {
//     const phoneNumber = "+447492218174";

//     const handleWhatsAppClick = () => {
//         const cleanNumber = phoneNumber.replace(/\D/g, '');
//         const whatsappUrl = `https://wa.me/${cleanNumber}`;
//         window.open(whatsappUrl, '_blank');
//     };

//     return (
//         <>
//             <style>{`
//                 @keyframes wa-pulse {
//                     0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45); }
//                     50% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
//                 }
//                 .wa-widget {
//                     animation: wa-pulse 2.5s ease-in-out infinite;
//                     transition: transform 0.2s ease, box-shadow 0.2s ease;
//                 }
//                 .wa-widget:hover {
//                     transform: scale(1.05);
//                     box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4) !important;
//                     animation: none;
//                 }
//                 .wa-widget:active {
//                     transform: scale(0.97);
//                 }
//             `}</style>

//             <button
//                 onClick={handleWhatsAppClick}
//                 className="wa-widget fixed bottom-6 right-5 z-50 flex items-center gap-2.5 rounded-full text-white font-medium cursor-pointer border-0 outline-none
//                            p-3 sm:px-5 sm:py-3"
//                 style={{ background: 'linear-gradient(135deg, #25D366 0%, #1ebe5c 100%)' }}
//                 aria-label="Chat with us on WhatsApp"
//             >
//                 <img src={whatsappIcon} alt="" width={22} height={22} className="shrink-0" />
//                 <span className="hidden sm:inline text-sm">Chat with us</span>
//             </button>
//         </>
//     );
// }