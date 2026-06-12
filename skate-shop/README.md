# ASFALTO Skate Co. 🛹

Landing page de una tienda de skate construida con **Next.js (App Router)**, **scrolly-video** y **GSAP (ScrollTrigger)**. Proyecto 100% frontend, sin backend. Todos los recursos visuales (videos e imágenes) fueron generados con **Higgsfield**.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y **desliza hacia abajo**: toda la página se controla con el scroll.

## Las 3 secciones

| Sección | Técnica | Qué hace |
| --- | --- | --- |
| 1. Héroe (`#inicio`) | scrolly-video + GSAP | El frame inicial muestra al skater con su tabla en el aire; al bajar, el video (5 s) avanza fotograma a fotograma sobre 400vh de scroll. GSAP desvanece el titular al empezar y revela el mensaje de cierre al final. |
| 2. Colección (`#coleccion`) | scrolly-video + GSAP | Video de las 8 tablas de la tienda entrando por la derecha. Una tarjeta por tabla entra también por la derecha, escalonada con el scrub de ScrollTrigger. |
| 3. Tienda (`#tienda`) | GSAP parallax | Skatepark de fondo + skater en PNG transparente, ambos "fijos" (sticky) pero moviéndose a velocidades distintas para crear profundidad. CTA final de compra. |

## Arquitectura (Atomic Design)

```
components/
├── atoms/        Badge, Button, Heading, Logo, Text
├── molecules/    DeckFeatureCard, ScrollCue, ScrollVideo, SectionIntro
├── organisms/    SiteHeader, HeroScrollVideo, DeckShowcase, ParallaxOutro, SiteFooter
└── templates/    LandingTemplate
lib/
├── content.js    Copy comercial centralizado (con typedefs JSDoc)
└── gsap.js       Registro único de ScrollTrigger
app/
└── page.js       Renderiza LandingTemplate con el contenido
```

Todos los componentes están documentados con **JSDoc** (props, tipos y ejemplos de uso).

## Notas técnicas

- `scrolly-video` usa la altura del **elemento padre** como pista de avance: por eso cada sección de video es un `<section>` alto (`h-[400vh]`, `h-[500vh]`) con la molécula `ScrollVideo` dentro.
- La librería manipula `document` al instanciarse, así que se carga con `next/dynamic` y `ssr: false` (ver `components/molecules/ScrollVideo.jsx`).
- GSAP se registra una sola vez en `lib/gsap.js`; los organismos usan `gsap.context()` y hacen `revert()` al desmontar.
- Los assets viven en `public/media/` (2 videos mp4 de 1080p, el fondo del skatepark y el PNG recortado del skater).
