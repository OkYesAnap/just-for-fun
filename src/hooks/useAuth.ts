import {useEffect, useState} from 'react'
import {supabase} from '../supabaseClient'
import type {AuthError, OAuthResponse, User} from '@supabase/supabase-js'

export interface UseAuthReturn {
    user: User | null
    token: string | undefined
    isAuthenticated: boolean
    signIn: () => Promise<OAuthResponse>
    signOut: () => Promise<{ error: AuthError | null }>
}

export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | undefined>(undefined);

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setToken(session?.access_token);
            setUser(session?.user ?? null);
        });
    }, []);

    return {
        user,
        token,
        isAuthenticated: !!user,
        signIn: () => supabase.auth.signInWithOAuth({provider: 'google'}),
        signOut: () => supabase.auth.signOut(),
    }
}

export default useAuth;