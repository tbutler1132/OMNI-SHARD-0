import { BoardRenderer } from "@/components/renderers/BoardRenderer";
import { loadView } from "@/lib/loadView";
import { loadEntityWithView } from "@/lib/ontology/loadEntityWithView";

const page = async () => {
  const view = await loadView("view-vector-convergences");
  const data = await loadEntityWithView(view);

  return (
    <div className="p-6">
      <h1 className="font-orbitron text-xl text-cyan-400">{view.name}</h1>
      <BoardRenderer view={view} data={data} />
    </div>
  );
};

export default page;
