import Link from 'next/link';
import Image from 'next/image';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Edit & Share Images
        <br />
        <span className="blue_gradient text-center">Cropped As You Desire</span>
      </h1>
      <p className="desc text-center">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
        explicabo nesciunt quos pariatur quod rem asperiores, nulla fuga
        accusantium perspiciatis fugit ut deleniti! Adipisci, accusamus.
      </p>
      <div className="my-6 w-full">
        <Image
          src="/assets/images/landing.jpg"
          alt="photos collection"
          width={1000}
          height={100}
          className="homepage_image mx-auto"
        />
      </div>
      <Link href="/edit-image" className="black_btn mb-10">
        <p className="text-lg px-3 py-2">Edit Your Image</p>
      </Link>
    </section>
  );
};

export default Home;
