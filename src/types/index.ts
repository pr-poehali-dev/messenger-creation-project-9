export interface Component {
  id: string;
  type: 'hero' | 'features' | 'pricing' | 'cta' | 'testimonials' | 'gallery' | 'form' | 'footer' | 'navbar' | 'text' | 'image';
  props: Record<string, any>;
  styles: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
  };
}

export interface Page {
  id: string;
  name: string;
  path: string;
  components: Component[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  pages: Page[];
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'landing' | 'business' | 'portfolio' | 'blog' | 'ecommerce';
  preview: string;
  pages: Page[];
}
