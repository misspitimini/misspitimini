import { fetchGalleryImages, renderGalleryDetail } from './galleryDetail';

interface GalleryState {
    activeSlideGallery: number;
    images: { url: string; name: string }[];
    loadedImages: { url: string; name: string }[];
    imageOrientation: string;
    isLoading: boolean;
    touchstartX: number;
    touchendX: number;
    threshold: number;
}

interface AlpineMagic {
    $refs: { galleryContainer: HTMLElement };
    $nextTick: (callback: () => void) => void;
}

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
    loadMoreImages(this: GalleryComponent): void;
}

export const galleryDetailData = () => ({
    activeSlideGallery: 0,
    images: [] as { url: string; name: string }[],
    loadedImages: [] as { url: string; name: string }[],
    imageOrientation: 'landscape',
    isLoading: true,
    touchstartX: 0,
    touchendX: 0,
    threshold: 50,

    get galleryLength(): number {
        return this.loadedImages.length;
    },

    async init(this: GalleryComponent) {
        const [_, imageResults] = await Promise.all([
            renderGalleryDetail(),
            fetchGalleryImages()
        ]);

        this.images = imageResults;
        this.loadedImages = this.images.slice(0, 9);
        this.isLoading = false;

        if (this.galleryLength > 0) {
            this.checkOrientation(this.loadedImages[0].url);
        }

        let isloadingMore = false;
        if (this.$refs.galleryContainer) {
            this.$refs.galleryContainer.addEventListener('scroll', () => {
                if (isloadingMore) return;
                const { scrollLeft, scrollWidth, clientWidth } = this.$refs.galleryContainer;
                if (scrollLeft + clientWidth >= scrollWidth - 200) {
                    isloadingMore = true;
                    this.loadMoreImages();
                    setTimeout(() => { isloadingMore = false; }, 500); // Debounce
                }
            });
        }
    },

    loadMoreImages(this: GalleryComponent) {
        if (this.loadedImages.length < this.images.length) {
            const nextBatch = this.images.slice(this.galleryLength, this.galleryLength + 9);
            this.loadedImages.push(...nextBatch);
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
            if (!galleryEl || !galleryEl.children[index]) return;
            const selectedButton = galleryEl.children[index] as HTMLElement;
            const scrollLeft = selectedButton.offsetLeft - (galleryEl.offsetWidth / 2) + (selectedButton.offsetWidth / 2);
            galleryEl.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        });
    },

    next(this: GalleryComponent) {
        if (this.galleryLength === 0) return;

        const nextIndex = this.activeSlideGallery + 1;
        
        if (nextIndex >= this.galleryLength && this.galleryLength < this.images.length) {
            this.loadMoreImages();
        }

        this.activeSlideGallery = nextIndex % this.loadedImages.length;
        
        this.centerThumbnail(this.activeSlideGallery);
        this.checkOrientation(this.loadedImages[this.activeSlideGallery].url);
    },

    prev(this: GalleryComponent) {
        if (this.galleryLength === 0) return;

        if (this.activeSlideGallery === 0 && this.loadedImages.length < this.images.length) {
            this.loadedImages = this.images;
            this.$nextTick(() => {
                const newIndex = this.images.length - 1;
                this.activeSlideGallery = newIndex;
                this.centerThumbnail(newIndex);
                this.checkOrientation(this.loadedImages[newIndex].url);
            });
            return;
        }

        this.activeSlideGallery = (this.activeSlideGallery - 1 + this.galleryLength) % this.galleryLength;
        this.centerThumbnail(this.activeSlideGallery);
        this.checkOrientation(this.loadedImages[this.activeSlideGallery].url);
    },

    load(this: GalleryComponent, index: number) {
        this.activeSlideGallery = index;
        this.centerThumbnail(index);
        this.checkOrientation(this.loadedImages[index].url);
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
} as GalleryComponent);