import { supabase } from './supabaseClient.js';

export const getOrdersApi = async (userId, filter) => {
  const { page = 1, limit = 6 } = filter;

  const { count } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('userId', userId);

  const totalPages = Math.ceil(count / limit);

  const safePage = Math.min(Number(page), totalPages || 1);
  const safeLimit = Number(limit);
  const from = (safePage - 1) * safeLimit;
  const to = from + safeLimit - 1;

  const { data, error } = await supabase
    .from('orders')
    .select(' id, status, createdAt, totalPrice')
    .eq('userId', userId)
    .order('createdAt', { ascending: false })
    .range(from, to);

  if (error) {
    if (error.code === 'PGRST116') return [];
    throw error;
  }

  return {
    orders: data,
    page: Number(page),
    total: count,
    totalPages: Math.ceil(count / limit),
  };
};

export const getOrderApi = async (userId, orderId) => {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select(
      'id, createdAt, totalPrice, shippingPrice, itemsPrice, items, deliveryAddressId,  billingAddressId, status'
    )
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
      .select(
        'firstName, lastName, street, houseNumber, postalCode, city, country, phone'
      )
      .eq('id', order.deliveryAddressId)
      .single();

    if (addrError && addrError.code !== 'PGRST116') throw addrError;
    address = addr || null;
  }

  order.address = address;

  delete order.deliveryAddressId;

  let billingAddress = null;
  if (order.billingAddressId) {
    const { data: billingAddr, error: billingAddrError } = await supabase
      .from('orderBillingAddresses')
      .select(
        'firstName, lastName, street, houseNumber, postalCode, city, country, phone'
      )
      .eq('id', order.billingAddressId)
      .single();

    if (billingAddrError && billingAddrError.code !== 'PGRST116')
      throw billingAddrError;
    billingAddress = billingAddr || null;
  }

  order.billingAddress = billingAddress;

  delete order.billingAddressId;

  return order;
};

export const createOrderApi = async (
  userId,
  order,
  paypalOrderId,
  jsonResponse,
  orderId
) => {
  if (orderId) {
    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({
        paypalOrderId,
        rawPaypalResponse: jsonResponse,
      })
      .eq('id', orderId)
      .select();

    if (updateError) throw updateError;

    return updatedOrder[0].id;
  }

  const { address, billingAddress, ...orderData } = order;

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

  const { data: existingUserAddresses, error: fetchError } = await supabase
    .from('addresses')
    .select('*')
    .eq('userId', userId)
    .limit(1);

  if (fetchError) {
    throw fetchError;
  }

  if (!existingUserAddresses || existingUserAddresses.length === 0) {
    const { error: addAddressError } = await supabase.from('addresses').insert([
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
    ]);

    if (addAddressError) {
      throw addAddressError;
    }
  }

  const { data, error: addressError } = await supabase
    .from('orderAddresses')
    .insert([
      {
        firstName,
        lastName,
        street,
        houseNumber,
        postalCode,
        city,
        country,
        phone,
      },
    ])
    .select();

  if (addressError) {
    throw addressError;
  }

  const {
    firstName: billingFirstName,
    lastName: billingLastName,
    street: billingStreet,
    houseNumber: billingHouseNumber,
    postalCode: billingPostalCode,
    city: billingCity,
    country: billingCountry,
    phone: billingPhone,
  } = billingAddress;

  const { data: existingBillingAddresses, error: fetchBillingError } =
    await supabase
      .from('billingAddresses')
      .select('*')
      .eq('userId', userId)
      .limit(1);

  if (fetchBillingError) throw fetchBillingError;

  if (!existingBillingAddresses || existingBillingAddresses.length === 0) {
    const { error: addBillingAddressError } = await supabase
      .from('billingAddresses')
      .insert([
        {
          firstName: billingFirstName,
          lastName: billingLastName,
          street: billingStreet,
          houseNumber: billingHouseNumber,
          postalCode: billingPostalCode,
          city: billingCity,
          country: billingCountry,
          phone: billingPhone,
          userId,
        },
      ]);

    if (addBillingAddressError) throw addBillingAddressError;
  }

  const { data: billingAddressData, error: orderBillingError } = await supabase
    .from('orderBillingAddresses')
    .insert([
      {
        firstName: billingFirstName,
        lastName: billingLastName,
        street: billingStreet,
        houseNumber: billingHouseNumber,
        postalCode: billingPostalCode,
        city: billingCity,
        country: billingCountry,
        phone: billingPhone,
      },
    ])
    .select();

  if (orderBillingError) throw orderBillingError;

  const { data: orderInsertData, error } = await supabase
    .from('orders')
    .insert([
      {
        ...orderData,
        paypalOrderId,
        deliveryAddressId: data[0].id,
        billingAddressId: billingAddressData[0].id,
        userId,
        status: 'pending',
        rawPaypalResponse: jsonResponse,
      },
    ])
    .select();

  if (error) {
    throw error;
  }
  return orderInsertData[0].id;
};

export const captureOrderApi = async (orderId, jsonResponse, status) => {
  const { data, error } = await supabase
    .from('orders')
    .update({
      status: String(status).toLowerCase(),
      captureResponse: jsonResponse,
    })
    .eq('paypalOrderId', orderId)
    .select();

  if (error) {
    throw error;
  }

  return data?.[0]?.id;
};
