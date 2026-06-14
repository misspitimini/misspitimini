import { galleryDetailData } from '@/ts/galleryDetailData.ts';

document.addEventListener('alpine:init', () => {
    Alpine.data('galleryDetailData', galleryDetailData);
});
