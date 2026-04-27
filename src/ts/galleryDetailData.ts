export const galleryDetailData = () => ({
    activeSlideGallery: 0,
    get galleryLength() {
        const container = document.querySelector('.card-content-thumb');
        return container ? container.children.length : 0;
    },
    touchstartX: 0,
    touchendX: 0,
    threshold: 50,
    imageOrientation: 'landscape',
    init() {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    const img = Array.from(mutation.addedNodes).find(node => node.nodeName === 'IMG');
                    if (img) {
                        this.checkOrientation(img);
                    }
                }
            }
        });
        observer.observe(this.$refs.slider, { childList: true });
    },
    checkOrientation(img) {
        const setOrientation = () => {
            this.imageOrientation = img.naturalHeight > img.naturalWidth ? 'portrait' : 'landscape';
        };
        if (img.complete) {
            setOrientation();
        } else {
            img.addEventListener('load', setOrientation, { once: true });
        }
    },
    centerThumbnail(index) {
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
    next() {
        if (this.galleryLength === 0) return;
        this.activeSlideGallery = (this.activeSlideGallery + 1) % this.galleryLength;
        window.updateCarousel(this.activeSlideGallery);
        this.centerThumbnail(this.activeSlideGallery);
    },
    prev() {
        if (this.galleryLength === 0) return;
        this.activeSlideGallery = (this.activeSlideGallery - 1 + this.galleryLength) % this.galleryLength;
        window.updateCarousel(this.activeSlideGallery);
        this.centerThumbnail(this.activeSlideGallery);
    },
    load(index) {
        this.activeSlideGallery = index;
        window.updateCarousel(this.activeSlideGallery);
        this.centerThumbnail(index);
    },
    changeClass(index) {
         return this.activeSlideGallery === index ? 'border-black scale-105' : 'border-transparent opacity-60 hover:opacity-100';
    },
    handleGesture()  {
        const deltaX = this.touchendX - this.touchstartX;
        if (Math.abs(deltaX) > this.threshold) {
            deltaX < 0 ? this.next() : this.prev();
        }
    },
    images: ['']
});
