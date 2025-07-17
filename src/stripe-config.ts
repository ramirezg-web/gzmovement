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
    description: 'Monthly access to all workouts and programs + 7-day free trial',
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