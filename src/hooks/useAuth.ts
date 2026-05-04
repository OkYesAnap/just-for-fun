import {useEffect, useState} from 'react'
import {supabase} from '../supabaseClient'
import type {AuthError, OAuthResponse, User} from '@supabase/supabase-js'

export interface UseAuthReturn {
    user: User | null
    loading: boolean
    isAuthenticated: boolean
    signIn: () => Promise<OAuthResponse>
    signOut: () => Promise<{ error: AuthError | null; }>
}

export function useAuth(): UseAuthReturn {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setUser(session?.user ?? null);
            setLoading(false)
        })

        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null)
            }
        )

        return () => subscription.unsubscribe()
    }, [])

    return {
        user,
        loading,
        isAuthenticated: !!user,
        signIn: () => supabase.auth.signInWithOAuth({provider: 'google'}),
        signOut: () => supabase.auth.signOut(),
    }
}

export default useAuth;