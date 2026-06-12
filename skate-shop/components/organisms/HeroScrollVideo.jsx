"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import ScrollCue from "@/components/molecules/ScrollCue";
import ScrollVideo from "@/components/molecules/ScrollVideo";

/**
 * @file Organismo: héroe con video reproducido por el scroll (sección 1).
 */

/**
 * Sección 1 de la landing. El frame inicial muestra al skater con su
 * tabla en el aire; al bajar, scrolly-video avanza el video fotograma a
 * fotograma a lo largo de 400vh de scroll. GSAP (ScrollTrigger + scrub)
 * sincroniza los textos: el titular se desvanece al empezar a bajar y el
 * mensaje de cierre aparece cuando el video está por terminar.
 *
 * @component
 * @param {Object} props
 * @param {import('@/lib/content').HeroContent} props.content - Copy y video de la sección.
 * @returns {JSX.Element}
 */
export default function HeroScrollVideo({ content }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Línea de tiempo "esclava" del scroll: 1 unidad de duración = 1% del recorrido.
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.to("[data-hero-intro]", { autoAlpha: 0, yPercent: -35, duration: 15 }, 0)
        .to("[data-hero-cue]", { autoAlpha: 0, duration: 8 }, 0)
        .fromTo(
          "[data-hero-outro]",
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 20 },
          72,
        )
        .to({}, { duration: 8 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="inicio" className="relative h-[400vh]">
      {/* La sección de 400vh es la "pista" que scrolly-video usa para el avance. */}
      <ScrollVideo src={content.video} />

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-background/70 via-background/10 to-background/80" />

          <div
            data-hero-intro
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center"
          >
            <Badge>{content.eyebrow}</Badge>
            <Heading as="h1" size="xl" className="max-w-4xl">
              {content.title}
            </Heading>
            <Text size="lg" className="max-w-xl">
              {content.description}
            </Text>
            <Button href={content.ctaHref} className="pointer-events-auto mt-2">
              {content.cta}
            </Button>
          </div>

          <div data-hero-cue className="absolute inset-x-0 bottom-8 flex justify-center">
            <ScrollCue label={content.cue} />
          </div>

          <div
            data-hero-outro
            className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-6 text-center opacity-0"
          >
            <Heading size="xl" className="text-stroke">
              {content.outroTitle}
            </Heading>
            <Text size="lg" className="max-w-xl" muted={false}>
              {content.outroText}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
