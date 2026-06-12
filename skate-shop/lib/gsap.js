"use client";

/**
 * @file Punto único de configuración de GSAP.
 * Registra el plugin ScrollTrigger una sola vez (solo en el navegador)
 * y re-exporta `gsap` y `ScrollTrigger` para todos los organismos.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
