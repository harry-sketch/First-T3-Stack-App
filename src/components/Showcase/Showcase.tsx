import { api } from "(-/)/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Components
import Header from "../Header/Header";
import Content from "./Content/Content";

const Showcase = () => {
  const [topic, setTopic] = useState<string>("");
  const [selectedTopicId, setSelectedTopicId] = useState<null | string>(null);

  const { data } = useSession();

  const {
    data: topics,
    refetch,
    isLoading,
  } = api.topic.getAll.useQuery(undefined, {
    enabled: data?.user !== undefined,
    onSuccess: () => {
      void refetch();
      
    },
  });

  const createTopic = api.topic.create.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  return (
    <section className="px-6 text-slate-50">
      <Header />
      <main className="flex items-center gap-10 border-t border-slate-400/40 pt-4">
        <aside className="w-96 border-r-2 border-slate-200/10 pr-2">
          {isLoading ? (
            "loading"
          ) : (
            <div className="flex flex-col items-start">
              {topics?.map(({ topic, id }) => (
                <button
                  onClick={() => setSelectedTopicId(id)}
                  type="button"
                  key={`topic-${id}`}
                  className="mb-2 w-full rounded-lg py-2 transition-all duration-200 ease-out last:mb-0 hover:bg-gray-300/25"
                >
                  {topic}
                </button>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center gap-4">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              type="text"
              className="rounded-lg p-2 text-base font-medium text-slate-700 outline-none focus:outline-none"
              placeholder="add notes..."
            />
            <button
              type="button"
              className="rounded-lg bg-primary px-4 py-2"
              onClick={() => {
                createTopic.mutate({ topic });
                setTopic("");
              }}
            >
              Add
            </button>
          </div>
        </aside>
        <Content selectedTopicId={selectedTopicId} />
      </main>
    </section>
  );
};

export default Showcase;
