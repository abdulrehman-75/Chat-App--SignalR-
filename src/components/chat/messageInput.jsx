import React, { useRef, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Common/input';
import Button from '../Common/button';

export const MessageInput = ({ onSendMessage, chatRoomName }) => {
  const inputRef = useRef(null);
  const formRef = useRef(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { message: '' },
  });

  // Memoize the focus function to prevent unnecessary re-renders
  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Focus on mount
    focusInput();
  }, [focusInput]);

  // Maintain focus when component re-renders (unless actively typing)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (document.activeElement !== inputRef.current) {
        focusInput();
      }
    }, 50);
    
    return () => clearTimeout(timer);
  });

  const onSubmit = async (data) => {
    if (data.message.trim() && onSendMessage) {
      try {
        await onSendMessage(data.message.trim());
        reset();
        
        // Multiple attempts to maintain focus
        focusInput();
        
        setTimeout(() => {
          focusInput();
        }, 10);
        
        requestAnimationFrame(() => {
          focusInput();
        });
        
        setTimeout(() => {
          focusInput();
        }, 100);
        
      } catch (error) {
        // Error handling is done in parent component
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.target.form.requestSubmit();
    }
  };

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-3 sm:p-4">
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex gap-2 sm:gap-3">
        <div className="flex-1 min-w-0">
          <Input
            ref={inputRef}
            type="text"
            placeholder={`Message #${chatRoomName}`}
            className="mb-0 text-sm sm:text-base"
            disabled={isSubmitting}
            {...register('message', {
              required: 'Message cannot be empty',
              maxLength: {
                value: 500,
                message: 'Message must be less than 500 characters',
              },
              validate: {
                notEmpty: (value) =>
                  value.trim().length > 0 || 'Message cannot be empty',
              },
            })}
            onKeyDown={handleKeyPress}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 sm:px-6 text-sm sm:text-base shrink-0"
          bgColor="bg-orange-600 hover:bg-orange-700"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-1 sm:mr-2"></div>
              <span className="hidden sm:inline">Sending...</span>
              <span className="sm:hidden">...</span>
            </div>
          ) : (
            'Send'
          )}
        </Button>
      </form>
    </div>
  );
};