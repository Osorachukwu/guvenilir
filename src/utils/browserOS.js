// Detect browser and OS information
export const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  let browser = 'Unknown';

  if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Firefox';
  } else if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Safari';
  } else if (userAgent.indexOf('Edge') > -1) {
    browser = 'Edge';
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    browser = 'Opera';
  }

  return browser;
};

export const detectOS = () => {
  const userAgent = navigator.userAgent;
  let OS = 'Unknown';

  if (userAgent.indexOf('Win') > -1) {
    OS = 'Windows';
  } else if (userAgent.indexOf('Mac') > -1) {
    OS = 'MacOS';
  } else if (userAgent.indexOf('Linux') > -1) {
    OS = 'Linux';
  } else if (userAgent.indexOf('Android') > -1) {
    OS = 'Android';
  } else if (userAgent.indexOf('like Mac') > -1) {
    OS = 'iOS';
  }

  return OS;
};

export const formatDate = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = dateObj.toDateString() === today.toDateString();
  const isYesterday = dateObj.toDateString() === yesterday.toDateString();

  if (isToday) {
    return `Today at ${dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } else if (isYesterday) {
    return `Yesterday at ${dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};
