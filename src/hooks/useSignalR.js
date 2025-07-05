import { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export const useSignalR = () => {
  const [connection, setConnection] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const connectionRef = useRef(null);
  const isDisconnectingRef = useRef(false);

  const createConnection = async (signalRUrl) => {
    // Clean up existing connection
    if (connectionRef.current) {
      try {
        await connectionRef.current.stop();
      } catch (error) {
        // Handle stop error silently
      }
    }

    const newConnection = new HubConnectionBuilder()
      .withUrl(signalRUrl, {
        // Add transport options to prevent some connection issues
        transport: 1 | 2 | 4, // WebSockets, ServerSentEvents, LongPolling
        withCredentials: false
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          // Custom retry logic
          if (retryContext.previousRetryCount === 0) {
            return 0; // First retry immediately
          }
          return Math.min(1000 * Math.pow(2, retryContext.previousRetryCount), 30000);
        }
      })
      .build();

    connectionRef.current = newConnection;
    return newConnection;
  };

  const connect = async (signalRUrl, eventHandlers = {}) => {
    if (isConnecting) return null;

    try {
      setIsConnecting(true);
      setError('');
      isDisconnectingRef.current = false;

      const newConnection = await createConnection(signalRUrl);

      // Register event handlers
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        newConnection.on(event, handler);
      });

      // Handle connection events
      newConnection.onclose((error) => {
        setConnection(null);
        
        // Only show error if it wasn't an intentional disconnect
        if (!isDisconnectingRef.current && error) {
          setError('Connection lost. Please reconnect.');
        }
      });

      newConnection.onreconnecting((error) => {
        setError('Reconnecting...');
      });

      newConnection.onreconnected((connectionId) => {
        setError('');
      });

      await newConnection.start();
      setConnection(newConnection);
      return newConnection;
    } catch (error) {
      setError('Failed to connect to chat server. Please try again.');
      return null;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    if (connectionRef.current) {
      try {
        // Mark that we're intentionally disconnecting
        isDisconnectingRef.current = true;
        
        // Clear the connection state first
        setConnection(null);
        
        // Check connection state before attempting to stop
        const currentConnection = connectionRef.current;
        if (currentConnection.state === 'Connected' || currentConnection.state === 'Connecting') {
          await currentConnection.stop();
        }
      } catch (error) {
        // Don't throw error for disconnect issues
      } finally {
        connectionRef.current = null;
        isDisconnectingRef.current = false;
      }
    }
  };

  const clearError = () => setError('');

  useEffect(() => {
    return () => {
      if (connectionRef.current) {
        isDisconnectingRef.current = true;
        connectionRef.current.stop().catch(() => {});
      }
    };
  }, []);

  return {
    connection,
    isConnecting,
    error,
    connect,
    disconnect,
    clearError
  };
};