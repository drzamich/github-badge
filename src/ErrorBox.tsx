import React from 'react';
import { Heading } from './styles';

interface ErrorBoxProps {
  error: Error
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ error }) => <Heading>{error.message}</Heading>;
