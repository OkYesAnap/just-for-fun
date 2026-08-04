import {useEffect, useRef, useState} from 'react'
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
    const [shouldRefreshToken, setShouldRefreshToken] = useState(true);
    const tokenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            if (tokenTimer.current === null) {
                setShouldRefreshToken(true);
            } else {
                clearTimeout(tokenTimer.current);
            }
        }
        if (document.visibilityState === 'hidden') {
            if (tokenTimer.current) {
                clearTimeout(tokenTimer.current);
            }
            tokenTimer.current = setTimeout(() => {
                if (tokenTimer.current) {
                    clearTimeout(tokenTimer.current);
                    tokenTimer.current = null;
                }
            }, 15 * 60 * 1000);
        }
    });

    useEffect(() => {
        setShouldRefreshToken(tokenTimer.current === null);
        if (shouldRefreshToken) {
            supabase.auth.getSession().then(({data: {session}}) => {
                setToken(session?.access_token);
                setUser(session?.user ?? null);
            });
        }
        setShouldRefreshToken(false);
    }, [shouldRefreshToken]);

    return {
        user,
        token,
        isAuthenticated: !!user,
        signIn: () => supabase.auth.signInWithOAuth({provider: 'google'}),
        signOut: () => supabase.auth.signOut(),
    }
}

export default useAuth;