// Product renders live in src/assets/products/ (copied from hinhanh/, never edited there).
// products.ts and site.ts name them by file name only, because Node reads those files directly
// (tests, check-data) and cannot import images. This module turns the name into image metadata.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/products/*.webp', { eager: true });

/** "cabinet-front" → metadata of src/assets/products/cabinet-front.webp. Fails the build if missing. */
export const productAsset = (name: string): ImageMetadata => {
  const file = files[`../assets/products/${name}.webp`];
  if (!file) throw new Error(`Missing image src/assets/products/${name}.webp`);
  return file.default;
};

/** Requested widths. A width above the source is dropped (never upscale) and the source width takes its place. */
export const IMAGE_WIDTHS = [480, 960, 1440];

export const imageWidths = (sourceWidth: number, wanted: number[] = IMAGE_WIDTHS): number[] => {
  const kept = wanted.filter((w) => w <= sourceWidth);
  return kept.length < wanted.length ? [...kept, sourceWidth] : kept;
};
