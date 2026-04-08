import { mapProductImages } from '../helpers/mapProductImages.js';
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
    products: (data || []).map(mapProductImages),
    page: Number(page),
    total: count,
    totalPages: Math.ceil(count / limit),
  };
};

export const getProductApi = async (id) => {
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*, categories(name), collections(name)')
    .eq('id', id)
    .single();

  if (productError) throw productError;

  const { data: reviews = [], error: reviewsError } = await supabase
    .from('reviews')
    .select('rating')
    .eq('productId', id);

  if (reviewsError) throw reviewsError;

  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 5;

  return {
    ...mapProductImages(product),
    reviewCount,
    averageRating,
  };
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

export const addReviewApi = async (userId, review) => {
  const { orderId, productId, rating, comment } = review;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('id,  items')
    .eq('userId', userId)
    .eq('id', orderId)
    .single();

  if (orderError) {
    throw orderError;
  }

  if (!order) throw 'Could not find order.';
  const product = order.items?.find((i) => i.id == productId);
  if (!product) throw 'Product not found in order.';

  const { data, error } = await supabase
    .from('reviews')
    .insert({
      userId,
      productId,
      orderId,
      rating,
      comment,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const getReviewsApi = async (productId, filter) => {
  const { page = 1, limit = 10 } = filter;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('reviews')
    .select('*', { count: 'exact' })
    .eq('productId', productId)
    .order('createdAt', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    reviews: data,
    total: count,
  };
};
