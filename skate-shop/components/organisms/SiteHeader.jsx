"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Logo from "@/components/atoms/Logo";
import Button from "@/components/atoms/Button";

/**
 * @file Organismo: barra de navegación fija del sitio.
 */

/**
 * Header fijo con el logo, las anclas de navegación y la llamada a la
 * acción de compra. Entra desde arriba con una animación GSAP al cargar.
 *
 * @component
 * @param {Object} props
 * @param {import('@/lib/content').NavItem[]} props.nav - Enlaces de navegación.
 * @param {{label: string, href: string}} props.cta - Botón de compra del header.
 * @returns {JSX.Element}
 */
export default function SiteHeader({ nav, cta }) {
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { yPercent: -120, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out", delay: 0.2 },
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-foreground/10 bg-background/50 px-6 py-4 opacity-0 backdrop-blur-md md:px-12"
    >
      <a href="#inicio" aria-label="Volver al inicio">
        <Logo />
      </a>

      <nav className="hidden gap-8 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/70 md:flex">
        {nav.map((item) => (
          <a key={item.href} href={item.href} className="transition-colors hover:text-accent">
            {item.label}
          </a>
        ))}
      </nav>

      <Button href={cta.href} size="sm">
        {cta.label}
      </Button>
    </header>
  );
}
