import Image from 'next/image';

export default function RedCarpetNight() {
  return (
    <section className="red-carpet-container">
      <div className="image-wrapper">
        <Image
          src="/assets/images/red-carpet-night.jpg"
          alt="MEA Red Carpet Night"
          width={1100}
          height={750}
          priority
          className="red-carpet-image"
        />
      </div>
    </section>
  );
}
