import { supabase } from './supabaseClient.js';

export const loginApi = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
};

export const getUserApi = async (token) => {
  const { data, error: authError } = await supabase.auth.getUser(token);
  if (authError) throw authError;

  return data.user;
};

export const signupApi = async (email, password, firstName, lastName) => {
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signupError) throw signupError;

  const userId = signupData.user.id;

  const { data, error } = await supabase
    .from('profiles')
    .insert([{ id: userId, firstName, lastName, email }])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, addresses(*)')
    .eq('id', userId)
    .single();

  if (error) throw error;

  const profileWithAddress = {
    ...data,
    address: data.addresses?.[0] || null,
  };

  delete profileWithAddress.addresses;

  return profileWithAddress;
};
