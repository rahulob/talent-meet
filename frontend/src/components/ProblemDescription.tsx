import { getDifficultyBadgeClass } from "../lib/utils";
function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}: any) {
  if (!problem) return;
  return (
    <div className="h-full overflow-y-auto bg-base-200">
      {/* HEADER SECTION */}
      <div className="p-6 bg-base-100 border-b border-base-300">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-3xl font-bold text-base-content">
            {problem.title}
          </h1>
          <span
            className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
          >
            {problem.difficulty}
          </span>
        </div>
        <p className="text-base-content/60">{problem.category}</p>

        {/* Problem selector */}
        <div className="mt-4">
          <select
            className="select select-sm w-full"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p: any) => (
              <option key={p.id} value={p.id}>
                {p.title} - {p.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* PROBLEM DESC */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold text-base-content">Description</h2>

          <div className="space-y-3 text-base leading-relaxed">
            <p className="text-base-content/90">{problem.description.text}</p>
            {problem.description.notes.map(({ note, idx }: any) => (
              <p key={idx} className="text-base-content/90">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* EXAMPLES SECTION */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
          <div className="space-y-4">
            {problem.examples.map((example: any, idx: number) => (
              <div
                key={idx}
                className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5"
              >
                <div className="flex gap-2">
                  <span className="text-primary font-bold min-w-[70px]">
                    Input:
                  </span>
                  <span>{example.input}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-secondary font-bold min-w-[70px]">
                    Output:
                  </span>
                  <span>{example.output}</span>
                </div>
                {example.explanation && (
                  <div className="pt-2 border-t border-base-300 mt-2">
                    <span className="text-base-content/60 font-sans">
                      <span className="font-semibold">Explanation:</span>{" "}
                      {example.explanation}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">
            Constraints
          </h2>
          <ul className="space-y-2 text-base-content/90">
            {problem.constraints.map((constraint: string, idx: number) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <code className="text-sm">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;
