// API Service for Burcfal Platform

const API_URL = 'https://burcu-net-tr-production.up.railway.app/api';

/**
 * Create a new booking
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Randevu oluşturulamadı');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get all bookings (Admin)
 */
export const getAllBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/bookings`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Randevular yüklenemedi');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Get bookings for a specific consultant
 */
export const getConsultantBookings = async (consultantId) => {
  try {
    const response = await fetch(`${API_URL}/bookings/consultant/${consultantId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Randevular yüklenemedi');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (bookingId, status) => {
  try {
    const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Randevu durumu güncellenemedi');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Health check
 */
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_URL.replace('/api', '')}/api/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Health Check Error:', error);
    throw error;
  }
};
