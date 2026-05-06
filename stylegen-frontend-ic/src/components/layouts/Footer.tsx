import Link from 'next/link'
import Logo from '../shared/Logo'

const Footer = () => {
    return (
        <footer className='bg-white'>
            <section className='max-w-6xl mx-auto space-y-4 sm:space-y-2 px-4 sm:px-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-8'>
                <Logo />
                <div>
                    <h2 className='uppercase font-semibold'>Quick Links</h2>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/products">Products</Link></li>
                        <li><Link href="/cateogories">Categories</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className='uppercase font-semibold'>Quick Links</h2>
                    <ul>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/products">Products</Link></li>
                        <li><Link href="/cateogories">Categories</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className='uppercase font-semibold'>Social Media</h2>
                </div>
            </section>
            <section className='bg-primary text-white py-4 text-center'>
                <p>© StyleGen {new Date().getFullYear()} All rights reserved</p>
            </section>
        </footer>
    )
}

export default Footer