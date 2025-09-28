import type { AppProps } from "next/app";
import '../styles/layout.css'
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function App({Component,pageProps}:AppProps){
    //return (<Component {...pageProps}/>)
    return (<div className="page-wrapper">
        <Header/>
        <Component {...pageProps}/>
        <Footer/>
    </div>)
}