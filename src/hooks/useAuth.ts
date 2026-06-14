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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setUser(session.user ?? null)
                setToken(session.access_token)
                setIsAuthenticated(true)
            } else {
                setUser(null)
                setToken(undefined)
                setIsAuthenticated(false)
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, []);

    return {
        user,
        token,
        isAuthenticated: isAuthenticated,
        signIn: () => supabase.auth.signInWithOAuth({provider: 'google'}),
        signOut: () => supabase.auth.signOut(),
    }
}

export default useAuth;