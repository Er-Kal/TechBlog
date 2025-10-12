import "./layout.css";
import Header from "@/app/header";
import Footer from "@/app/footer";

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	//return (<Component {...pageProps}/>)
	return (
		<html lang="en">
			<body>
				<div className="page-wrapper">
					<Header />
					{children}
					<Footer />
				</div>
			</body>
		</html>
	);
}
