import type { AppProps } from "next/app";
import '../styles/layout.css'
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({children}: {children: React.ReactNode}){
    //return (<Component {...pageProps}/>)
    return (
    <html lang="en">
        <body>
            <div className="page-wrapper">
                <Header/>
                {children}
                <Footer/>
            </div>
        </body>
    </html>
    
    
    
    )
}