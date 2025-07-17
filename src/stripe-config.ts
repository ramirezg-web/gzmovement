import { useEffect, useState } from 'react';
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        fetchSubscription(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        fetchSubscription(session.user.id);
      } else {
        setSubscription(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSubscription = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status, current_period_end, cancel_at_period_end')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
      }

      setSubscription(data);
    } catch (err) {
      console.error('Error fetching subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const hasActiveSubscription = () => {
    if (!subscription) return false;
    
    const activeStatuses = ['active', 'trialing'];
    const isActive = activeStatuses.includes(subscription.subscription_status);
    
    // Check if subscription hasn't expired
    const now = Math.floor(Date.now() / 1000);
    const notExpired = subscription.current_period_end > now;
export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  priceId: string;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'gz-subscription',
    name: 'GZ Movement Subscription',
    description: 'Monthly access to all workouts and programs',
    price: '$9.99',
    priceId: 'price_1Rld87B3EpSJW5YnV8tOpDWp',
    mode: 'subscription',
  },
  {
    id: 'gz-online-training',
    name: 'GZ Movement Personal Online Training',
    description: '6-Month Commitment',
    price: '$350.00',
    priceId: 'price_1RldKgB3EpSJW5Yns3fZoQr6',
    mode: 'subscription',
  },
  {
    id: 'gz-in-person-3-months',
    name: 'GZ Movement In Person Training 3 Months',
    description: '3-month commitment - 3-4 sessions a week, daily check-ins, guidance, and support.',
    price: '$1,250.00',
    priceId: 'price_1RldOdB3EpSJW5YnXlFL4F8c',
    mode: 'subscription',
  },
  {
    id: 'gz-in-person-6-months',
    name: 'GZ Movement In Person Training 6 Months',
    description: '6 Month Commitment, 3-4 sessions a week',
    price: '$1,000.00',
    priceId: 'price_1RldPRB3EpSJW5YnfboA5W46',
    mode: 'subscription',
  },
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};