import { useState, type FC } from "react"
import { useGetInfo } from "../lib/apiRequests"
import { useNavigate } from "react-router-dom"
import type { Member } from "./group"
import { animePhrases } from "../components/exports"
import { PlusIcon, XIcon } from "lucide-react"
import Editor from "../components/editor"
import PageSkeleton from "../components/ui/PageSkeleton"

interface GroupItem {
  _id: number
  image: string
  name: string
  description: string
  members: Member[]
}

const Groups: FC = () => {
  const { data, isPending, isError, error } = useGetInfo("/api/v1/groups")
  const navigate = useNavigate()

  const groups = data?.groups ?? []

  const [randomPhrases] = useState(() => {
    const rand = Math.floor(Math.random() * animePhrases.iconic.length)
    return animePhrases.iconic[rand]
  })

  const [showEditor, setShowEditor] = useState(false)

  if (isPending) {
    return (
      <PageSkeleton title="Groups loadding" count={8} />
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
    <>
      <main>
        <header className="hero">
          <h3>Anime Groups — Believe it! (だってばよ〜)</h3>
          <h3>{randomPhrases.phrase}</h3>
          {data?.message && <p className="api-message">{data.message}</p>}
        </header>

        {groups.length === 0 ? (
          <p className="text-center text-gray-700 text-lg">No groups found</p>
        ) : (
            <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {groups.map((group: GroupItem) => (
              <article
                key={group._id}
                onClick={() => navigate(`/groups/${group._id}`)}
                className="cursor-pointer bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform"
              >
                <img
                  className="w-full h-40 object-cover"
                  src={group.image}
                  alt={group.name}
                />

                <div className="p-4 space-y-2">
                  <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
                  <p className="text-sm text-gray-600">{group.description}</p>

                  {group.members && group.members.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">
                        Members ({group.members.length}):
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {group.members.slice(0, 4).map((member: Member) => (
                          <span
                            key={member.id}
                            className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded"
                          >
                            {member.user}
                          </span>
                        ))}
                        {group.members.length > 4 && (
                          <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                            +{group.members.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      {/* PLUS BTN */}
      <div
        onClick={() => setShowEditor(true)}
        className="fixed right-5 bottom-5 w-12 h-12 flex items-center justify-center shadow-lg cursor-pointer hover:bottom-6 smooth"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderRadius: "50%"
        }}
      >
        <PlusIcon size={24} className="text-white" />
      </div>

      {/* MODAL */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            {/* Close Button */}
            <button
              onClick={() => setShowEditor(false)}
              className="absolute right-4 top-4 text-gray-600 hover:text-gray-900"
            >
              <XIcon size={24} />
            </button>

            {/* Editor Form */}
            <Editor />
          </div>
        </div>
      )}
    </>
  )
}

export default Groups
