import { isCorner, type Product } from '../data/products';
import { site } from '../data/site';
import { formatCm, formatDimensions, formatDimensionsCm, formatInchMark } from './units';

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

/** 249.99 → "$249.99". */
export const formatUsd = (amount: number): string => usd.format(amount);

/** Overall size for cards and key facts. A corner piece reads "15″ along each wall × 47″H". */
export const formatSize = (product: Product, unit: 'in' | 'cm'): string => {
  const d = product.dimensionsCm;
  if (isCorner(product)) {
    // Same style as formatDimensions / formatDimensionsCm: "47″H", "119.4 cm H"
    const wall = unit === 'in' ? formatInchMark(d.width, 'up') : formatCm(d.width);
    const height = unit === 'in' ? `${formatInchMark(d.height, 'up')}H` : `${formatCm(d.height)} H`;
    return site.product.keyFacts.cornerSize(wall, height);
  }
  return unit === 'in' ? formatDimensions(d) : formatDimensionsCm(d);
};
