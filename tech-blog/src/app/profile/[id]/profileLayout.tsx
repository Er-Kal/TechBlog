"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { submitBioChange } from "./bioChange";
import { useActionState } from "react";

type UserData = {
	id: string;
	username: string;
	avi_url: string;
	created_at: string;
	bio: string;
};

type BioState = {
	error: string | null;
};

export default function ProfileLayout(props: UserData) {
	const supabase = createClient();
	const [user, setUser] = useState<User | null>(null);
	const [bioEditToggle, setBioEditToggle] = useState<boolean>(false);
	const [bioContent, setBioContent] = useState<string>(props.bio);

	const [bioState, bioAction] = useActionState<BioState, FormData>(
		submitBioChange,
		{ error: null }
	);

	useEffect(() => {
		const getUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);
		};
		getUser();
	}, [supabase]);

	useEffect(() => {
		if (bioState && bioState.error === null) {
			setBioEditToggle(false);
		}
	}, [bioState]);

	const editBioButton = () => {
		setBioEditToggle(!bioEditToggle);
		setBioContent(props.bio);
	};

	return (
		<div>
			<p>{props.username}</p>
			<Image
				src={props.avi_url}
				width={196}
				height={196}
				alt="Profile picture"
				unoptimized
			/>
			<p>
				Bio: <br />
				{!bioEditToggle && bioContent}
			</p>
			{user && user.id === props.id && !bioEditToggle && (
				<button onClick={editBioButton}>Edit Bio</button>
			)}
			{user && user.id === props.id && bioEditToggle && (
				<form action={bioAction}>
					<input
						type="text"
						name="bio"
						value={bioContent}
						onChange={(e) => setBioContent(e.target.value)}
					/>
					<button type="submit">Submit Changes</button>
				</form>
			)}
			<p>Created At: {props.created_at}</p>
			{bioState && bioState.error && <p>{bioState.error}</p>}
		</div>
	);
}
