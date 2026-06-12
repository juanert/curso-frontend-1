"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";

/**
 * @file Organismo: cierre con parallax de dos capas (sección 3).
 */

/**
 * Sección 3 de la landing. Dos capas "fijas" (sticky a pantalla completa)
 * que GSAP desplaza a velocidades distintas mientras la sección cruza el
 * viewport: el skatepark de fondo se mueve lento y el skater (PNG con
 * transparencia) se eleva más rápido, creando profundidad. Sobre ambas,
 * la llamada final a comprar.
 *
 * @component
 * @param {Object} props
 * @param {import('@/lib/content').OutroContent} props.content - Copy e imágenes de la sección.
 * @returns {JSX.Element}
 */
export default function ParallaxOutro({ content }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Capa 1: el fondo recorre poco (velocidad lenta).
      gsap.fromTo(
        "[data-parallax-bg]",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // Capa 2: el skater recorre más (velocidad rápida) y en sentido contrario.
      gsap.fromTo(
        "[data-parallax-skater]",
        { yPercent: 18 },
        {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // El copy aparece cuando la sección queda fijada.
      gsap.fromTo(
        "[data-parallax-copy]",
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=60%",
            scrub: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="tienda" className="relative h-[220vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div data-parallax-bg className="absolute inset-0 scale-110 will-change-transform">
          <Image
            src={content.background}
            alt={content.backgroundAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-background/60" />

        <div
          data-parallax-skater
          className="absolute -bottom-6 right-[4%] w-52 will-change-transform sm:w-72 md:right-[8%] md:w-96"
        >
          <Image
            src={content.skater}
            alt={content.skaterAlt}
            width={1344}
            height={2016}
            className="h-auto w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
          />
        </div>

        <div
          data-parallax-copy
          className="relative z-10 flex h-full max-w-3xl flex-col items-start justify-center gap-6 px-6 opacity-0 md:px-16"
        >
          <Badge>{content.eyebrow}</Badge>
          <Heading size="xl">{content.title}</Heading>
          <Text size="lg" className="max-w-xl">
            {content.description}
          </Text>
          <div className="mt-2 flex flex-wrap gap-4">
            <Button href="#coleccion">{content.primaryCta}</Button>
            <Button href="#inicio" variant="ghost">
              {content.secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
