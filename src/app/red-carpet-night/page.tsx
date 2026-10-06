import Image from 'next/image';

export default function RedCarpetNight() {
  return (
    <section className="red-carpet-container">
      <div className="image-wrapper">
        <Image
          src="/assets/images/MEA-redcarpet-night.jpeg"
          alt="MEA Red Carpet Night"
          width={600}
          height={550}
          priority
          className="red-carpet-image"
        />
      </div>
    </section>
  );
}
