import React from 'react';
import { AxiosError } from 'axios';

interface ErrorBoxProps {
  error: AxiosError
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ error }) => {
  let message = 'Error occured. Please try again.';
  if (error.response) {
    switch (error.response.status) {
      case 404:
        message = 'User not found. Please try again.';
        break;
      default:
        break;
    }
  } else if (error.request) {
    message = 'Network issue. Please try again.';
  }
  return <>{message}</>;
};
