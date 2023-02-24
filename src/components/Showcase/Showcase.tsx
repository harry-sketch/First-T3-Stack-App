import { api, type RouterOutputs } from "(-/)/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Components
import Header from "../Header/Header";
import Content from "./Content/Content";
import Topic from "./Topic/Topic";

export type Topic = RouterOutputs["topic"]["getAll"][0];

const Showcase = () => {
  const [topic, setTopic] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<null | Topic>(null);

  const { data } = useSession();

  const {
    data: topics,
    refetch,
    isLoading,
  } = api.topic.getAll.useQuery(undefined, {
    enabled: data?.user !== undefined,
    onSuccess: (data) => {
      void refetch();
      setSelectedTopic(selectedTopic ?? data[0] ?? null);
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
            <Topic topics={topics} setSelectedTopic={setSelectedTopic} />
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
        <Content selectedTopic={selectedTopic} />
      </main>
    </section>
  );
};

export default Showcase;
