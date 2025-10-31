import React from 'react';

interface DefaultProfileProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const DefaultProfile: React.FC<DefaultProfileProps> = ({ 
  src, 
  alt = 'Profile', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center rounded-full overflow-hidden bg-gray-200`}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      ) : (
        // WhatsApp-style default profile icon
        <svg 
          viewBox="0 0 212 212" 
          className={iconSizes[size]}
          fill="none"
        >
          <path
            d="M106.251 0.5C164.653 0.5 212 47.846 212 106.25C212 164.654 164.653 212 106.25 212C47.846 212 0.5 164.654 0.5 106.25C0.5 47.846 47.846 0.5 106.251 0.5Z"
            fill="#DFE5E7"
          />
          <path
            d="M173.561 171.615C168.726 168.887 162.962 167.194 156.851 167.194H55.15C49.038 167.194 43.274 168.887 38.439 171.615C45.533 181.819 54.428 190.476 64.709 197.191C74.99 203.906 86.454 208.555 98.635 210.877C110.816 213.199 123.474 213.158 135.639 210.756C147.804 208.354 159.234 203.634 169.461 196.864C179.688 190.094 188.518 181.396 195.562 171.158L173.561 171.615Z"
            fill="#B0BEC5"
          />
          <path
            d="M106.002 125.5C129.661 125.5 148.75 106.411 148.75 82.751C148.75 59.091 129.661 40.002 106.002 40.002C82.342 40.002 63.253 59.091 63.253 82.751C63.253 106.411 82.342 125.5 106.002 125.5Z"
            fill="#B0BEC5"
          />
        </svg>
      )}
    </div>
  );
};

export default DefaultProfile;