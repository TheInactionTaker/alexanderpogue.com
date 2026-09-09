# alexanderpogue.com

A hand-written static site — plain HTML and CSS with one small JavaScript file. There is no build step, no framework, and no dependencies. Editing a file and pushing it is the whole deploy process.

Hosted on GitHub Pages at the domain in `CNAME`.

## Previewing locally

```
python serve.py
```

Then open http://127.0.0.1:8000/. Pass a port to use a different one, e.g. `python serve.py 8830`.

**Use this instead of `python -m http.server`.** GitHub Pages resolves an extensionless URL like `/projects/forests_bane` by looking for `forests_bane.html`, but Python's built-in server does not, so project pages 404 under it. `serve.py` is a ~20-line subclass that copies the hosted behaviour, so the preview matches production.

## Layout

```
index.html            home page
projects.html         project browser (cards + filter sidebar)
projects/*.html       one page per project
assets/css/style.css  all styling for the whole site
assets/js/projects.js checkbox filtering for the project cards
assets/img/           art, thumbnails, crowns, badge icons
serve.py              local preview server (never deployed)
```

## Conventions

**Links leave off `.html`.** Write `href="/projects/forests_bane"`, not `href="/projects/forests_bane.html"`. The home page is `href="/"`. Note that the *files* keep their `.html` names — only the links omit it. Both forms load, so a stray `.html` won't break anything, it just looks less tidy.

**Every page needs its own `<link rel="canonical">`** in the `<head>`, pointing at its clean URL. Because a page answers at both `/foo` and `/foo.html`, this tells search engines which address is the real one.

> If you create a page by copying an existing one, **change the canonical URL.** Leaving the old one behind tells Google the new page is a duplicate of the page you copied, which can keep it out of search results. Nothing looks wrong on screen when this is wrong, so it's the one mistake here that won't announce itself.

## Adding a project page

1. Copy an existing page in `projects/` as a starting point. `fenton_moores_management_framework.html` is the simplest (title, one image, centred copy); `forests_bane.html` has alternating image/text rows.
2. Update the `<title>` **and the canonical URL**.
3. Save the project's crown art to `assets/img/`, and point the page's `<img class="project-crown">` at it.
4. If the crown's base is not black, add a modifier class in `style.css` next to `.project-page--vince` setting `--crown-base` to the crown's bottom colour and `--crown-base-text` to a readable tone for the footer text. Put that class on `<body>` alongside `project-page`. This is what keeps the footer flush with the crown instead of showing a seam.
5. In `projects.html`, change that project's card from `<article class="project-card">` to `<a class="project-card" href="/projects/your-page">` so it becomes clickable.

## Card filtering

Cards in `projects.html` carry `data-type` (`game`, `webcomic`, `animation`) and `data-released` (`true`/`false`). The sidebar checkboxes read those attributes, so a new card is filterable as soon as it has them — no JavaScript changes needed.
