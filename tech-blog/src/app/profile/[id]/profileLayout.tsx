"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import Image from "next/image";
import { submitBioChange } from "./bioChange";
import { useActionState } from "react";
import { uploadProfilePicture } from './uploadProfilePicture'
import styles from './profile.module.css'

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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) =>{
        const file = event.target.files?.[0];
		console.log(file);
		if (!file) return;
		try{
			uploadProfilePicture(file);
			console.log("tried");
		}
		catch (error){
			const errorMessage = error as Error
			console.error(errorMessage.message);
		}
    }
    const uploading = false;
	return (
		<div className={styles.profileLayout}>
			<p>{props.username}</p>
			<Image
				src={props.avi_url}
				width={196}
				height={196}
				alt="Profile picture"
				unoptimized
			/>
			{user && user.id === props.id && (
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					disabled={uploading}
				/>
			)}
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
