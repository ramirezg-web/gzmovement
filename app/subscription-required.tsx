import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { stripeProducts, getProductByPriceId } from '@/src/stripe-config';
import { Check, Star, Crown, Zap, Heart, Users, Accessibility, LogOut } from 'lucide-react-native';

interface UserSubscription {
  subscription_status: string;
  price_id: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
}

export default function SubscriptionRequiredScreen() {
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserSubscription();
  }, []);

  const fetchUserSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_user_subscriptions')
        .select('subscription_status, price_id, current_period_end, cancel_at_period_end')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error);
        return;
      }

      setUserSubscription(data);
    } catch (err) {
      console.error('Error fetching subscription:', err);
    }
  };

  const handlePurchase = async (priceId: string, mode: 'payment' | 'subscription') => {
    setCheckoutLoading(priceId);
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/(auth)/login');
        return;
      }

      const response = await fetch(`${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/subscription-required`,
          mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during checkout');
    } finally {
      setCheckoutLoading(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.replace('/(auth)/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getProductIcon = (productName: string) => {
    if (productName.includes('In Person')) {
      return Crown;
    } else if (productName.includes('Online')) {
      return Star;
    } else {
      return Zap;
    }
  };

  const isCurrentPlan = (priceId: string) => {
    return userSubscription?.price_id === priceId && 
           ['active', 'trialing'].includes(userSubscription.subscription_status);
  };

  const features = {
    'price_1RldPRB3EpSJW5YnfboA5W46': [
      'In-person training sessions',
      '3-4 sessions per week',
      'Personalized workout plans',
      'Progress tracking',
      'Nutritional guidance',
      '6-month commitment'
    ],
    'price_1RldOdB3EpSJW5YnXlFL4F8c': [
      'In-person training sessions',
      '3-4 sessions per week',
      'Daily check-ins',
      'Guidance and support',
      'Personalized plans',
      '3-month commitment'
    ],
    'price_1RldKgB3EpSJW5Yns3fZoQr6': [
      'Personal online training',
      'Custom workout plans',
      'Video consultations',
      'Progress monitoring',
      'Flexible scheduling',
      '6-month commitment'
    ],
    'price_1Rld87B3EpSJW5YnV8tOpDWp': [
      'Access to all workouts',
      'GZ signature programs',
      'Mobile app access',
      'Progress tracking',
      'Community support',
      '7-day free trial'
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Welcome to GZ Movement</Text>
          <Text style={styles.subtitle}>Fitness for every body 🌈</Text>
        </View>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <LogOut size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Movement that celebrates YOU</Text>
        <Text style={styles.heroText}>
          Whether you're LGBTQ+, differently abled, or just starting your wellness journey - 
          we create inclusive, adaptive programming that honors your unique body and goals.
        </Text>
        
        <View style={styles.inclusiveFeatures}>
          <View style={styles.inclusiveFeature}>
            <Heart size={20} color="#14B8A6" />
            <Text style={styles.inclusiveFeatureText}>Body Positive</Text>
          </View>
          <View style={styles.inclusiveFeature}>
            <Users size={20} color="#8B5CF6" />
            <Text style={styles.inclusiveFeatureText}>LGBTQ+ Safe Space</Text>
          </View>
          <View style={styles.inclusiveFeature}>
            <Accessibility size={20} color="#F97316" />
            <Text style={styles.inclusiveFeatureText}>Adaptive Programming</Text>
          </View>
        </View>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Choose Your Membership</Text>
        <Text style={styles.sectionSubtitle}>Start your journey with a plan that fits your life</Text>

        <View style={styles.productsGrid}>
          {stripeProducts.map((product) => {
            const IconComponent = getProductIcon(product.name);
            const isPopular = product.priceId === 'price_1Rld87B3EpSJW5YnV8tOpDWp';
            const isCurrent = isCurrentPlan(product.priceId);
            const productFeatures = features[product.priceId as keyof typeof features] || [];

            return (
              <View key={product.id} style={[
                styles.productCard,
                isPopular && styles.popularCard,
                isCurrent && styles.currentCard
              ]}>
                {isPopular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>Most Popular • 7-Day Free Trial</Text>
                  </View>
                )}

                <View style={styles.productHeader}>
                  <View style={[styles.productIcon, { backgroundColor: isPopular ? '#14B8A6' : '#F3F4F6' }]}>
                    <IconComponent size={24} color={isPopular ? '#FFFFFF' : '#6B7280'} />
                  </View>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productDescription}>{product.description}</Text>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{product.price}</Text>
                  <Text style={styles.priceUnit}>
                    {product.mode === 'subscription' ? '/month' : 'one-time'}
                  </Text>
                </View>

                <View style={styles.featuresContainer}>
                  {productFeatures.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <Check size={16} color="#10B981" />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[
                    styles.purchaseButton,
                    isPopular && styles.popularButton,
                    isCurrent && styles.currentButton,
                    (checkoutLoading === product.priceId) && styles.loadingButton
                  ]}
                  onPress={() => handlePurchase(product.priceId, product.mode)}
                  disabled={checkoutLoading === product.priceId || isCurrent}
                >
                  {checkoutLoading === product.priceId ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={[
                      styles.purchaseButtonText,
                      isPopular && styles.popularButtonText,
                      isCurrent && styles.currentButtonText
                    ]}>
                      {isCurrent ? 'Current Plan' : isPopular ? 'Start Free Trial' : 'Get Started'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        <View style={styles.guaranteeSection}>
          <Text style={styles.guaranteeTitle}>Our Promise to You</Text>
          <Text style={styles.guaranteeText}>
            Every body is welcome here. We provide modifications for all abilities, 
            celebrate diverse identities, and create a judgment-free space where you can 
            move with confidence and joy.
          </Text>
        </View>

        <View style={styles.trialInfo}>
          <Text style={styles.trialTitle}>7-Day Free Trial</Text>
          <Text style={styles.trialText}>
            Try GZ Movement risk-free! Your trial starts immediately and you can cancel anytime 
            during the first 7 days with no charge.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  signOutButton: {
    padding: 8,
  },
  heroSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  inclusiveFeatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 16,
  },
  inclusiveFeature: {
    alignItems: 'center',
    gap: 8,
  },
  inclusiveFeatureText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  productsGrid: {
    gap: 16,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  popularCard: {
    borderColor: '#14B8A6',
    borderWidth: 2,
  },
  currentCard: {
    borderColor: '#10B981',
    borderWidth: 2,
    backgroundColor: '#F0FDF4',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    left: 24,
    right: 24,
    backgroundColor: '#14B8A6',
    borderRadius: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  productHeader: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 8,
  },
  productIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: 24,
  },
  price: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
  },
  priceUnit: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 24,
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  purchaseButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  popularButton: {
    backgroundColor: '#14B8A6',
  },
  currentButton: {
    backgroundColor: '#10B981',
  },
  loadingButton: {
    opacity: 0.6,
  },
  purchaseButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  popularButtonText: {
    color: '#FFFFFF',
  },
  currentButtonText: {
    color: '#FFFFFF',
  },
  guaranteeSection: {
    backgroundColor: '#F0FDFA',
    borderRadius: 16,
    padding: 20,
    marginTop: 32,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#14B8A6',
  },
  guaranteeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F766E',
    marginBottom: 8,
  },
  guaranteeText: {
    fontSize: 14,
    color: '#0F766E',
    lineHeight: 20,
  },
  trialInfo: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  trialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  trialText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
});