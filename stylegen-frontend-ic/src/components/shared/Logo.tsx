import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href="/">
            <Image className='w-40' src="/logo.png" width={200}
                height={80} alt="logo" />
        </Link>
    )
}

export default Logo