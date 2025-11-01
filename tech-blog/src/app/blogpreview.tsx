import Link from "next/link";
import styles from "./blogpreview.module.css";
import BlogContent from "@/components/BlogContent";

type PreviewProps = {
	blogId: number;
	previewContent: string;
	author_id: string;
};

export default function BlogPreview(props: PreviewProps) {
	return (
		<li className={styles.li}>
			<BlogContent blogText={props.previewContent}/>
			<Link href={`/blog/${props.blogId}`}>
				<button>View blog</button>
			</Link>
		</li>
	);
}
