import FeaturedCategories from "@/components/pages/home/FeaturedCategories";
import FeaturedProducts from "@/components/pages/home/FeaturedProducts";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <Image className="w-full" src="/images/hero.jpg" width={1200} height={400}
        alt="Hero Image" />
      <FeaturedCategories />
      <FeaturedProducts />
    </div>
  );
}
