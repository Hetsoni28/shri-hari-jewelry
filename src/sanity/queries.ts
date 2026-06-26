import {groq} from 'next-sanity'

export const productsQuery = groq`*[_type == "product"] {
  _id,
  name,
  "slug": slug.current,
  images,
  description,
  category,
  subcategory,
  isNewArrival
}`

export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {
  _id,
  name,
  "slug": slug.current,
  images,
  description,
  category,
  subcategory,
  isNewArrival
}`