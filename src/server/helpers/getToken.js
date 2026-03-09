
import { setCookie } from './setCookie.js';
import { supabase } from '../api/supabaseClient.js';

export const getToken = async (req, res) => {
    let accessToken = req.cookies['sb-access-token'];
    const refreshToken = req.cookies['sb-refresh-token'];

    if (!accessToken && refreshToken) {
        const { data: session } = await supabase.auth.refreshSession(refreshToken);
        setCookie(res, { session });
        accessToken = session.access_token;
    }

    return accessToken;
};