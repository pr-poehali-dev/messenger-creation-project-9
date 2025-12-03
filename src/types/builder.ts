export interface Block {
  id: string;
  type: 'hero' | 'features' | 'cta' | 'text' | 'image' | 'gallery' | 'form' | 'footer';
  content: {
    title?: string;
    subtitle?: string;
    text?: string;
    buttonText?: string;
    buttonLink?: string;
    imageUrl?: string;
    images?: string[];
    backgroundColor?: string;
    textColor?: string;
  };
  order: number;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  blocks: Block[];
}
