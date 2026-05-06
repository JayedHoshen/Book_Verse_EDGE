import Link from "next/link"
import { Search, ShoppingCart } from 'lucide-react';
import Logo from "../shared/Logo"

const Header = () => {
    return (
        <section className="bg-white sticky top-0 z-50 border-b border-gray-200">
            <header className="max-w-6xl mx-auto flex items-center justify-between py-3 ">
                <div className="flex gap-14 items-center">
                    <Logo />
                    <ul className="flex gap-8">
                        <li>
                            <Link className="text-lg uppercase" href="/products">Products</Link>
                        </li>
                        <li>
                            <Link className="text-lg uppercase" href="/categories">Categories</Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-5">
                    <Search size={20} />
                    <p className="bg-orange-200 text-primary h-8 w-8 flex items-center justify-center rounded-full"><ShoppingCart size={20} /></p>
                    <Link className="text-lg uppercase" href="/login">Login </Link>
                </div>
            </header>
        </section>
    )
}

export default Header