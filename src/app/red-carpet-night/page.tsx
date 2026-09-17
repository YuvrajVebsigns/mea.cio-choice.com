import Image from 'next/image';

export default function RedCarpetNight() {
  return (
    <section className="red-carpet-container">
      <div className="image-wrapper">
        <Image
          src="/assets/images/MEA-redcarpet-night.png"
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
