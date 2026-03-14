import { supabase } from './supabaseClient.js';

export const getProductsApi = async (filter = {}) => {
  const { category, collection, search, page = 1, limit = 12 } = filter;
  const safePage = Number(page);
  const safeLimit = Number(limit);
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit - 1;

  let query = supabase
    .from('products')
    .select(
      `
      *,
      categories(name),
      collections(name)
    `,
      { count: 'exact' }
    )
    .order('title', { ascending: true })
    .range(from, to);

  if (category) query = query.eq('categoryId', category);
  if (collection) query = query.eq('collectionId', collection);
  if (search) query = query.ilike('title', `%${search}%`);

  const { data, count, error } = await query;
  if (error)
    return {
      products: [],
      page: 1,
      total: 0,
      totalPages: 1,
    };

  return {
    products: data,
    page: Number(page),
    total: count,
    totalPages: Math.ceil(count / limit),
  };
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
