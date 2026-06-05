# LTRC Website

Static website for the Language Technologies Research Centre (LTRC) at IIIT Hyderabad. Built with Astro 5.

## Setup

```
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
```

Requires Node 18+.

## Editing content

All site content lives in YAML files under `content/`. No code changes needed for routine updates.

| File | What it controls |
|------|-----------------|
| `content/site.yaml` | Site name, navigation links, footer (address, contact, socials) |
| `content/homepage.yaml` | Hero section (title, subtitle, image, CTA buttons) |
| `content/people.yaml` | All people -- faculty, staff, students, alumni |
| `content/events.yaml` | Upcoming and past events |
| `content/news.yaml` | News items |
| `content/labs/*.yaml` | Per-lab pages (overview, research areas, projects, publications) |

Each YAML file is validated against a Zod schema in `src/content.config.ts`. The build will fail with a clear error if a required field is missing or has the wrong type.

### People

`content/people.yaml` is the single source of truth for all person data. Each person has a `type` (faculty, staff, phd, ms, btech, alumni) and an optional `labs` array linking them to one or more labs. Lab detail pages pull their people section from this file -- there is no duplication.

### Events

`content/events.yaml` has `upcoming` and `past` arrays. The homepage pulls upcoming events from the same file.

### Adding a new lab

1. Create `content/labs/your-lab.yaml` following the structure of existing lab files (name, slug, tagline, description, overview, research_areas, projects, publications).
2. Add people to `content/people.yaml` with `labs: ["Your Lab Name"]`.
3. Optionally add the lab to the nav dropdown in `content/site.yaml`.

The lab detail page at `/labs/<slug>` and the labs index page are generated automatically.

## Deployment

`npm run build` produces a fully static site in `dist/`. Deploy to any static host (Netlify, Vercel, GitHub Pages, a plain web server, etc.).
