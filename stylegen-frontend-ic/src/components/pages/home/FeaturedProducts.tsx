import Title from '@/components/shared/Title'
import products from '@/data/products'
import Image from 'next/image'
import Link from 'next/link'

const FeaturedProducts = () => {
    return (
        <section className='max-w-6xl mx-auto py-8'>
            <Title text="Featured Products" />
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 px-4 sm:px-0'>
                {
                    products.map((product) => (
                        <div key={product.slug} className='w-full h-auto'>
                            <Image src={product.image} width={400} height={400} alt={product.name} />
                            <p className="h-12">{product.name}</p>
                            <div className='flex gap-3 my-2'>
                                <span className='text-primary font-semibold'>BDT {product.discountPrice}</span>
                                <del className='text-gray-400'>BDT {product.price}</del>
                            </div>
                            <Link className='w-full block text-center py-1.5 px-4 bg-primary text-white uppercase' href={`/products/${product.slug}`}>Buy Now</Link>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default FeaturedProducts