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

    // uncomment to see the reposList of the logged user
    console.log(reposList) 

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
            <div className="flex flex-col">
                <div className="text-center">🚧</div>
                <div className="text-3xl text-center">Repos-list</div>

                {/* Cards container */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-3">
                        {reposList.map((repos) => (
                            <div class="bg-white rounded-xl p-5 shadow-2xl m-2 flex flex-col md:flex-row">
                                {/* <p> Esther creates truly beautiful components, 
                                    you should definitely work with her. The end
                                    results are always worth it. A great find!
                                </p> */}
                                <a className="text-blue-400" href={repos.clone_url} >
                                <div class='mt-5 flex items-center'>
                                    <img src={repos.owner.avatar_url} class='rounded-full h-12'/>
                                    <div class="ml-3">
                                        <h2 class="font-semibold"> {repos.name} </h2>
                                        <p class="text-gray-500"> {repos.description} </p>
                                        <p>⭐ {repos.stargazers_count }</p>
                                    </div>
                                </div>
                                </a>
                            </div>
                        ))}
                </section>
                
                <Link href="/">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-5 rounded">
                        Back home
                    </button>
                </Link>
            </div>

        </>
    )
}


{/* <div className={styles.grid}>
  {pinnedItems.map(item => {
    return (
      <a key={item.id} href={item.url} className={styles.card}>
        <h2>{ item.name }</h2>
        <p>⭐ {item.stargazers.totalCount }</p>
      </a>
    )
  })}
</div> */}

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