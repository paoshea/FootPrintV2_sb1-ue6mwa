import React from 'react';
import { Link } from 'react-router-dom';
import fullLogo from '../../assets/logo/logo-full.svg';
import iconLogo from '../../assets/logo/logo-icon.svg';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

export function Logo({ variant = 'full', className = '' }: LogoProps) {
  return (
    <Link to="/" className={`inline-block ${className}`}>
      <img
        src={variant === 'full' ? fullLogo : iconLogo}
        alt="Footprint"
        className={variant === 'full' ? 'h-8' : 'h-10'}
      />
    </Link>
  );
}