import { useEffect, useState } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X
} from 'lucide-react';

const TimedAlert = ({
  text,
  duration = 5000,
  type,
  onClose,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  // Get icon component based on type
  const getIconComponent = () => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return XCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
      default: return Info;
    }
  };

  const IconComponent = getIconComponent();

  // Type-specific styling
  const alertStyles = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      startExitAnimation();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const startExitAnimation = () => {
    setIsExiting(true);
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 300); // Match this with your fadeOut animation duration
  };

  const handleClose = () => {
    startExitAnimation();
  };

  // Return null if not visible (removes from DOM)
  if (!isVisible) return null;

  return (
    <div
      role="alert"
      className={`alert rounded-none absolute top-0 w-full ${alertStyles[type]} transition-all duration-300 ease-in-out ${className} ${isExiting ? 'animate-fadeOut' : 'animate-fadeIn'
        }`}
    >
      <IconComponent className="h-6 w-6 shrink-0 stroke-current" />
      <span className='text-base'>{text}</span>

      <button
        className="btn btn-ghost btn-square btn-xs ml-auto text-base"
        onClick={handleClose}
        aria-label="Close alert"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default TimedAlert;