export function slugify(text: string): string {
  return text
  .toString()                     // Ensure it's a string
  // .toLowerCase()                  // Convert to lowercase first!
   .trim()                         // Remove leading/trailing whitespace
   .normalize('NFD')               // Split accented characters into base + accent
   .replace(/\p{Diacritic}/gu, '') // Remove all accent marks
   .replace(/\s+/g, '-')           // Replace spaces with -
   .replace(/[^a-zA-Z0-9-]/g, '')     // Remove all non-alphanumeric chars (except -)
   .replace(/-+/g, '-')            // Replace multiple - with single -
   .replace(/^-+|-+$/g, '');       // Remove leading/trailing dashes
}
