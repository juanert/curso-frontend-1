"use client";

import dynamic from "next/dynamic";

/**
 * @file Molécula: video controlado por scroll (envoltura de scrolly-video).
 */

/*
 * scrolly-video manipula `document` en cuanto se instancia, así que solo
 * puede cargarse en el navegador (ssr: false).
 */
const ScrollyVideoPlayer = dynamic(
  () => import("scrolly-video/dist/ScrollyVideo.esm.jsx"),
  { ssr: false },
);

/**
 * Video que avanza fotograma a fotograma con el scroll del usuario.
 *
 * scrolly-video renderiza un contenedor sticky de 100vh y usa la altura
 * del ELEMENTO PADRE como pista de avance: al colocar esta molécula dentro
 * de una sección alta (p. ej. `h-[400vh]`), el video se reproduce de 0 a
 * 100% mientras esa sección cruza el viewport.
 *
 * `lockScroll` se desactiva siempre: con él activo, scrolly-video "devuelve"
 * la página hasta el frame actual del video y, al haber dos videos en la
 * misma página, ambas instancias pelean por la posición del scroll cuando
 * el usuario salta con las anclas del menú. La transición de fotogramas ya
 * queda suavizada por `transitionSpeed`.
 *
 * @component
 * @param {Object} props
 * @param {string} props.src - Ruta del video (mp4) servido desde /public.
 * @param {number} [props.transitionSpeed=8] - Velocidad máxima de transición entre frames.
 * @returns {JSX.Element}
 *
 * @example
 * <section className="relative h-[400vh]">
 *   <ScrollVideo src="/media/hero.mp4" />
 * </section>
 */
export default function ScrollVideo({ src, transitionSpeed = 8 }) {
  return (
    <ScrollyVideoPlayer src={src} transitionSpeed={transitionSpeed} lockScroll={false} />
  );
}
