# Updating your information on the LTRC website

Edit [`content/people.yaml`](content/people.yaml) and search for your name under
`members:`. Update the fields in your entry using the reference below. If you
are not listed yet, add an entry under the appropriate category comment.

This file supplies both the People pages and the member lists on lab pages, so
you only need to update your entry once. No code changes are needed.

## What you can change

Here is a fictional example showing every supported profile field. Replace the
example values with your own details and omit optional fields you do not need.

```yaml
  - name: "Asha Rao"
    type: phd
    role: "Research Scholar"
    qualification: "M.Tech in Computer Science"
    area: "Machine Translation; Advisor: Your Advisor's Name"
    email: "your-address@students.iiit.ac.in"
    page: "https://example.com/"
    labs: ["MT-NLP Lab"]
```

| Field | What to enter |
| --- | --- |
| `name` | Your full display name. Required. |
| `type` | Your category: `faculty`, `staff`, `phd`, `ms`, `btech`, or `alumni`. Set this so your entry appears on the correct People page. |
| `role` | Your title or programme, such as `Assistant Professor`, `Research Scholar`, `MS by Research`, `Dual Degree (CLD)`, or `Alumni`. Required. |
| `qualification` | Your qualifications, if you want them displayed. Optional. |
| `area` | Research interests and/or advisor information. Existing student entries commonly use `"Advisor: Full Name"`. Optional. |
| `email` | The email address you want displayed publicly. Optional. |
| `page` | A full URL to your personal or institutional webpage, including `https://`. Your name becomes a link to this page. Optional. |
| `labs` | A list of lab names from the table below. Optional; omit it or use `[]` if none apply. |

Only `name` and `role` are required by the schema, but you should always include
`type`: the People category pages filter entries using that field. Changing
`role` alone does not change your category.

Profiles currently have no photo field. Adding a photo or any other new kind of
profile information needs a separate code change; adding an unsupported YAML
field will not make it appear on the site.

### Lab memberships

Use the exact lab **name**, including capitalization, rather than the filename
or URL slug. Lab pages match these names exactly.

| Lab name for `labs` | Lab page |
| --- | --- |
| `MT-NLP Lab` | `/labs/mt-nlp` |
| `Speech Processing Lab` | `/labs/speech-processing` |
| `IREL` | `/labs/irel` |
| `Anusaaraka Lab` | `/labs/anusaaraka` |

For multiple affiliations, use a list such as:

```yaml
    labs: ["MT-NLP Lab", "Anusaaraka Lab"]
```

You do not need to add your profile to the lab's YAML file. Advisor text in
`area` does not automatically assign you to a lab; set `labs` separately.

## Adding yourself

First search the whole file for your name to avoid a duplicate. If you are
missing, add a new entry under the appropriate category comment within
`members:`, following the example above. A minimal entry looks like:

```yaml
  - name: "Your Full Name"
    type: ms
    role: "MS by Research"
```

Add any optional details you want to display. Do not create a second `members:`
section.

## Moving to alumni

Edit your existing entry to use `type: alumni` and update `role` to `"Alumni"`
or an appropriate description. Move the entire entry under the Alumni comment
to keep the file organized. Review your contact details, webpage, and lab
affiliations at the same time. Keeping a lab in `labs` keeps your entry on that
lab's member list, including after you change your type to `alumni`.

## YAML formatting tips

- Use spaces, not tabs. Match the example: two spaces before `- name:` and four
  before the other fields in that entry.
- Keep text values in quotes, especially text containing `:` or `#`.
- To leave out an optional field, remove its entire line. Do not leave a bare
  key such as `email:`; YAML treats that as a null value, which fails validation.
- Keep lab names inside a list, such as `["IREL"]`, rather than `labs: "IREL"`.
- Keep the existing `heading:`, `description:`, and `members:` structure intact.

## Submitting your changes

1. Fork [ltrc/ltrc.github.io](https://github.com/ltrc/ltrc.github.io) to your own
   account and create a branch for your update.
2. Edit `content/people.yaml` in your fork using the instructions above, then
   commit your changes with a message such as `Update Asha Rao's profile`.
3. Open a pull request from your branch to the `main` branch of
   `ltrc/ltrc.github.io`. Briefly describe what you changed.

If you already have write access, you can create a branch in the original
repository instead of forking it. Review the diff before opening your PR to
make sure it only includes the changes you intended.

Your update will appear on the website after the PR is merged and the
deployment succeeds.

## Other content updates

For changes beyond your profile, see the file map in the
[README](README.md#editing-content). Lab descriptions, projects, and publications
live in `content/labs/*.yaml`; news and events have their own content files.
Follow the structure of an existing entry when editing these files.
