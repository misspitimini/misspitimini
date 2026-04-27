interface GalleryData {
    activeSlideGallery: number;
    readonly galleryLength: number;
    touchstartX: number;
    touchendX: number;
    threshold: number;
    imageOrientation: string;
    images: string[];

    // Propiedades mágicas de Alpine
    $refs: {
        slider: HTMLElement;
        galleryContainer: HTMLElement;
    };
    $nextTick: (callback: () => void) => void;

    // Métodos
    init(): void;
    checkOrientation(img: HTMLImageElement): void;
    centerThumbnail(index: number): void;
    next(): void;
    prev(): void;
    load(index: number): void;
    changeClass(index: number): string;
    handleGesture(): void;
    handleTouchStart(event: TouchEvent): void;
    handleTouchEnd(event: TouchEvent): void;
}

export const galleryDetailData = () => ({
    activeSlideGallery: 0,
    get galleryLength(): number {
        const container = document.querySelector('.card-content-thumb');
        return container ? container.children.length : 0;
    },
    touchstartX: 0,
    touchendX: 0,
    threshold: 50,
    imageOrientation: 'landscape',
    images: [''],

    init(this: GalleryData) {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    const img = Array.from(mutation.addedNodes).find((node): node is HTMLImageElement => node.nodeName === 'IMG');
                    if (img) {
                        this.checkOrientation(img);
                    }
                }
            }
        });
        observer.observe(this.$refs.slider, { childList: true });
    },
    checkOrientation(this: GalleryData, img: HTMLImageElement) {
        const setOrientation = () => {
            this.imageOrientation = img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape';
        };
        if (img.complete) {
            setOrientation();
        } else {
            img.addEventListener('load', setOrientation, { once: true });
        }
    },
    centerThumbnail(this: GalleryData, index: number) {
        this.$nextTick(() => {
            const galleryContainer = this.$refs.galleryContainer;
            const selectedThumb = galleryContainer.querySelectorAll('button')[index];
            if (galleryContainer && selectedThumb) {
                const containerWidth = galleryContainer.offsetWidth;
                const thumbWidth = selectedThumb.offsetWidth;
                const scrollLeft = selectedThumb.offsetLeft - (containerWidth / 2) + (thumbWidth / 2);
                galleryContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        });
    },
    next(this: GalleryData) {
        if (this.galleryLength === 0) return;
        this.activeSlideGallery = (this.activeSlideGallery + 1) % this.galleryLength;
        (window as any).updateCarousel(this.activeSlideGallery);
        this.centerThumbnail(this.activeSlideGallery);
    },
    prev(this: GalleryData) {
        if (this.galleryLength === 0) return;
        this.activeSlideGallery = (this.activeSlideGallery - 1 + this.galleryLength) % this.galleryLength;
        (window as any).updateCarousel(this.activeSlideGallery);
        this.centerThumbnail(this.activeSlideGallery);
    },
    load(this: GalleryData, index: number) {
        this.activeSlideGallery = index;
        (window as any).updateCarousel(this.activeSlideGallery);
        this.centerThumbnail(index);
    },
    changeClass(this: GalleryData, index: number) {
         return this.activeSlideGallery === index ? 'border-black scale-105' : 'border-transparent opacity-60 hover:opacity-100';
    },
    handleGesture(this: GalleryData)  {
        const deltaX = this.touchendX - this.touchstartX;
        if (Math.abs(deltaX) > this.threshold) {
            deltaX < 0 ? this.next() : this.prev();
        }
    },
    handleTouchStart(this: GalleryData, event: TouchEvent) {
        this.touchstartX = event.touches[0].screenX;
    },
    handleTouchEnd(this: GalleryData, event: TouchEvent) {
        this.touchendX = event.changedTouches[0].screenX;
        this.handleGesture();
    },
});
