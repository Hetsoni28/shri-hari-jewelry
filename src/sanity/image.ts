import { createImageUrlBuilder } from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from './env'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

/**
 * Safely build an image URL from a Sanity image source.
 * Returns null if the image has no valid asset reference
 * (prevents crashes when images are partially uploaded or missing).
 */
export const urlForImage = (source: Image | null | undefined) => {
  // Guard: must have source, and must have an asset reference
  if (
    !source ||
    !source.asset ||
    !(source.asset as { _ref?: string })?._ref
  ) {
    return null
  }

  try {
    return imageBuilder?.image(source).auto('format').fit('max')
  } catch {
    return null
  }
}