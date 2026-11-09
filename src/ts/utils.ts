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

export function addHour(horaStr: string, horasASumar: number) {
    // 1. Separar horas y minutos del string original
    const [horas, minutos] = horaStr.split(':').map(Number);

    // 2. Convertir todo a minutos totales
    let totalMinutos = (horas * 60) + minutos + (horasASumar * 60);

    // 3. Calcular las nuevas horas y minutos (y manejar el desborde de 24 horas si es necesario)
    let nuevasHoras = Math.floor(totalMinutos / 60) % 24;
    let nuevosMinutos = totalMinutos % 60;

    // 4. Formatear con ceros a la izquierda (ej: "09" en vez de "9")
    const formatoHoras = String(nuevasHoras).padStart(2, '0');
    const formatoMinutos = String(nuevosMinutos).padStart(2, '0');

    return `${formatoHoras}:${formatoMinutos}`;
}
