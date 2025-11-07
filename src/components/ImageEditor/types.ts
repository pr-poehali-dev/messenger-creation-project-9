export type TextOverlay = {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontWeight: 'normal' | 'bold';
};

export type StickerOverlay = {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
};

export type Filter = 'none' | 'grayscale' | 'sepia' | 'vintage' | 'cool' | 'warm' | 'bright' | 'contrast';

export const filterStyles: Record<Filter, string> = {
  none: '',
  grayscale: 'grayscale(100%)',
  sepia: 'sepia(100%)',
  vintage: 'sepia(50%) contrast(120%) saturate(80%)',
  cool: 'hue-rotate(180deg) saturate(120%)',
  warm: 'hue-rotate(30deg) saturate(130%)',
  bright: 'brightness(120%) saturate(110%)',
  contrast: 'contrast(150%) saturate(90%)',
};
