import { getCollection, type CollectionEntry } from 'astro:content';

/** Collections that hold a single YAML document rather than many entries. */
type SingletonCollection = 'site' | 'homepage' | 'news' | 'events' | 'education' | 'people';

/** Returns the data of a singleton collection's only entry. */
export async function getSingle<C extends SingletonCollection>(
  collection: C,
): Promise<CollectionEntry<C>['data']> {
  const entries = await getCollection(collection);
  return entries[0].data;
}
