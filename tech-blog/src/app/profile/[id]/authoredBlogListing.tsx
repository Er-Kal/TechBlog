import Link from "next/link";
import styles from "./profile.module.css";

type BlogListing = {
	key: number;
	created_at: string;
	title: string;
	id: number;
};

export default function BlogListing(props: BlogListing) {
	const createdDate = new Date(props.created_at);
	const displayDate = createdDate.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	return (
		<li className={styles.blogListingListItem}>
			<Link href={"/blog/" + props.id} className={styles.blogListing}>
				<p>{props.title}</p>
				<p>{displayDate}</p>
			</Link>
		</li>
	);
}
