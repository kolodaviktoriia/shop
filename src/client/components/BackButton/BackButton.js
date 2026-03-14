import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import IconButton from '../IconButton/IconButton.js';

const BackButton = ({ to, label, ...props }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(to ?? -1);
  };
  return (
    <IconButton
      onClick={handleBack}
      label={label ?? 'Back'}
      Icon={ChevronLeftIcon}
      to={to}
      {...props}
    />
  );
};

export default BackButton;
