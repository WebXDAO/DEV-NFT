import { useRouter } from "next/router";
import {
    getSession,
    signIn, 
    signOut,
    useSession
  } from 'next-auth/client';
import Link from 'next/link';


function ReposList() {

    const [session] = useSession();

    const getRepositoryList = (github_login) => {
        // github api
        return request("/api/repos_list", {
            body: JSON.stringify({ github_login }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
        }).then((RepositoryList) => {
            console.log("User repository list:", ReposList);
        })
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen w-screen">
                <div>🚧</div>
                <div className="text-3xl">Repos-list here</div>
            <Link href="/">Back home</Link>
            </div>

        </>
    )
}

export default ReposList