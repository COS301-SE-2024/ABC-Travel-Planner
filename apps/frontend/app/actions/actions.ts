'use server';

import { cookies } from 'next/headers'
import { createClient } from '../utils/supabase/client';

export const getCurrentUser = async () => {
    const cookieStore = cookies();
    let user = cookieStore.get('user');
    
    if (!user) {
        const supabase = createClient();
        const { data: { user: fetchedUser } } = await supabase.auth.getUser();
        console.log("This is the curre " + JSON.stringify(fetchedUser));
        let { data: currentUser, error } = await supabase.from('Users').select('*').eq('user_id', `${fetchedUser?.id}`).single();

        cookieStore.set('user', JSON.stringify(currentUser));
        console.log("This is the current user logged in by server " + JSON.stringify(currentUser));
        return currentUser;
    } else {
        const currentUser = JSON.parse(user.value);
        console.log("This is the current user logged in by server cookie " + JSON.stringify(currentUser));
        return currentUser ;
    }

};