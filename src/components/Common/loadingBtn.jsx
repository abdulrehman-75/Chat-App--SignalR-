import React from 'react';
import Button from '../Common/button';

export const LoadingButton = ({ 
  isLoading, 
  loadingText, 
  children, 
  ...buttonProps 
}) => {
  return (
    <Button disabled={isLoading} {...buttonProps}>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
};