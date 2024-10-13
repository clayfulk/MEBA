import Image from 'next/image'

export function Logo() {
  return (
    <div className="rounded-lg overflow-hidden">
      <Image
        src="/images/MEBAAPPLOGO.png"
        alt="MEBA Logo"
        width={100}
        height={100}
        className="rounded-lg"
      />
    </div>
  )
}
