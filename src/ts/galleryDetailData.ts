import { fetchGalleryImages, renderGalleryDetail } from './galleryDetail';

// 1. Definimos un tipo que representa el ESTADO de nuestro componente.
interface GalleryState {
    activeSlideGallery: number;
    images: { url: string; name: string }[];
    imageOrientation: string;
    isLoading: boolean;
    touchstartX: number;
    touchendX: number;
    threshold: number;
}

// 2. Definimos un tipo para las PROPIEDADES MÁGICAS que Alpine inyecta.
interface AlpineMagic {
    $refs: { 
        galleryContainer: HTMLElement 
    };
    $nextTick: (callback: () => void) => void;
}

// 3. Creamos el tipo final del COMPONENTE, que es la unión del estado, 
//    las propiedades mágicas y los métodos.
//    Los métodos usan `this: GalleryComponent` para tener un contexto explícito.
interface GalleryComponent extends GalleryState, AlpineMagic {
    galleryLength: number;
    init(this: GalleryComponent): Promise<void>;
    checkOrientation(this: GalleryComponent, imgUrl: string): void;
    centerThumbnail(this: GalleryComponent, index: number): void;
    next(this: GalleryComponent): void;
    prev(this: GalleryComponent): void;
    load(this: GalleryComponent, index: number): void;
    changeClass(this: GalleryComponent, index: number): string;
    handleGesture(this: GalleryComponent): void;
    handleTouchStart(this: GalleryComponent, event: TouchEvent): void;
    handleTouchEnd(this: GalleryComponent, event: TouchEvent): void;
}

// 4. La función que crea nuestro componente Alpine.
export const galleryDetailData = () => ({
    // --- Estado inicial ---
    activeSlideGallery: 0,
    images: [],
    imageOrientation: 'landscape',
    isLoading: true,
    touchstartX: 0,
    touchendX: 0,
    threshold: 50,

    // --- Propiedad computada ---
    get galleryLength(): number {
        return this.images.length;
    },

    // --- Métodos con `this` explícito ---
    async init(this: GalleryComponent) {
        const [_, imageResults] = await Promise.all([
            renderGalleryDetail(),
            fetchGalleryImages()
        ]);

        this.images = imageResults;
        this.isLoading = false;

        if (this.images.length > 0) {
            this.checkOrientation(this.images[0].url);
        }
    },

    checkOrientation(this: GalleryComponent, imgUrl: string) {
        const img = new Image();
        img.onload = () => {
            this.imageOrientation = img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape';
        };
        img.src = imgUrl;
    },

    centerThumbnail(this: GalleryComponent, index: number) {
        this.$nextTick(() => {
            const galleryEl = this.$refs.galleryContainer;
            const selectedButton = galleryEl.children[index] as HTMLElement;
            if (selectedButton) {
                const scrollLeft = selectedButton.offsetLeft - (galleryEl.offsetWidth / 2) + (selectedButton.offsetWidth / 2);
                galleryEl.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        });
    },

    next(this: GalleryComponent) {
        if (this.galleryLength === 0) return;
        this.activeSlideGallery = (this.activeSlideGallery + 1) % this.galleryLength;
        this.centerThumbnail(this.activeSlideGallery);
        this.checkOrientation(this.images[this.activeSlideGallery].url);
    },

    prev(this: GalleryComponent) {
        if (this.galleryLength === 0) return;
        this.activeSlideGallery = (this.activeSlideGallery - 1 + this.galleryLength) % this.galleryLength;
        this.centerThumbnail(this.activeSlideGallery);
        this.checkOrientation(this.images[this.activeSlideGallery].url);
    },

    load(this: GalleryComponent, index: number) {
        this.activeSlideGallery = index;
        this.centerThumbnail(index);
        this.checkOrientation(this.images[index].url);
    },

    changeClass(this: GalleryComponent, index: number) {
        return this.activeSlideGallery === index ? 'border-black scale-105' : 'border-transparent opacity-60 hover:opacity-100';
    },

    handleGesture(this: GalleryComponent) {
        const deltaX = this.touchendX - this.touchstartX;
        if (Math.abs(deltaX) > this.threshold) {
            deltaX < 0 ? this.next() : this.prev();
        }
    },

    handleTouchStart(this: GalleryComponent, event: TouchEvent) {
        this.touchstartX = event.touches[0].screenX;
    },

    handleTouchEnd(this: GalleryComponent, event: TouchEvent) {
        this.touchendX = event.changedTouches[0].screenX;
        this.handleGesture();
    },
} as GalleryComponent); // 5. La aserción de tipo ahora es correcta y segura.
