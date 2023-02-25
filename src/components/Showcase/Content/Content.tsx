import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";

//Auth
import { api } from "(-/)/utils/api";
import { useSession } from "next-auth/react";

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

  const { data: notes, refetch } = api.note.getAll.useQuery(
    {
      topicId: selectedTopic?.id ?? "",
    },
    {
      enabled: data?.user !== undefined,
      onSuccess: () => {
        void refetch();
      },
    }
  );

  const createNote = api.note.create.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const handleCreateNotes = () => {
    createNote.mutate({
      desc: notesData.desc,
      title: notesData.title,
      topicId: selectedTopic?.id ?? "",
    });

    setNotesData((prev) => ({ ...prev, desc: "", title: "" }));
  };

  return (
    <section className="w-full">
      <div>
        {notes?.map(({ title, id, desc }) => (
          <div key={`note-${id}`} className="flex flex-col items-center">
            <div>{title}</div>
            <ReactMarkdown>{desc}</ReactMarkdown>
          </div>
        ))}
      </div>
      <div className="mb-4 w-full rounded-lg border border-slate-700 p-4 transition-all duration-300 ease-in-out">
        <input
          name="title"
          type="text"
          onChange={(e) =>
            setNotesData((prev) => ({ ...prev, title: e.target.value }))
          }
          value={notesData.title}
          placeholder={`note-${selectedTopic?.topic ?? ""}`}
          className="mb-2 w-full rounded-lg border-none bg-gray-300/25 p-1.5 text-slate-50 focus:outline-none"
        />
        <CodeMirror
          className="mb-4 text-gray-900"
          height="200px"
          value={notesData.desc}
          onChange={(value) =>
            setNotesData((prev) => ({ ...prev, desc: value }))
          }
        />
        <button
          onClick={handleCreateNotes}
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
