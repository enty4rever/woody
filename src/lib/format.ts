const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

/** 249.99 → "$249.99". */
export const formatUsd = (amount: number): string => usd.format(amount);
