import SiteHeader from "@/components/organisms/SiteHeader";
import HeroScrollVideo from "@/components/organisms/HeroScrollVideo";
import DeckShowcase from "@/components/organisms/DeckShowcase";
import ParallaxOutro from "@/components/organisms/ParallaxOutro";
import SiteFooter from "@/components/organisms/SiteFooter";

/**
 * @file Template: composición completa de la landing (atomic design).
 */

/**
 * Template de la landing. Ordena los organismos de la página:
 *
 * 1. HeroScrollVideo — video del skater controlado por el scroll.
 * 2. DeckShowcase — la colección entrando por la derecha (video + tarjetas).
 * 3. ParallaxOutro — cierre con parallax de dos velocidades y CTA final.
 *
 * No contiene copy propio: todo el contenido llega por props desde la página.
 *
 * @component
 * @param {Object} props
 * @param {import('@/lib/content').LandingContent} props.content - Contenido completo de la landing.
 * @returns {JSX.Element}
 */
export default function LandingTemplate({ content }) {
  return (
    <>
      <SiteHeader nav={content.nav} cta={content.headerCta} />
      <main>
        <HeroScrollVideo content={content.hero} />
        <DeckShowcase content={content.showcase} />
        <ParallaxOutro content={content.outro} />
      </main>
      <SiteFooter content={content.footer} />
    </>
  );
}
