import Link from 'next/link'

export default function Title({ text, link } : { text: string, link?: string }) {
  return (
    <Link href={link || ""}>
      <h1 className="text-3xl font-bold mb-4 text-white">
        {text}
      </h1>
    </Link>
  )
}