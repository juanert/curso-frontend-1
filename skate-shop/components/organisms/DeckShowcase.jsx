"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import SectionIntro from "@/components/molecules/SectionIntro";
import DeckFeatureCard from "@/components/molecules/DeckFeatureCard";
import ScrollVideo from "@/components/molecules/ScrollVideo";

/**
 * @file Organismo: vitrina de la colección controlada por scroll (sección 2).
 */

/**
 * Sección 2 de la landing. El video (controlado por scrolly-video sobre
 * 500vh de pista) muestra las tablas de la tienda entrando por la derecha
 * hasta quedar todas presentadas. En paralelo, GSAP hace entrar por la
 * derecha — con stagger sincronizado al scrub — una tarjeta por cada una
 * de las 8 tablas, imitando el movimiento del video.
 *
 * @component
 * @param {Object} props
 * @param {import('@/lib/content').ShowcaseContent} props.content - Copy, video y tablas.
 * @returns {JSX.Element}
 */
export default function DeckShowcase({ content }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tl.fromTo(
        "[data-showcase-intro]",
        { autoAlpha: 0, x: -80 },
        { autoAlpha: 1, x: 0, duration: 8 },
        0,
      )
        // Una tarjeta por tabla: entran escalonadas mientras el video presenta cada deck.
        .fromTo(
          "[data-deck-card]",
          { autoAlpha: 0, xPercent: 140 },
          { autoAlpha: 1, xPercent: 0, duration: 10, stagger: 9 },
          10,
        )
        .to({}, { duration: 12 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="coleccion" className="relative h-[500vh]">
      <ScrollVideo src={content.video} />

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden px-6 pb-10 pt-24 md:px-12">
          <div className="absolute inset-0 bg-linear-to-b from-background/80 via-transparent to-background/85" />

          <div data-showcase-intro className="relative max-w-2xl opacity-0">
            <SectionIntro
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
              align="left"
            />
          </div>

          <ul className="relative grid list-none grid-cols-2 gap-3 md:grid-cols-4">
            {content.decks.map((deck, index) => (
              <li key={deck.name} data-deck-card className="opacity-0">
                <DeckFeatureCard index={index + 1} name={deck.name} price={deck.price} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
