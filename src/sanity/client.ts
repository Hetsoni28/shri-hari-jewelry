import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId, useCdn} from './env'

const baseClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
})

export const client = {
  ...baseClient,
  fetch: async (query: string, params = {}) => {
    try {
      if (projectId === 'your-project-id' || projectId === 'your_project_id_here') {
        console.warn('Using fallback Sanity project ID, returning empty data.');
        return [];
      }
      return await baseClient.fetch(query, params);
    } catch (error) {
      console.warn('Sanity fetch failed, returning empty data.', error);
      return [];
    }
  }
}