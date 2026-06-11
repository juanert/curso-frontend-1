import Link from 'next/link'

/** 
 * Un componente de botón reutilizable que puede ser activo o inactivo y opcionalmente puede tener un enlace.
 * @param {string} text - El texto que se mostrará en el botón.
 * @param {boolean} [active=false] - Indica si el botón está activo o no. Por defecto es falso.
 * @param {string} [link] - El enlace al que se dirigirá el botón. Si no se proporciona, el botón no tendrá enlace.
 * @returns {JSX.Element} Un elemento de botón estilizado según su estado activo o inactivo.
 * @example
 * <Button text="Click me" active={true} link="/home" />
 * <Button text="Click me" active={false} />
*/
export default function Button({ text, active = false, link} : { text: string, active?: boolean, link?: string }) {
  return (
    <Link href={link || ""}>
      <button className={`px-4 py-2 rounded ${active ? 'bg-white text-black' : 'bg-gray-200 text-white'}`}>
        {text}
      </button>
    </Link>
  )
}