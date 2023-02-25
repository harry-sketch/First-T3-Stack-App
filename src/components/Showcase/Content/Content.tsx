import { api } from "(-/)/utils/api";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

// Type
import type { Topic } from "../Showcase";

interface Props {
  selectedTopic: Topic | null;
}

const Content: React.FC<Props> = ({ selectedTopic }) => {
  const [notesData, setNotesData] = useState({
    title: "",
    desc: "",
  });

  const { data } = useSession();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNotesData((prev) => ({ ...prev, [name]: value }));
  };

  const { data: notes, refetch } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: data?.user !== undefined,
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  return (
    <section className="w-full">
      <div>
        {notes?.map(({ title, id }) => (
          <ReactMarkdown key={`note-${id}`}>{title}</ReactMarkdown>
        ))}
      </div>
      <div className="mb-4 w-full rounded-lg border border-slate-700 p-4 transition-all duration-300 ease-in-out">
        <input
          name="title"
          type="text"
          onChange={(e) => handleOnChange(e)}
          value={notesData.title}
          placeholder={`note-${selectedTopic?.topic ?? ""}`}
          className="mb-2 w-full rounded-lg border-none bg-gray-300/25 p-1.5 text-slate-50 focus:outline-none"
        />
        <textarea
          name="desc"
          id=""
          rows={5}
          placeholder={`note-description-${selectedTopic?.topic ?? ""}`}
          className="w-full resize-none rounded-lg border-none bg-gray-300/25 p-1.5 text-slate-50 focus:outline-none"
        />
        <button
          onClick={() =>
            createNote.mutate({
              desc: notesData.desc,
              title: notesData.title,
              topicId: selectedTopic?.id ?? "",
            })
          }
          type="button"
          className="ml-auto flex justify-end rounded-lg bg-primary py-2 px-4 text-base font-medium"
        >
          Save
        </button>
      </div>
    </section>
  );
};

export default React.memo(Content);
