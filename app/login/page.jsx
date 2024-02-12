import { useState } from 'react';

export default function loggingIn({ cartDetails }) {
  const [loading, setLoading] = useState(false);

  const handleLoggingIn = async () => {

    try {
      setLoading(true);
      const response = await fetch('/api/login', {
        method: 'GET',
        
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({cartDetails})
      });
      if (!response.ok) {
        throw new Error('Failed to fetch order data');
      }

    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <html>
        <p>hello</p>
    </html>
  )
}