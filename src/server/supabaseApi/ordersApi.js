import { supabase } from "./supabaseClient.js";


export const getOrdersApi = async (userId) => {
    const { data, error } = await supabase
        .from('orders')
        .select(' id, status, createdAt, totalPrice')
        .eq('userId', userId)

    if (error) {
        if (error.code === 'PGRST116') return [];
        throw error;
    }

    return data;
};


export const getOrderApi = async (userId, orderId) => {
    const { data: order, error: orderError } = await supabase
        .from('orders')
        .select('id, createdAt, totalPrice, shippingPrice, itemsPrice, items, deliveryAddressId')
        .eq('userId', userId)
        .eq('id', orderId)
        .single();

    if (orderError) {
        if (orderError.code === 'PGRST116') return null;
        throw orderError;
    }

    if (!order) return null;

    let address = null;

    if (order.deliveryAddressId) {
        const { data: addr, error: addrError } = await supabase
            .from('orderAddresses')
            .select('firstName, lastName, street, houseNumber, postalCode, city, country, phone')
            .eq('id', order.deliveryAddressId)
            .single();

        if (addrError && addrError.code !== 'PGRST116') throw addrError;
        address = addr || null;
    }

    order.address = address;

    delete order.deliveryAddressId;

    return order;
};

export const createOrderApi = async (userId, order, paypalOrderId, jsonResponse) => {
    const { address, ...orderData } = order;
    const { data, error: addressError } = await supabase.from("orderAddresses").insert([
        { ...address }
    ]).select();

    if (addressError) {
        throw addressError;
    }
    const { data: orderInsertData, error } = await supabase.from("orders").insert([
        {
            ...orderData,
            paypalOrderId,
            deliveryAddressId: data[0].id,
            userId,
            status: "pending",
            rawPaypalResponse: jsonResponse
        }
    ]).select();

    if (error) {
        throw error;
    }
    return orderInsertData[0].id;
};

export const captureOrderApi = async (orderId, jsonResponse, status) => {
    const { data, error } = await supabase
        .from("orders")
        .update({
            status: String(status).toLowerCase(),
            captureResponse: jsonResponse
        })
        .eq("paypalOrderId", orderId)
        .select();

    if (error) {
        throw error;
    }

    return data?.[0]?.id;
};