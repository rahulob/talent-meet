import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../data/problems";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import CodeEditor from "../components/CodeEditor";
import CodeOutput from "../components/CodeOutput";
import { executeCode } from "../lib/piston";
import toast from "react-hot-toast";

export default function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problemId, setProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(PROBLEMS[problemId].starterCode.javascript);
  const [output, setOutput] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentProblem = PROBLEMS[problemId];

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);

    // check if code executed successfully and matches expected output
    const checkIfTestsPassed = (
      actualOutput: string,
      expectedOutput: string
    ) => {
      const normalizedActual = normalizeOutput(actualOutput);
      const normalizedExpected = normalizeOutput(expectedOutput);

      return normalizedActual == normalizedExpected;
    };
    if (result.success) {
      const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
      const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

      if (testsPassed) {
        // triggerConfetti();
        toast.success("All tests passed! Great job!");
      } else {
        toast.error("Tests failed. Check your output!");
      }
    } else {
      toast.error("Code execution failed!");
    }
  };

  // update problem when URL param changes
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(currentProblem.starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId: string) =>
    navigate(`/problem/${newProblemId}`);

  //   const triggerConfetti = () => {
  //     confetti({
  //       particleCount: 80,
  //       spread: 250,
  //       origin: { x: 0.2, y: 0.6 },
  //     });

  //     confetti({
  //       particleCount: 80,
  //       spread: 250,
  //       origin: { x: 0.8, y: 0.6 },
  //     });
  //   };

  const normalizeOutput = (output: string) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line) => line.length > 0)
      .join("\n");
  };
  return (
    <div className="h-screen w-screen bg-base-100 flex flex-col">
      <Navbar />
      <PanelGroup direction="horizontal">
        {/* Left Panel - Problem description */}
        <Panel defaultSize={40} minSize={30}>
          <ProblemDescription
            problem={currentProblem}
            currentProblemId={problemId}
            onProblemChange={handleProblemChange}
            allProblems={Object.values(PROBLEMS)}
          />
        </Panel>

        {/* Resize hanle */}
        <PanelResizeHandle className="w-2 flex items-center justify-center bg-base-300">
          <div className="w-1 h-8 bg-white/50 rounded-xl hover:bg-primary transition-colors" />
        </PanelResizeHandle>
        {/* Right Panel - code editor and output */}
        <Panel defaultSize={60} minSize={30}>
          <PanelGroup direction="vertical">
            {/* Top Panel - Code Editor */}
            <Panel defaultSize={70} minSize={30}>
              <CodeEditor
                selectedLanguage={selectedLanguage}
                code={code}
                isRunning={isRunning}
                onLanguageChange={handleLanguageChange}
                onCodeChange={setCode}
                onRunCode={handleRunCode}
              />
            </Panel>

            {/* Resize hanle */}
            <PanelResizeHandle className="h-2 flex items-center justify-center bg-base-300">
              <div className="w-8 h-1 bg-white/50 rounded-xl hover:bg-primary transition-colors" />
            </PanelResizeHandle>

            {/* Bottom Panel - Code Output */}
            <Panel defaultSize={30} minSize={30}>
              <CodeOutput output={output} />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}
