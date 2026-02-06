"use client";

import { createClient } from "@/utils/supabase/client";
import { getLatestSubmissions } from "./actions";
import { BlogSubmissionType } from "@/types/blogsubmission";
import { useEffect, useState } from "react";
import BlogListing from "../profile/[id]/blogListing";

export default function SubmissionsList() {
	const supabase = createClient();
	const [submissions, setSubmissions] = useState<BlogSubmissionType[] | null>();

	useEffect(() => {
		const getSubmissionsData = async () => {
			const data = await getLatestSubmissions();
			setSubmissions(data);
		};
		getSubmissionsData();
	}, []);

	return (
		<>
			<h1>Latest blog submissions</h1>
			{submissions?.reverse().map((blogData) => (
				<BlogListing
					key={blogData.id}
					created_at={blogData.created_at}
					title={blogData.blogtitle}
					id={blogData.id}
					submission={true}
				/>
			))}
		</>
	);
}
