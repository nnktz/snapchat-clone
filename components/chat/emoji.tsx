import Image from 'next/image'

interface EmojiProps {
  src: string
  alt: string
  onClick: () => void
}

export const Emoji = ({ src, alt, onClick }: EmojiProps) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="rounded-sm hover:bg-sigBackgroundSecondaryHover"
    >
      <Image src={src} alt={alt} width={70} height={70} />
    </div>
  )
}
