import { useRouter } from "next/router";
import {
    getSession,
    signIn, 
    signOut,
    useSession
  } from 'next-auth/client';
import Link from 'next/link';
import { checkProperties } from "@ethersproject/properties";



function ReposList({ reposList }) {

    const router = useRouter();
    if (router.isFallback)  return <div>Loading...</div>;

    const [session] = useSession();
    console.log("session reposList component", session)

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
            <div className="flex flex-col justify-center items-center ">
                <div>🚧</div>
                <div className="text-3xl">Repos-list</div>

                <ul className="text-center">
                    {reposList.map((repos) => (
                        <li key={repos.id}>{repos.name} - <a className="text-blue-400" href={repos.clone_url} >{repos.clone_url}</a></li>
                    ))}
                </ul>
                <Link href="/">Back home</Link>
            </div>

        </>
    )
}


export async function getServerSideProps(context) {
    // const login = context.params.github_login
    
    // get github login
    const session = await getSession(context)
    const login = session.profile.login;

    const res = await fetch('https://api.github.com/users/'+ login + '/repos');
    const reposList = await res.json();

    // warning: reposList is 153Kb, we should optimize the list before return it.

    if (!reposList) {
        return {
            notFound: true,
        }
    }

    // By returning { props: { reposList } }, the ReposList component
    // will receive `reposList` as a prop at build time
    return {
        props: {
            reposList
        },
    }
}

export default ReposList;