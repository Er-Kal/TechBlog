"use client";

import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import BlogContent from "@/components/BlogContent";
import { retrieveUserRole } from "@/services/getUserRole";
import { acceptSubmission, rejectSubmission } from "./actions";

type submissionDataType = {
	id: number;
	created_at: string;
	blogtitle: string;
	blogpreview: string;
	blogcontent: string;
	author: string;
	status: string;
	last_checked_by: string;
};

export default function SubmissionPage() {
	const params = useParams();
	const router = useRouter();
	const id = params.id as string;
	const supabase = createClient();
	const [submissionData, setSubmissionData] =
		useState<submissionDataType | null>(null);
	const [displayDate, setDisplayDate] = useState<string>("");
	const [isoDate, setIsoDate] = useState<string>("");
	const [userRole, setUserRole] = useState<string | null>(null);
	useEffect(() => {
		const getSubmission = async () => {
			const { data, error } = await supabase
				.from("blogsubmissions")
				.select("*")
				.eq("id", id)
				.single();
			setSubmissionData(data as submissionDataType);
			if (data) {
				const createdDate = new Date(data.created_at);

				setDisplayDate(
					createdDate.toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}),
				);
				setIsoDate(createdDate.toISOString());
			}
			if (!data) {
				router.push("/");
			}
		};
		getSubmission();
	}, [supabase]);

	useEffect(() => {
		const getUserRole = async () => {
			const data = await retrieveUserRole();
			setUserRole(data);
		};
		getUserRole();
	}, []);

	const reject = async () => {
		await rejectSubmission(id);
		router.push("/submitted-blogs");
	};

	const accept = async () => {
		await acceptSubmission(id);
		router.push("/");
	}

	return (
		<main>
			{submissionData && (
				<>
					<div>
						{userRole === "admin" ? (
							<>
								<h2>Admin Panel</h2>
								<button onClick={reject}>Reject</button>
								<button onClick={accept}>Accept</button>
								<p>If admin, button to approve,deny,create comment</p>
							</>
						) : (
							<></>
						)}
					</div>
					<h1>{submissionData.blogtitle}</h1>

					<p>
						Posted: <time dateTime={isoDate}>{displayDate}</time>
					</p>
					<p>Status: {submissionData.status}</p>
					<h2>Blog Preview</h2>
					<BlogContent blogText={submissionData.blogpreview} />
					<h2>Blog Content</h2>
					<BlogContent blogText={submissionData.blogcontent} />
				</>
			)}
		</main>
	);
}
