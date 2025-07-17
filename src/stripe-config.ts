export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price?: string;
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_Sh1SsgtkyQGvsf',
    priceId: 'price_1RldPRB3EpSJW5YnfboA5W46',
    name: 'GZ Movement In Person Training 6 Months',
    description: '6 Month Commitment, 3-4 sessions a week',
    mode: 'subscription',
    price: '$1,000.00',
  },
  {
    id: 'prod_Sh1RVTfnNVIoyT',
    priceId: 'price_1RldOdB3EpSJW5YnXlFL4F8c',
    name: 'GZ Movement In Person Training 3 Months',
    description: '3-month commitment - 3-4 sessions a week, daily check-ins, guidance, and support.',
    mode: 'subscription',
    price: '$1,250.00',
  },
  {
    id: 'prod_Sh1NBSlIGGhKbn',
    priceId: 'price_1RldKgB3EpSJW5Yns3fZoQr6',
    name: 'GZ Movement Personal Online Training',
    description: '6-Month Commitment',
    mode: 'subscription',
    price: '$350.00',
  },
  {
    id: 'prod_Sh1ANbSYCCQGZ7',
    priceId: 'price_1Rld87B3EpSJW5YnV8tOpDWp',
    name: 'GZ Movement Subscription',
    description: 'Monthly access to all workouts and programs',
    mode: 'subscription',
    price: '$9.99',
  },
];

export function getProductByPriceId(priceId: string): StripeProduct | undefined {
  return stripeProducts.find(product => product.priceId === priceId);
}