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
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
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
          {title: 'Women', value: 'Women'},
          {title: 'Men', value: 'Men'},
          {title: 'Kids', value: 'Kids'},
        ],
      },
    }),
    defineField({
      name: 'isNewArrival',
      title: 'Is New Arrival?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})