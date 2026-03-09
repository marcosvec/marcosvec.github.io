# Marco Svec — Portfolio

Personal portfolio website for Marco Svec, a Mechanical & Aerospace Engineering student at Rensselaer Polytechnic Institute.

## About

I'm a dual-degree ME/AE student at RPI with a focus on CAD, mechanical systems, and building software that solves real problems. Outside of coursework I work at Merrick Bicycles doing assembly and repairs, lead the CAD side of the RPI-Dorms-Space project using Siemens NX, and develop BikeSuite — a POS system for bike shops.

This site is where I keep my project work, both engineering and software. It's built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, just a clean static site hosted on GitHub Pages.

## Projects

**RPI-Dorms-Space** — I lead the CAD modeling effort for this collaborative project, which creates accurate 3D models of RPI dorm rooms. The web viewer you can explore on the site is built in Three.js directly from the NX geometry.

**BikeSuite** — A bike shop POS system I've been developing to replace Ascend RMS for small shops. It handles service tickets, inventory, and customer records. I'm currently integrating AI features for predictive maintenance and pricing insights.

**CAD portfolio** — Mechanical and aerospace assemblies built in Siemens NX and SolidWorks over the course of my time at RPI.

## File Structure

```
marcosvec.github.io/
├── index.html
├── projects.html
├── styles.css
├── script.js
├── CNAME
├── LICENSE
└── README.md
```

## Technical notes

The site uses CSS custom properties for theming and persists the user's preference in localStorage with a URL parameter fallback for cases where that doesn't work. The scroll effects are disabled on mobile and for users with reduced motion preferences. The 3D viewer (interactive-room.html) is kept out of the main repo since it's still a work in progress.

Browser support targets Chrome 60+, Firefox 55+, Safari 12+, and Edge 79+.

## License

MIT.
