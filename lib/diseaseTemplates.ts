export type DiseaseTemplate = {
  title: string;
  description: string;
  firstAid: string;
  cta: string;
};

/** The 7 accepted prediction labels from the model. */
export const VALID_LABELS = [
  "Streptococcosis",
  "Parasitic",
  "Columnaris",
  "MAS",
  "Healthy",
  "Saprolegniasis",
  "WhiteSpot",
] as const;

export type ValidLabel = (typeof VALID_LABELS)[number];

/** Confidence at or below this threshold triggers the low-confidence fallback. */
export const LOW_CONFIDENCE_THRESHOLD = 0.2;

/** Fallback message shown when confidence is too low or label is unrecognised. */
export const LOW_CONFIDENCE_FALLBACK_MESSAGE =
  "Maaf, penyakit tidak terdeteksi dengan jelas. Pastikan pencahayaan baik, foto jelas dan tidak buram, serta ikan terlihat utuh.";

/** Returns true when the label is one of the 7 accepted model classes. */
export function isValidLabel(label: string): label is ValidLabel {
  return (VALID_LABELS as readonly string[]).includes(label);
}

/** Returns true when confidence is at or below the low-confidence threshold. */
export function isLowConfidence(confidence: number): boolean {
  return confidence <= LOW_CONFIDENCE_THRESHOLD;
}

const CTA = "Ingin penjelasan lebih lanjut? Tanyakan di chat NilaCare.ai.";

const TEMPLATES: Record<ValidLabel, DiseaseTemplate> = {
  Streptococcosis: {
    title: "Streptococcosis",
    description:
      "Penyakit bakteri yang sering menyebabkan ikan berenang tidak normal, nafsu makan turun, dan pendarahan pada tubuh.",
    firstAid:
      "Isolasi ikan sakit, jaga kualitas air, dan konsultasikan penggunaan antibiotik yang sesuai.",
    cta: CTA,
  },
  Parasitic: {
    title: "Parasitic",
    description:
      "Infeksi parasit eksternal yang membuat ikan gelisah, menggosokkan tubuh, dan produksi lendir meningkat.",
    firstAid:
      "Pisahkan ikan sakit, bersihkan kolam, dan lakukan perlakuan antiparasit sesuai panduan.",
    cta: CTA,
  },
  Columnaris: {
    title: "Columnaris",
    description:
      "Penyakit bakteri yang memunculkan bercak putih/abu-abu, luka pada kulit, dan sirip rusak.",
    firstAid:
      "Isolasi ikan, tingkatkan aerasi, stabilkan suhu, dan gunakan antibakteri sesuai anjuran.",
    cta: CTA,
  },
  MAS: {
    title: "MAS (Motile Aeromonas Septicemia)",
    description:
      "Penyakit bakteri serius yang menyebabkan pendarahan, luka borok, dan kematian mendadak.",
    firstAid:
      "Segera isolasi ikan, kurangi stres, ganti air bertahap, dan konsultasikan terapi antibiotik.",
    cta: CTA,
  },
  Healthy: {
    title: "Healthy",
    description: "Ikan tampak sehat tanpa tanda klinis penyakit yang jelas.",
    firstAid:
      "Pertahankan kualitas air, pakan seimbang, dan lakukan pemantauan rutin.",
    cta: CTA,
  },
  Saprolegniasis: {
    title: "Saprolegniasis",
    description:
      "Infeksi jamur yang terlihat seperti kapas putih pada kulit atau insang.",
    firstAid:
      "Pisahkan ikan, bersihkan lingkungan, dan lakukan perendaman antijamur sesuai rekomendasi.",
    cta: CTA,
  },
  WhiteSpot: {
    title: "WhiteSpot",
    description:
      "Penyakit protozoa dengan bintik putih seperti garam dan ikan sering menggosokkan tubuh.",
    firstAid:
      "Isolasi ikan, tingkatkan suhu secara bertahap bila memungkinkan, dan gunakan obat white spot sesuai dosis.",
    cta: CTA,
  },
};

/**
 * Returns the static disease template for a valid prediction label.
 * Callers should guard with isValidLabel() before calling this function.
 */
export function getDiseaseTemplate(label: ValidLabel): DiseaseTemplate {
  return TEMPLATES[label];
}
