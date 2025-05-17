
import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';

export type Booking = {
  id?: string;
  user_id: string;
  booking_type: 'flight' | 'train' | 'bus' | 'car' | 'place';
  item_id: string;
  booking_date: string;
  start_date?: string;
  end_date?: string;
  total_price: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  details: Record<string, any>;
  created_at?: string;
};

export const getUserBookings = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getUserBookings:', error);
    return [];
  }
};

export const createBooking = async (booking: Booking) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select();
    
    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
    
    return data?.[0];
  } catch (error) {
    console.error('Error in createBooking:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, updates: Partial<User['user_metadata']>) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    });
    
    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
    
    return data.user;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw error;
  }
};

export const updateUserPassword = async (newPassword: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) {
      console.error('Error updating password:', error);
      throw error;
    }
    
    return data.user;
  } catch (error) {
    console.error('Error in updateUserPassword:', error);
    throw error;
  }
};
