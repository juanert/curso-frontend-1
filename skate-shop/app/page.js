import LandingTemplate from "@/components/templates/LandingTemplate";
import { LANDING_CONTENT } from "@/lib/content";

/**
 * @file Página principal de la tienda ASFALTO Skate Co.
 */

/**
 * Home: única página del sitio. Delega toda la composición visual
 * en el template `LandingTemplate` (atomic design) y le inyecta el
 * contenido comercial centralizado.
 *
 * @returns {JSX.Element}
 */
export default function Home() {
  return <LandingTemplate content={LANDING_CONTENT} />;
}
