import Alpine from 'alpinejs';
import { galleryDetailData } from './galleryDetailData';

document.addEventListener('alpine:init', () => {
    Alpine.data('galleryDetailData', galleryDetailData);
});
