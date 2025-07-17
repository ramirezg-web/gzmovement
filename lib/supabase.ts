import { useEffect, useState, useRef } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

interface UserSubscription {
  subscription_status: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
}
interface UserSubscription {
  price_id: string;
  subscription_status: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

export default function RootLayout() {
  useFrameworkReady();
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (isMountedRef.current) {
          setSession(session);
          if (session) {
            await fetchSubscription(session.user.id);
          } else {
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const {
      data: { subscription: authSubscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (isMountedRef.current) {
        setSession(session);
        if (session) {
          await fetchSubscription(session.user.id);
        } else {
          setSubscription(null);
          setLoading(false);
        }
      }
    });

    return () => {
      isMountedRef.current = false;
      authSubscription.unsubscribe();
    };
  }, []);

  const fetchSubscription = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('price_id, subscription_status, current_period_end, cancel_at_period_end')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
      }

      if (isMountedRef.current) {
        setSubscription(data);
      }
    } catch (err) {
      console.error('Error fetching subscription:', err);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  };

  const hasActiveSubscription = () => {
    if (!subscription) return false;
    
    const activeStatuses = ['active', 'trialing'];
    const isActive = activeStatuses.includes(subscription.subscription_status);
    
    // Check if subscription hasn't expired
    const now = Math.floor(Date.now() / 1000);
    const notExpired = subscription.current_period_end > now;
    
    return isActive && notExpired;
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        {!session ? (
          <>
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(auth)/signup" />
          </>
        ) : hasActiveSubscription() ? (
          <>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="success" />
          </>
        ) : (
          <>
            <Stack.Screen name="subscription-required" />
            <Stack.Screen name="success" />
          </>
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}