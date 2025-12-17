import { type FC } from "react"
import { useGetInfo } from "../lib/apiRequests"
import { useNavigate } from "react-router-dom"

const Groups: FC = () => {
  const { data, isPending, isError, error } = useGetInfo("/api/v1/groups")
  const navigate = useNavigate()

  const groups = data?.groups ?? []

  if (isPending) {
    return (
      <main>
        <p>Loading groups...</p>
      </main>
    )
  }

  if (isError) {
    return (
      <main>
        <p>Error loading groups: {String(error)}</p>
      </main>
    )
  }

  return (
    <main>
      <header className="hero">
        <h3>Anime Groups — Believe it! (だってばよ〜)</h3>
        <p>Gather your crew — Kaizoku Oni ....Orewaa Naru!!! 🏴‍☠️</p>
        {data?.message && <p className="api-message">{data.message}</p>}
      </header>

      {groups.length === 0 ? (
        <p>No groups found</p>
      ) : (
        <section className="gap-4 flex flex-row flex-wrap justify-center align-center">

          {groups.map((group: any) => (
            <article key={group._id} className="group-card flex flex-col justify-center align-center gap-2" onClick={() => navigate(`/groups/${group._id}`)}>
              <figure>
                <img src={group.image} alt={group.name} />
                <figcaption>
                  <h3>{group.name}</h3>
                  <p>{group.description}</p>
                </figcaption>
              </figure>

            </article>
          ))}


        </section>
      )}
    </main>
  )
}

export default Groups
