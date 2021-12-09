import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import Link from 'next/link'
import React from 'react'

import PropTypes from 'prop-types'

// Unsure about session prop type
// eslint-disable-next-line react/prop-types
function ReposList ({ reposList, session }) {
  // uncomment to see the reposList of the logged user
  // console.log(reposList)

  const router = useRouter()
  if (router.isFallback) return <div>Loading...</div>

  // eslint-disable-next-line no-unused-vars
  const getRepositoryList = (ghLogin) => {
    // eslint-disable-next-line no-undef
    return request('/api/repos_list', {
      body: JSON.stringify({ github_login: ghLogin }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    }).then((RepositoryList) => {
      console.log('User repository list:', ReposList)
    })
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="text-center">🚧</div>
        <div className="text-3xl text-center">Repos-list</div>

        {/* Cards container */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mx-3">
          {reposList.map((repos) => (
            <div
              key={repos.id}
              className="bg-white rounded-xl p-5 shadow-2xl m-2 flex flex-col md:flex-row"
            >
              <a className="text-blue-400" href={repos.clone_url}>
                <div className="mt-5 flex items-center">
                  <img
                    src={repos.owner.avatar_url}
                    className="rounded-full h-12"
                  />
                  <div className="ml-3">
                    <h2 className="font-semibold"> {repos.name} </h2>
                    <p className="text-gray-500"> {repos.description} </p>
                    <p>⭐ {repos.stargazers_count}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </section>

        <Link href="/">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-5 rounded">
            Back home
          </button>
        </Link>
      </div>
    </>
  )
}

export async function getServerSideProps (context) {
  // Get github login
  let login

  const session = await getSession(context)
  if (session.profile) {
    login = session.profile.login
  }

  const res = await fetch('https://api.github.com/users/' + login + '/repos')
  const reposList = await res.json()

  // warning: reposList is 153Kb, we should optimize the list before return it.

  if (!reposList) {
    return {
      notFound: true
    }
  }

  // By returning { props: { reposList } }, the ReposList component
  // will receive `reposList` as a prop at build time
  return {
    props: {
      reposList,
      session
    }
  }
}

ReposList.propTypes = {
  reposList: PropTypes.arrayOf(PropTypes.object)
}

export default ReposList
