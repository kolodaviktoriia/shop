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

export const signupApi = async (
  email,
  password,
  firstName,
  lastName,
  birthday
) => {
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signupError) throw signupError;

  const userId = signupData.user.id;

  const { data, error } = await supabase
    .from('profiles')
    .insert([{ id: userId, firstName, lastName, email, birthday }])
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const getProfileApi = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, addresses(*), billingAddresses(*)')
    .eq('id', userId)
    .single();

  if (error) throw error;

  const { addresses, billingAddresses, ...rest } = data;

  const { data: reviewedProducts, error: reviewError } = await supabase
    .from('reviews')
    .select('productId')
    .eq('userId', userId);

  if (reviewError) throw reviewError;

  const reviewedProductIds = reviewedProducts?.map((r) => r.productId) || [];

  const profileData = {
    ...rest,
    address: addresses,
    billingAddress: billingAddresses,
    reviewedProductIds,
  };

  return profileData;
};
export const updateProfileApi = async (profile, userId) => {
  const { firstName, lastName, birthday } = profile;

  const { error } = await supabase
    .from('profiles')
    .update({
      firstName,
      lastName,
      birthday,
    })
    .eq('id', userId);
  if (error) {
    throw error;
  }
};

export const updateShippingAddressApi = async (address, userId) => {
  const {
    firstName,
    lastName,
    street,
    houseNumber,
    postalCode,
    city,
    country,
    phone,
  } = address;

  const { error } = await supabase.from('addresses').upsert(
    {
      firstName,
      lastName,
      street,
      houseNumber,
      postalCode,
      city,
      country,
      phone,
      userId,
    },
    { onConflict: 'userId' }
  );
  if (error) {
    throw error;
  }
};

export const updateBillingAddressApi = async (address, userId) => {
  const {
    firstName,
    lastName,
    street,
    houseNumber,
    postalCode,
    city,
    country,
    phone,
  } = address;

  const { error } = await supabase.from('billingAddresses').upsert(
    {
      firstName,
      lastName,
      street,
      houseNumber,
      postalCode,
      city,
      country,
      phone,
      userId,
    },
    { onConflict: 'userId' }
  );
  if (error) {
    throw error;
  }
};
