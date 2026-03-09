import { supabase } from "./supabaseClient.js";


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

    return data.items;
};

export const saveCartApi = async (userId, items) => {
    const { data, error } = await supabase
        .from("carts")
        .upsert({
            userId: userId,
            items
        });

    if (error) throw error;

    return data;
};
