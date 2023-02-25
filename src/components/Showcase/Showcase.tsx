import { api, type RouterOutputs } from "(-/)/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

// Components
import Header from "../Header/Header";
import Content from "./Content/Content";
import CreateTopic from "./CreateTopic/CreateTopic";
import Topic from "./Topic/Topic";

export type Topic = RouterOutputs["topic"]["getAll"][0];

const Showcase = () => {
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

  // Funs
  const onSelect = (topic: Topic) => setSelectedTopic(topic);

  return (
    <section className="px-6 text-slate-50">
      <Header />
      <main className="flex items-start gap-10 border-t border-slate-400/40 pt-4">
        <aside className="w-96 border-r-2 border-slate-200/10 pr-2">
          {!topics?.length ? (
            <div className="text-xl font-semibold">
              please add topic to create notes
            </div>
          ) : (
            <Topic
              topics={topics}
              onSelect={onSelect}
              selectedTopic={selectedTopic}
            />
          )}

          <CreateTopic
            onClick={(topic) => createTopic.mutate({ topic })}
            isLoading={isLoading}
          />
        </aside>

        {selectedTopic ? (
          <Content selectedTopic={selectedTopic} />
        ) : (
          <div className="text-2xl font-semibold">do try;</div>
        )}
      </main>
    </section>
  );
};

export default Showcase;
