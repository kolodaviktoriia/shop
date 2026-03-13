import { supabase } from './supabaseClient.js';

export const getProductsApi = async (filter = {}) => {
  const { category, collection, search } = filter;

  let query = supabase.from('products').select(
    `
      *,
      categories(name),
      collections(name)
    `,
    { count: 'exact' }
  );

  if (category) query = query.eq('categoryId', category);
  if (collection) query = query.eq('collectionId', collection);
  if (search) query = query.ilike('title', `%${search}%`);

  const { data, error } = await query;
  if (error) throw error;

  return data;
};

export const getProductApi = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select(
      `
      *,
      categories(name),
      collections(name)
    `
    )
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

export const getCategoriesApi = async () => {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data;
};

export const getCollectionsApi = async () => {
  const { data, error } = await supabase.from('collections').select('*');
  if (error) throw error;
  return data;
};

export const getFavoritesApi = async (userId) => {
  const { data, error } = await supabase
    .from('favorites')
    .select('id, products(*)')
    .eq('userId', userId)
    .order('createdAt', { ascending: false });

  if (error) throw error;

  const favorites = data.map((fav) => ({
    ...fav.products,
    favoriteId: fav.id,
  }));
  return favorites ?? [];
};

export const addFavoriteApi = async (userId, productId) => {
  const { data, error } = await supabase
    .from('favorites')
    .upsert({ userId, productId }, { onConflict: 'userId,productId' })
    .select();

  if (error) throw error;

  return data;
};

export const deleteFavoriteApi = async (favoriteId) => {
  const { data, error } = await supabase
    .from('favorites')
    .delete()
    .eq('id', favoriteId)
    .select();
  if (error) throw error;

  return data;
};
