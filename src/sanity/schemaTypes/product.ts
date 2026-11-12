import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        // Custom slugify: converts spaces & special chars to hyphens, lowercase
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, '-')   // spaces & non-word chars → hyphens
            .replace(/^-+|-+$/g, ''),    // strip leading/trailing hyphens
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description:
                'Describe the photo for Google and screen readers, e.g. "22KT gold Cuban link chain on cream silk". Leave empty to use the product name.',
              validation: (Rule) => Rule.max(125).warning('Keep alt text under 125 characters'),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Necklaces', value: 'Necklaces'},
          {title: 'Earrings', value: 'Earrings'},
          {title: 'Rings', value: 'Rings'},
          {title: 'Bangles', value: 'Bangles'},
          {title: 'Bracelets', value: 'Bracelets'},
          {title: 'Bracelet', value: 'Bracelet'},
          {title: 'Diamond', value: 'Diamond'},
          {title: 'Set', value: 'Set'},
          {title: 'Jhumar', value: 'Jhumar'},
          {title: 'MS Lockets', value: 'MS Lockets'},
          {title: 'Dokiya', value: 'Dokiya'},
          {title: 'Kanchain', value: 'Kanchain'},
          {title: 'Pendants', value: 'Pendants'},
          {title: 'Mala', value: 'Mala'},
          {title: 'Bali', value: 'Bali'},
          {title: 'Mangalsutra', value: 'Mangalsutra'},
          {title: 'Rudrakash', value: 'Rudrakash'},
          {title: 'Lucky', value: 'Lucky'},
          {title: 'Nazriya', value: 'Nazriya'},
        ],
      },
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      options: {
        list: [
          {title: 'Antique', value: 'Antique'},
          {title: 'Diamond', value: 'Diamond'},
          {title: 'Women',   value: 'Women'},
          {title: 'Men',     value: 'Men'},
          {title: 'Unisex',  value: 'Unisex'},
          {title: 'Kids',    value: 'Kids'},
        ],
      },
    }),
    defineField({
      name: 'isNewArrival',
      title: 'Is New Arrival?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'metalType',
      title: 'Metal Type',
      type: 'string',
      initialValue: 'Gold',
      options: {
        list: [
          {title: '🥇 Gold',   value: 'Gold'},
          {title: '🩶 Silver', value: 'Silver'},
        ],
      },
    }),

    // ── SEO (all optional — sensible defaults are generated when empty) ──
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      description: 'Title shown in Google. Leave empty to use the product name. Best under 60 characters.',
      validation: (Rule) => Rule.max(60).warning('Google usually cuts titles after ~60 characters'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      group: 'seo',
      description: 'The summary under the title in Google. Leave empty to use the start of the description.',
      validation: (Rule) => Rule.max(160).error('Keep the meta description to 160 characters or fewer'),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
      description: 'Turn on to keep this product out of Google and the sitemap (it stays visible on the site).',
    }),
  ],
  groups: [
    {name: 'seo', title: 'SEO'},
  ],
})