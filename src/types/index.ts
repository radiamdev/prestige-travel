// Define interface for gallery images
export interface GalleryImage {
    id: string
    src: { src: string }
    description: string
}

// 🔒 Typage strict pour les langues
export type Lang = 'en' | 'fr' | 'de' | 'it'