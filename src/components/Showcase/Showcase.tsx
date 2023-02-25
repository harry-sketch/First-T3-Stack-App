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
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  const onSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setIsOpen(true);
  };

  return (
    <section className="px-6 text-slate-50">
      <Header />
      <main className="flex items-center gap-10 border-t border-slate-400/40 pt-4">
        <aside className="w-96 border-r-2 border-slate-200/10 pr-2">
          {isLoading ? (
            "loading"
          ) : (
            <Topic topics={topics} onSelect={onSelect} />
          )}

          <CreateTopic onClick={(topic) => createTopic.mutate({ topic })} />
        </aside>

        {isOpen ? <Content selectedTopic={selectedTopic} /> : null}
      </main>
    </section>
  );
};

export default Showcase;
