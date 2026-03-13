import { supabase } from './supabaseClient.js';

export const getCartApi = async (userId) => {
  const { data, error } = await supabase
    .from('carts')
    .select('items')
    .eq('userId', userId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return [];
    throw error;
  }

  const updatedItems = await updateItemsPrice(data.items);
  return updatedItems;
};

export const saveCartApi = async (userId, items) => {
  const updatedItems = await updateItemsPrice(items);

  const { data, error } = await supabase
    .from('carts')
    .upsert({ userId, items: updatedItems }, { onConflict: 'userId' });

  if (error) throw error;

  return data;
};

const updateItemsPrice = async (items) => {
  if (!items || items.length === 0) return [];

  const productIds = items.map((item) => item.id);

  const { data: products, error } = await supabase
    .from('products')
    .select('id, price')
    .in('id', productIds);

  if (error) throw error;

  const productPriceMap = {};
  products.forEach((p) => (productPriceMap[p.id] = p.price));

  return items.map((item) => ({
    ...item,
    price: productPriceMap[item.id] ?? item.price,
  }));
};
