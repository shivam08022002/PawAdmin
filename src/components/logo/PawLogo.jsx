export default function PawLogo({ size = 28 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        background: '#f97316',
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      <img
        src={new URL('../../assets/paws.png', import.meta.url).toString()}
        alt=""
        draggable={false}
        style={{
          width: Math.round(size * 0.62),
          height: Math.round(size * 0.62),
          objectFit: 'contain',
          filter: 'invert(1)',
          opacity: 0.95,
        }}
      />
    </span>
  )
}
