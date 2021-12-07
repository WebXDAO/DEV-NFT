import * as React from "react";

function ReposList({ reposList, githubUsername }) {

    // Uncomment to debug :
    console.log("ReposList username =>", githubUsername)

    // Show the repos informations
    async function selectRepo(repos) {
        console.log("clicked repos =>", repos)
    }

    return (
        <>
            <div className="flex flex-col overflow-auto">
                <h2 className="text-2xl font-semibold text-center mt-4">Select your repos</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 m-10">
                    {reposList.map((repos, i) => (
                        <div
                            onClick={() => selectRepo(repos)}
                            key={i}
                            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                        >
                            <div className="flex-shrink-0">
                                <img className="h-10 w-10 rounded-full" src={repos.owner.avatar_url} alt="" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <a href="#" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true" />
                                    <p className="text-sm font-medium text-gray-900">{repos.full_name}</p>
                                    <p className="text-sm text-gray-500 truncate">{repos.description}</p>
                                </a>
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                                Preview
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )

};

export default ReposList;