import { supabase } from "./supabaseClient.js";


export const getOrdersApi = async (userId) => {
    const { data, error } = await supabase
        .from('orders')
        .select(' id, status, createdAt, totalPrice')
        .eq('userId', userId)
        .order('createdAt', { ascending: false });

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

    const {
        firstName,
        lastName,
        street,
        houseNumber,
        postalCode,
        city,
        country,
        phone
    } = address;

    const { data: existingUserAddresses, error: fetchError } = await supabase
        .from("addresses")
        .select("*")
        .eq("userId", userId)
        .limit(1);

    if (fetchError) {
        throw fetchError;
    }

    if (!existingUserAddresses || existingUserAddresses.length === 0) {
        const { error: addAddressError } = await supabase
            .from("addresses")
            .insert([{
                firstName,
                lastName,
                street,
                houseNumber,
                postalCode,
                city,
                country,
                phone,
                userId
            }]);

        if (addAddressError) {
            throw addAddressError;
        }
    }


    const { data, error: addressError } = await supabase.from("orderAddresses").insert([
        {
            firstName,
            lastName,
            street,
            houseNumber,
            postalCode,
            city,
            country,
            phone
        }
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