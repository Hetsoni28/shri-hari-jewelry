import {defineField, defineType} from 'sanity'

// The shop's own Indian board rate. The site shows the latest one set within the last
// 36 hours ("Shop rate"); otherwise it shows no number and invites visitors to ask on
// WhatsApp. To update: Studio → "Today's rate" → create new.
const perGram = (name: string, title: string, min: number, max: number) =>
  defineField({
    name,
    title,
    type: 'number',
    description: '₹ per gram',
    validation: (Rule) =>
      Rule.required()
        .min(min)
        .max(max)
        .error(`Should be between ₹${min} and ₹${max} per gram — please check the number`),
  })

export default defineType({
  name: 'dailyRate',
  title: "Today's rate",
  type: 'document',
  description:
    "Enter today's rate each morning — the website shows it straight away. If no rate is entered for 36 hours, the site asks visitors to message you for the rate instead of showing an old number.",
  fields: [
    defineField({
      name: 'updatedAt',
      title: 'Rate set at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    perGram('gold24', 'Gold 24KT (999)', 3000, 50000),
    perGram('gold22', 'Gold 22KT (916)', 3000, 50000),
    perGram('gold18', 'Gold 18KT (750)', 2000, 40000),
    perGram('silver', 'Silver (999)', 20, 2000),
  ],
  orderings: [{title: 'Newest first', name: 'newest', by: [{field: 'updatedAt', direction: 'desc'}]}],
  preview: {
    select: {date: 'updatedAt', gold22: 'gold22', silver: 'silver'},
    prepare: ({date, gold22, silver}) => ({
      title: `22KT ₹${gold22?.toLocaleString('en-IN')} · Silver ₹${silver}`,
      subtitle: date ? new Date(date).toLocaleString('en-IN') : '',
    }),
  },
})
