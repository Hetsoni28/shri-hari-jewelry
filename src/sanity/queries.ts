import {groq} from 'next-sanity'

export const productsQuery = groq`*[_type == "product"] {
  _id,
  name,
  "slug": slug.current,
  "images": images[asset._ref != null],
  description,
  category,
  subcategory,
  isNewArrival,
  metalType
}`

// Optimised query for catalog listing — only fetches the FIRST image per product.
// With 500+ products this reduces payload by ~80% vs fetching all images.
export const catalogProductsQuery = groq`*[_type == "product"] | order(_createdAt desc) {
  _id,
  name,
  "slug": slug.current,
  "images": images[0..0][asset._ref != null],
  category,
  subcategory,
  isNewArrival,
  metalType
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  "images": images[asset._ref != null],
  description,
  category,
  subcategory,
  isNewArrival,
  metalType
}`