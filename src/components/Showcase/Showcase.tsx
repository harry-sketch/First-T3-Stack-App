import { useState } from "react";

// Components
import Header from "../Header/Header";

const Showcase = () => {
  const [topic, setTopic] = useState<string>("");
  return (
    <section className="px-6 text-slate-50">
      <Header />
      <main className="flex items-center gap-10 border-t border-slate-400/40 pt-4">
        <aside className="w-96 border-r-2 border-slate-200/10 ">
          <div>array of notes</div>
          <div className="mt-3 flex items-center gap-4">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              type="text"
              className="rounded-lg p-2 text-base font-medium text-slate-700 outline-none focus:outline-none"
              placeholder="add notes..."
            />
            <button type="button" className="rounded-lg bg-primary px-4 py-2">
              Add
            </button>
          </div>
        </aside>
        <section>notes desc</section>
      </main>
    </section>
  );
};

export default Showcase;
