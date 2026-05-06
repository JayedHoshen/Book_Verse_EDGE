import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";


const WebLayout = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <main>
            <Header />
            {children}
            <Footer />
        </main>
    )
}

export default WebLayout