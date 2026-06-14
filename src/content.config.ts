import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const site = defineCollection({
  loader: glob({ pattern: "site.yaml", base: "./content" }),
  schema: z.object({
    name: z.string(),
    short_name: z.string(),
    logo: z.string().optional(),
    favicon: z.string().optional(),
    nav: z.array(z.object({
      label: z.string(),
      href: z.string(),
      children: z.array(z.object({
        label: z.string(),
        href: z.string(),
      })).optional(),
    })),
    footer: z.object({
      address_lines: z.array(z.string()).optional(),
      quick_links: z.array(z.object({ label: z.string(), href: z.string() })),
      contact: z.object({
        email: z.string().optional(),
        phone: z.string().optional(),
        fax: z.string().optional(),
      }).optional(),
      socials: z.array(z.object({
        platform: z.string(),
        url: z.string().url(),
      })).optional(),
      bottom_links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
    }),
  }),
});

const homepage = defineCollection({
  loader: glob({ pattern: "homepage.yaml", base: "./content" }),
  schema: z.object({
    hero: z.object({
      tag: z.string().optional(),
      title: z.string(),
      subtitle: z.string(),
      image: z.string().optional(),
      cta_buttons: z.array(z.object({
        label: z.string(),
        href: z.string(),
        primary: z.boolean().optional(),
      })),
    }),
  }),
});

const personSchema = z.object({
  name: z.string(),
  type: z.enum(['faculty', 'staff', 'phd', 'ms', 'btech', 'alumni']).optional(),
  role: z.string(),
  qualification: z.string().optional(),
  area: z.string().optional(),
  email: z.string().optional(),
  page: z.string().optional(),
  labs: z.array(z.string()).optional(),
});

const labs = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./content/labs" }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    image: z.string().optional(),
    overview: z.object({
      about: z.string(),
      highlights: z.array(z.string()),
    }),
    research_areas: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
    projects: z.array(z.object({
      title: z.string(),
      description: z.string(),
      status: z.string().optional(),
    })).optional(),
    publications: z.array(z.object({
      title: z.string(),
      authors: z.string(),
      venue: z.string(),
    })).optional(),
  }),
});

const people = defineCollection({
  loader: glob({ pattern: "people.yaml", base: "./content" }),
  schema: z.object({
    heading: z.string(),
    description: z.string(),
    members: z.array(personSchema),
  }),
});

const eventSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  date: z.string(),
  end_date: z.string().optional(),
  month: z.string(),
  day: z.string(),
  description: z.string(),
  venue: z.string().optional(),
  link: z.string().optional(),
  image: z.string().optional(),
});

const events = defineCollection({
  loader: glob({ pattern: "events.yaml", base: "./content" }),
  schema: z.object({
    heading: z.string(),
    description: z.string(),
    upcoming: z.array(eventSchema).optional(),
    past: z.array(eventSchema).optional(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "news.yaml", base: "./content" }),
  schema: z.object({
    heading: z.string(),
    description: z.string(),
    items: z.array(z.object({
      title: z.string(),
      date: z.string(),
      description: z.string(),
      category: z.string().optional(),
    })),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "education.yaml", base: "./content" }),
  schema: z.object({
    heading: z.string(),
    description: z.string(),
    programs: z.array(z.object({
      title: z.string(),
      description: z.string(),
      level: z.string().optional(),
      link: z.string().optional(),
    })),
  }),
});

export const collections = { site, homepage, labs, people, events, news, education };
