const vnd = new Intl.NumberFormat('vi-VN');

/** 6500000 → "6.500.000 ₫" (non-breaking space so ₫ never wraps alone). */
export const formatVnd = (amount: number): string => `${vnd.format(amount)} ₫`;
