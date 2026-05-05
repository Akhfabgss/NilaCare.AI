export type DiseaseTemplate = {
  title: string;
  description: string;
  firstAid: string;
  cta: string;
};

const CTA = "Ingin penjelasan lebih lanjut? Tanyakan di chat NilaCare.ai.";

const TEMPLATES: Record<string, DiseaseTemplate> = {
  Streptococcosis: {
    title: "Streptococcosis",
    description:
      "Penyakit bakteri yang sering menyebabkan ikan berenang tidak normal, nafsu makan turun, dan luka/pendarahan pada tubuh.",
    firstAid:
      "Lakukan isolasi ikan sakit, jaga kualitas air (amonia/nitrit rendah), dan pertimbangkan penggunaan antibiotik sesuai anjuran ahli perikanan.",
    cta: CTA,
  },
  Parasitic: {
    title: "Parasitic",
    description:
      "Infeksi parasit eksternal dapat menimbulkan iritasi, ikan sering menggosokkan tubuh, dan lendir berlebih.",
    firstAid:
      "Pisahkan ikan sakit, perbaiki kebersihan kolam, dan lakukan perlakuan antiparasit sesuai panduan (mis. garam/obat khusus).",
    cta: CTA,
  },
  Columnaris: {
    title: "Columnaris",
    description:
      "Penyakit bakteri yang menyebabkan bercak putih/abu, luka pada kulit, dan sirip rusak.",
    firstAid:
      "Isolasi ikan, tingkatkan aerasi, stabilkan suhu, dan gunakan antibakteri sesuai dosis yang direkomendasikan ahli.",
    cta: CTA,
  },
  "MAS (Motile Aeromonas Septicemia)": {
    title: "MAS (Motile Aeromonas Septicemia)",
    description:
      "Penyakit bakteri serius yang menyebabkan pendarahan, luka borok, dan kematian mendadak.",
    firstAid:
      "Segera isolasi ikan, ganti air bertahap, kurangi stres, dan konsultasikan terapi antibiotik dengan tenaga ahli.",
    cta: CTA,
  },
  Healthy: {
    title: "Healthy",
    description: "Ikan terlihat sehat tanpa tanda klinis penyakit yang jelas.",
    firstAid:
      "Pertahankan kualitas air, pakan seimbang, dan lakukan pemantauan rutin.",
    cta: CTA,
  },
  Saprolegniasis: {
    title: "Saprolegniasis",
    description:
      "Infeksi jamur yang biasanya tampak seperti kapas putih pada kulit/insang.",
    firstAid:
      "Pisahkan ikan, bersihkan lingkungan, dan lakukan perendaman antijamur sesuai rekomendasi.",
    cta: CTA,
  },
  "WhiteSpot/protozoa": {
    title: "WhiteSpot/protozoa",
    description:
      "Penyakit protozoa yang ditandai bintik putih seperti garam dan ikan sering menggosokkan tubuh.",
    firstAid:
      "Isolasi ikan, tingkatkan suhu secara bertahap bila memungkinkan, dan gunakan obat white spot sesuai dosis.",
    cta: CTA,
  },
};

const FALLBACK_TEMPLATE: DiseaseTemplate = {
  title: "Informasi penyakit tidak tersedia",
  description:
    "Kami belum memiliki informasi spesifik untuk kondisi ini. Tetap pantau kondisi ikan Anda.",
  firstAid:
    "Konsultasikan dengan ahli perikanan atau dokter hewan yang berpengalaman untuk penanganan yang tepat.",
  cta: CTA,
};

/**
 * Returns the static disease template for the given ML prediction label.
 * Falls back to a generic template if the label is unknown.
 */
export function getDiseaseTemplate(label: string): DiseaseTemplate {
  return TEMPLATES[label] ?? FALLBACK_TEMPLATE;
}
