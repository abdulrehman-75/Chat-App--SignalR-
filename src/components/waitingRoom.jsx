import React from 'react';
import { useForm } from 'react-hook-form';
import { FormField } from './Common/formFeild.jsx';
import { LoadingButton } from './Common/loadingBtn.jsx';

export default function WaitingRoom({ onJoinChatRoom, isConnecting = false }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      username: '',
      chatroom: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      if (onJoinChatRoom) {
        await onJoinChatRoom(data);
      }
    } catch (error) {
      // Error handling is done in parent component
    }
  };

  const isLoading = isSubmitting || isConnecting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join Chat Room</h1>
          <p className="text-gray-400">Enter your details to start chatting</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
            register={register}
            errors={errors}
            disabled={isLoading}
            validation={{
              required: 'Username is required',
              minLength: {
                value: 2,
                message: 'Username must be at least 2 characters'
              },
              maxLength: {
                value: 20,
                message: 'Username must be less than 20 characters'
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: 'Username can only contain letters, numbers, and underscores'
              }
            }}
          />

          <FormField
            label="Chat Room"
            name="chatroom"
            type="text"
            placeholder="Enter chat room name"
            register={register}
            errors={errors}
            disabled={isLoading}
            validation={{
              required: 'Chat room name is required',
              minLength: {
                value: 2,
                message: 'Chat room name must be at least 2 characters'
              },
              maxLength: {
                value: 30,
                message: 'Chat room name must be less than 30 characters'
              },
              pattern: {
                value: /^[a-zA-Z0-9_-]+$/,
                message: 'Chat room name can only contain letters, numbers, hyphens, and underscores'
              }
            }}
          />

          <LoadingButton
            type="submit"
            className="w-full py-3 text-lg font-semibold"
            isLoading={isLoading}
            loadingText={isConnecting ? 'Connecting...' : 'Joining...'}
          >
            Join Chat Room
          </LoadingButton>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">Make sure to choose a unique username</p>
        </div>
      </div>
    </div>
  );
}