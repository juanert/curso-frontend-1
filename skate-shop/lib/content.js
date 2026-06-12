/**
 * @file Contenido comercial centralizado de la landing de ASFALTO Skate Co.
 * Mantener el copy aquí permite que los organismos sean puramente
 * presentacionales y reutilizables (atomic design).
 */

/**
 * @typedef {Object} NavItem
 * @property {string} label - Texto visible del enlace.
 * @property {string} href - Ancla de destino dentro de la página.
 */

/**
 * @typedef {Object} HeroContent
 * @property {string} video - Ruta del video que se reproduce con el scroll.
 * @property {string} eyebrow - Texto corto sobre el titular.
 * @property {string} title - Titular principal de la tienda.
 * @property {string} description - Bajada comercial del titular.
 * @property {string} cta - Texto del botón principal.
 * @property {string} ctaHref - Ancla de destino del botón.
 * @property {string} cue - Texto del indicador de scroll.
 * @property {string} outroTitle - Titular que aparece al final del video.
 * @property {string} outroText - Texto de cierre de la sección.
 */

/**
 * @typedef {Object} Deck
 * @property {string} name - Nombre comercial de la tabla.
 * @property {number} price - Precio en USD.
 */

/**
 * @typedef {Object} ShowcaseContent
 * @property {string} video - Ruta del video de la colección.
 * @property {string} eyebrow
 * @property {string} title
 * @property {string} description
 * @property {Deck[]} decks - Las 8 tablas de la colección.
 */

/**
 * @typedef {Object} OutroContent
 * @property {string} background - Imagen de fondo (skatepark).
 * @property {string} backgroundAlt - Texto alternativo del fondo.
 * @property {string} skater - PNG transparente del patinador.
 * @property {string} skaterAlt - Texto alternativo del patinador.
 * @property {string} eyebrow
 * @property {string} title
 * @property {string} description
 * @property {string} primaryCta
 * @property {string} secondaryCta
 */

/**
 * @typedef {Object} FooterColumn
 * @property {string} title - Título de la columna.
 * @property {string[]} links - Enlaces de la columna.
 */

/**
 * @typedef {Object} FooterContent
 * @property {string} tagline
 * @property {FooterColumn[]} columns
 * @property {string} legal
 */

/**
 * @typedef {Object} LandingContent
 * @property {NavItem[]} nav
 * @property {{label: string, href: string}} headerCta
 * @property {HeroContent} hero
 * @property {ShowcaseContent} showcase
 * @property {OutroContent} outro
 * @property {FooterContent} footer
 */

/** @type {LandingContent} */
export const LANDING_CONTENT = {
  nav: [
    { label: "Inicio", href: "#inicio" },
    { label: "Colección", href: "#coleccion" },
    { label: "Tienda", href: "#tienda" },
  ],
  headerCta: { label: "Compra ahora", href: "#tienda" },

  hero: {
    video: "/media/hero.mp4",
    eyebrow: "Colección 2026 — ya disponible",
    title: "Nacidos para volar",
    description:
      "Tablas profesionales para quienes ven la ciudad como una pista. Sigue bajando y mira lo que una ASFALTO hace en el aire.",
    cta: "Ver la colección",
    ctaHref: "#coleccion",
    cue: "Desliza",
    outroTitle: "Hecha para el aire",
    outroText:
      "Arce canadiense de 7 capas, cóncavo medio y pop que no se rinde. Cada tabla se prueba donde importa: en el asfalto.",
  },

  showcase: {
    video: "/media/coleccion.mp4",
    eyebrow: "La colección",
    title: "Ocho tablas. Cero límites.",
    description:
      "Cada una entra a escena como tú a la rampa: por la derecha y sin pedir permiso. Elige la que va contigo.",
    decks: [
      { name: "La Clásica", price: 59 },
      { name: "Neón Ácido", price: 64 },
      { name: "Damero", price: 62 },
      { name: "Llamarada", price: 66 },
      { name: "Calavera", price: 68 },
      { name: "Vértigo", price: 61 },
      { name: "Medianoche", price: 63 },
      { name: "Salvaje", price: 65 },
    ],
  },

  outro: {
    background: "/media/skatepark.png",
    backgroundAlt: "Parque de skate urbano al atardecer cubierto de graffitis",
    skater: "/media/skater.png",
    skaterAlt: "Skater sosteniendo su tabla ASFALTO",
    eyebrow: "Tu próximo truco",
    title: "Tu ciudad. Tu pista.",
    description:
      "Llévate una ASFALTO hoy: envío gratis a todo el país, cambios sin preguntas durante 30 días y stickers de regalo en cada pedido.",
    primaryCta: "Compra ahora",
    secondaryCta: "Encuentra tu spot",
  },

  footer: {
    tagline:
      "Tablas que vuelan, calles que hablan. Desde 2026 haciendo que cada bajada cuente.",
    columns: [
      { title: "Tienda", links: ["Tablas completas", "Decks", "Trucks", "Ruedas"] },
      { title: "Soporte", links: ["Envíos", "Cambios y devoluciones", "Garantía", "Contacto"] },
      { title: "Comunidad", links: ["Instagram", "TikTok", "YouTube", "Eventos"] },
    ],
    legal: "© 2026 ASFALTO Skate Co. — Hecho para patinar, no para guardarse.",
  },
};
