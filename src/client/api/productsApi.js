import { supabase } from "./supabaseClient.js";


export const getProductsApi = async () => {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
};

export const getCategoriesApi = async () => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
    if (error) throw error;
    return data;
};