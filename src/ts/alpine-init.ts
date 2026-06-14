import { galleryDetailData } from '@/ts/galleryDetailData.ts';
declare var Alpine: any;

document.addEventListener('alpine:init', () => {
    Alpine.data('galleryDetailData', galleryDetailData);
});
