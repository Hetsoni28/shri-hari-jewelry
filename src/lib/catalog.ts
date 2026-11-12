// Category naming for the catalogue.
//
// Sanity categories are free text, so the same thing can be spelled two ways
// ("Bracelet" / "Bracelets"). Filtering works on a normalised key; links like
// /catalog?category=Bracelets keep working because they are normalised too.

const ALIAS: Record<string, string> = {
  bracelets: 'bracelet',
};

const LABEL: Record<string, string> = {
  set: 'Sets',
  bracelet: 'Bracelets',
  'ms lockets': 'Lockets',
};

export const categoryKey = (category?: string | null) => {
  const k = (category ?? '').trim().toLowerCase();
  return ALIAS[k] ?? k;
};

export const categoryLabel = (key: string, original?: string | null) =>
  LABEL[key] ?? (original?.trim() || 'Other');
