import Title from "@/components/shared/Title"
import categories from "@/data/categories"
import Image from "next/image"
import Link from "next/link"


const FeaturedCategories = () => {
    return (
        <section className="max-w-6xl mx-auto">
            <Title text="Shop by Cateogory" />
            <div className="grid px-4 sm:px-0 grid-cols-2 md:grid-cols-5 gap-4">
                {
                    categories.map((category) => (
                        <Link href={`/categories/${category.slug}`} key={category.slug}>
                            <div>
                                <Image className="w-full" src={category.image} width={400} height={400} alt={category.name} />
                                <p className="relative bottom-8 left-2 font-bold text-white text-lg">{category.name}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <div className="flex justify-center">
                <Link href="/categories" className="bg-primary text-white uppercase px-4 py-2 font-semibold"> View All Categories</Link>
            </div>
        </section>
    )
}

export default FeaturedCategories