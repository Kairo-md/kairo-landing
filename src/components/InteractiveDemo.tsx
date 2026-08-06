import React, { useState, useEffect, useRef, useTransition } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import * as d3 from "d3";
import catClimbImg from "../assets/cat-climb.png";
import { KairoButton } from "./ui/KairoButton";
import {
  Bold,
  Italic,
  Code,
  Heading1,
  Heading2,
  List,
  Quote,
  Undo,
  Redo,
  Plus,
  RotateCcw,
} from "lucide-react";

// D3 Node & Link Interfaces
interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  category: "core" | "feature" | "user";
  linkCount: number;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

const INITIAL_NODES: Omit<GraphNode, "x" | "y" | "vx" | "vy">[] = [
  { id: "kairo", label: "Kairo App", category: "core", linkCount: 4 },
  { id: "tiptap", label: "Tiptap Editor", category: "feature", linkCount: 2 },
  {
    id: "graph",
    label: "D3 Knowledge Graph",
    category: "feature",
    linkCount: 2,
  },
  { id: "tauri", label: "Tauri + Rust", category: "feature", linkCount: 1 },
  { id: "local", label: "Local SQLite", category: "feature", linkCount: 1 },
];

const INITIAL_LINKS: { source: string; target: string }[] = [
  { source: "kairo", target: "tiptap" },
  { source: "kairo", target: "graph" },
  { source: "kairo", target: "tauri" },
  { source: "kairo", target: "local" },
  { source: "tiptap", target: "graph" },
];

const INITIAL_CONTENT = `<h1>Welcome to Kairo Demo</h1>
<p>Kairo helps you organize ideas into an interconnected <strong>knowledge graph</strong>.</p>
<ul>
  <li><code>Tiptap Editor</code> powers rich-text note creation</li>
  <li><code>D3 Knowledge Graph</code> visualizes real-time links</li>
  <li><code>100% Offline</code> storage keeps your data private</li>
</ul>
<blockquote>Type or add new notes below to see the interactive D3 force graph update live!</blockquote>`;

interface InteractiveDemoProps {
  theme: "dark" | "light";
  accentColor?: string;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  theme,
  accentColor = "#3b82f6",
}) => {
  const [nodes, setNodes] = useState<GraphNode[]>(
    INITIAL_NODES.map((n) => ({ ...n })),
  );
  const [links, setLinks] = useState<GraphLink[]>(
    INITIAL_LINKS.map((l) => ({ ...l })),
  );
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("kairo");
  const [newNodeName, setNewNodeName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"split" | "editor" | "graph">(
    "split",
  );

  const svgRef = useRef<SVGSVGElement | null>(null);
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(
    null,
  );
  const [, startTransition] = useTransition();
  const [, setEditorTick] = useState<number>(0);

  // Tiptap Editor Initialization
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write notes here... Type or link your ideas!",
      }),
    ],
    content: INITIAL_CONTENT,
    onTransaction: () => {
      // Force React state re-render on every editor transaction so editor.isActive() updates instantly for ALL buttons
      setEditorTick((t) => t + 1);
    },
    onUpdate: ({ editor }) => {
      // Analyze text for [[WikiLinks]] or new node references
      const text = editor.getText();
      const wikiMatches = Array.from(text.matchAll(/\[\[(.*?)\]\]/g)).map((m) =>
        m[1].trim(),
      );

      if (wikiMatches.length > 0) {
        wikiMatches.forEach((name) => {
          if (!name) return;
          const id = name.toLowerCase().replace(/\s+/g, "-");
          setNodes((prevNodes) => {
            if (prevNodes.some((n) => n.id === id)) return prevNodes;
            const newNode: GraphNode = {
              id,
              label: name,
              category: "user",
              linkCount: 1,
            };
            setLinks((prevLinks) => [
              ...prevLinks,
              { source: "kairo", target: id },
            ]);
            return [...prevNodes, newNode];
          });
        });
      }
    },
  });

  // D3 Force Simulation Setup
  useEffect(() => {
    if (!svgRef.current) return;
    const svgEl = svgRef.current;
    const rect = svgEl.getBoundingClientRect();
    const width = rect.width || 600;
    const height = rect.height || 360;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    // Enable Pan & Zoom
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Prepare deep clones of nodes and links for simulation
    const simNodes: GraphNode[] = nodes.map((n) => ({ ...n }));
    const simLinks: GraphLink[] = links.map((l) => ({
      source: typeof l.source === "object" ? l.source.id : l.source,
      target: typeof l.target === "object" ? l.target.id : l.target,
    }));

    // Create D3 Force Simulation
    const simulation = d3
      .forceSimulation<GraphNode>(simNodes)
      .force(
        "link",
        d3
          .forceLink<GraphNode, GraphLink>(simLinks)
          .id((d) => d.id)
          .distance(90)
          .strength(0.6),
      )
      .force("charge", d3.forceManyBody().strength(-240))
      .force("center", d3.forceCenter(width / 2, height / 2).strength(0.15))
      .force("collision", d3.forceCollide<GraphNode>().radius(28));

    simulationRef.current = simulation;

    // Render Links
    const linkGroup = g
      .append("g")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(simLinks)
      .join("line")
      .attr(
        "stroke",
        theme === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)",
      )
      .attr("stroke-width", 1.8)
      .attr("stroke-dasharray", (d) =>
        (typeof d.source === "object" ? d.source.id : d.source) ===
          selectedNodeId ||
        (typeof d.target === "object" ? d.target.id : d.target) ===
          selectedNodeId
          ? "none"
          : "none",
      );

    // Render Nodes Group
    const nodeGroup = g
      .append("g")
      .selectAll<SVGGElement, GraphNode>("g")
      .data(simNodes)
      .join("g")
      .style("cursor", "grab")
      .on("click", (event, d) => {
        event.stopPropagation();
        setSelectedNodeId(d.id);
      });

    // Node Circles
    nodeGroup
      .append("circle")
      .attr("r", (d) =>
        d.category === "core" ? 14 : d.category === "feature" ? 10 : 8,
      )
      .attr("fill", () => {
        return (
          getComputedStyle(document.documentElement)
            .getPropertyValue("--accent")
            .trim() || "#3b82f6"
        );
      })
      .attr("stroke", (d) =>
        d.id === selectedNodeId ? "#ffffff" : "transparent",
      )
      .attr("stroke-width", 2.5)
      .attr("class", "transition-all duration-200");

    // Node Outer Glow Ring for Selected / Core
    nodeGroup
      .filter((d) => d.id === selectedNodeId || d.category === "core")
      .append("circle")
      .attr("r", (d) => (d.category === "core" ? 20 : 15))
      .attr("fill", "none")
      .attr(
        "stroke",
        () =>
          getComputedStyle(document.documentElement)
            .getPropertyValue("--accent")
            .trim() || "#3b82f6",
      )
      .attr("stroke-width", 1.5)
      .attr("stroke-opacity", 0.4)
      .attr("class", "animate-pulse");

    // Node Labels
    nodeGroup
      .append("text")
      .text((d) => d.label)
      .attr("x", 0)
      .attr("y", (d) => (d.category === "core" ? 26 : 22))
      .attr("text-anchor", "middle")
      .attr("fill", theme === "dark" ? "#e6e6e6" : "#1a1a2e")
      .attr("font-size", "11px")
      .attr("font-weight", (d) => (d.id === selectedNodeId ? "700" : "500"))
      .attr("pointer-events", "none");

    // Drag Behavior
    const drag = d3
      .drag<SVGGElement, GraphNode>()
      .on("start", (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeGroup.call(drag);

    // Simulation Tick Updates
    simulation.on("tick", () => {
      linkGroup
        .attr("x1", (d) => (d.source as GraphNode).x ?? 0)
        .attr("y1", (d) => (d.source as GraphNode).y ?? 0)
        .attr("x2", (d) => (d.target as GraphNode).x ?? 0)
        .attr("y2", (d) => (d.target as GraphNode).y ?? 0);

      nodeGroup.attr("transform", (d) => `translate(${d.x ?? 0},${d.y ?? 0})`);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, links, selectedNodeId, theme, accentColor]);

  // Add Custom Node & Sync with Editor
  const handleAddNode = () => {
    if (!newNodeName.trim()) return;
    const label = newNodeName.trim();
    const id = label.toLowerCase().replace(/\s+/g, "-");

    if (nodes.some((n) => n.id === id)) {
      setSelectedNodeId(id);
      setNewNodeName("");
      return;
    }

    const newNode: GraphNode = {
      id,
      label,
      category: "user",
      linkCount: 1,
    };

    startTransition(() => {
      setNodes((prev) => [...prev, newNode]);
      setLinks((prev) => [...prev, { source: "kairo", target: id }]);
      setSelectedNodeId(id);
    });

    if (editor) {
      editor.commands.insertContent(
        ` <p>Linked idea: <code>[[${label}]]</code></p>`,
      );
    }

    setNewNodeName("");
  };

  // Reset Graph to Initial State
  const handleResetGraph = () => {
    setNodes(INITIAL_NODES.map((n) => ({ ...n })));
    setLinks(INITIAL_LINKS.map((l) => ({ ...l })));
    setSelectedNodeId("kairo");
    if (editor) {
      editor.commands.setContent(INITIAL_CONTENT);
    }
  };

  return (
    <section
      id="demo"
      className="py-16 bg-(--sidebar-bg) border-b border-(--border) shadow-none"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mx-auto mb-6">
          <h2 className="text-6xl  font-light text-(--text-primary) tracking-tight">
            Try Kairo Directly On This Page
          </h2>
        </div>

        {/* Interactive Workspace Window Wrapper */}
        <div className="relative pt-22">
          {/* Climbing Cat Mascot Image */}
          <img
            src={catClimbImg}
            alt="Cat Climbing Board"
            className="absolute top-0 left-6 z-30 h-28 w-auto object-contain pointer-events-none transition-transform hover:scale-105"
          />

          <div className="bg-(--bg) rounded-2xl border border-(--border-strong) shadow-none overflow-hidden relative z-10">
            {/* Mock Window Titlebar */}
            <div className="bg-(--sidebar-bg) text-(--text-primary) px-4 py-3 flex flex-wrap items-center justify-between gap-4 border-b border-(--border)">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-rose-500 inline-block" />
                <span className="w-4 h-4 rounded-full bg-amber-500 inline-block" />
                <span className="w-4 h-4 rounded-full bg-emerald-500 inline-block" />
                <span className="ml-3 text-lg tracking-wide text-(--text-secondary)">
                  Kairo Workspace Demo v0.6.1
                </span>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 bg-(--hover) p-1 rounded-md text-sm">
                <button
                  onClick={() => setActiveTab("split")}
                  className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                    activeTab === "split"
                      ? "bg-accent text-white font-semibold shadow-xs"
                      : "text-(--text-secondary) hover:text-(--text-primary)"
                  }`}
                >
                  Split View
                </button>
                <button
                  onClick={() => setActiveTab("editor")}
                  className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                    activeTab === "editor"
                      ? "bg-accent text-white font-semibold shadow-xs"
                      : "text-(--text-secondary) hover:text-(--text-primary)"
                  }`}
                >
                  Tiptap Editor
                </button>
                <button
                  onClick={() => setActiveTab("graph")}
                  className={`px-3 py-1.5 rounded-sm transition-all cursor-pointer ${
                    activeTab === "graph"
                      ? "bg-accent text-white font-semibold shadow-xs"
                      : "text-(--text-secondary) hover:text-(--text-primary)"
                  }`}
                >
                  D3 Graph View
                </button>
              </div>
            </div>

            {/* Main Content Pane Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-125 divide-y lg:divide-y-0 lg:divide-x divide-(--border)">
              {/* Left Pane: Tiptap Editor */}
              {(activeTab === "split" || activeTab === "editor") && (
                <div
                  className={`${
                    activeTab === "split" ? "lg:col-span-6" : "lg:col-span-12"
                  } p-6 flex flex-col bg-(--bg)`}
                >
                  {/* Tiptap Formatting Toolbar */}
                  {editor && (
                    <div className="flex flex-wrap items-center justify-between gap-1 pb-3 mb-4 border-b border-(--border) text-sm text-(--text-secondary)">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().toggleBold().run()
                          }
                          className={`p-2 rounded-md transition-all cursor-pointer ${
                            editor.isActive("bold")
                              ? "bg-(--active) text-(--text-primary) font-bold shadow-xs"
                              : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--hover)"
                          }`}
                          title="Bold (Ctrl+B)"
                        >
                          <Bold className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                          }
                          className={`p-2 rounded-md transition-all cursor-pointer ${
                            editor.isActive("italic")
                              ? "bg-(--active) text-(--text-primary) font-bold shadow-xs"
                              : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--hover)"
                          }`}
                          title="Italic (Ctrl+I)"
                        >
                          <Italic className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().toggleCode().run()
                          }
                          className={`p-2 rounded-md transition-all cursor-pointer ${
                            editor.isActive("code")
                              ? "bg-(--active) text-(--text-primary) font-bold shadow-xs"
                              : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--hover)"
                          }`}
                          title="Inline Code"
                        >
                          <Code className="w-4 h-4" />
                        </button>

                        <div className="h-4 w-px bg-(--border) mx-1" />

                        <button
                          type="button"
                          onClick={() =>
                            editor
                              .chain()
                              .focus()
                              .toggleHeading({ level: 1 })
                              .run()
                          }
                          className={`p-2 rounded-md transition-all cursor-pointer ${
                            editor.isActive("heading", { level: 1 })
                              ? "bg-(--active) text-(--text-primary) font-bold shadow-xs"
                              : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--hover)"
                          }`}
                          title="Heading 1"
                        >
                          <Heading1 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor
                              .chain()
                              .focus()
                              .toggleHeading({ level: 2 })
                              .run()
                          }
                          className={`p-2 rounded-md transition-all cursor-pointer ${
                            editor.isActive("heading", { level: 2 })
                              ? "bg-(--active) text-(--text-primary) font-bold shadow-xs"
                              : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--hover)"
                          }`}
                          title="Heading 2"
                        >
                          <Heading2 className="w-4 h-4" />
                        </button>

                        <div className="h-4 w-px bg-(--border) mx-1" />

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().toggleBulletList().run()
                          }
                          className={`p-2 rounded-md transition-all cursor-pointer ${
                            editor.isActive("bulletList")
                              ? "bg-(--active) text-(--text-primary) font-bold shadow-xs"
                              : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--hover)"
                          }`}
                          title="Bullet List"
                        >
                          <List className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editor.chain().focus().toggleBlockquote().run()
                          }
                          className={`p-2 rounded-md transition-all cursor-pointer ${
                            editor.isActive("blockquote")
                              ? "bg-(--active) text-(--text-primary) font-bold shadow-xs"
                              : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--hover)"
                          }`}
                          title="Blockquote"
                        >
                          <Quote className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => editor.chain().focus().undo().run()}
                          disabled={!editor.can().undo()}
                          className="p-1.5 rounded hover:bg-(--hover) disabled:opacity-40 transition-colors"
                          title="Undo"
                        >
                          <Undo className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => editor.chain().focus().redo().run()}
                          disabled={!editor.can().redo()}
                          className="p-1.5 rounded hover:bg-(--hover) disabled:opacity-40 transition-colors"
                          title="Redo"
                        >
                          <Redo className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Editor Container */}
                  <div className="flex-1 min-h-75 bg-(--sidebar-bg) border border-(--border-strong) rounded-lg p-4 focus-within:border-accent transition-colors">
                    <EditorContent editor={editor} />
                  </div>

                  {/* Status Bar */}
                  <div className="mt-3 flex items-center justify-between text-xs text-(--text-secondary) font-medium">
                    <span className="flex items-center gap-1.5">
                      {editor?.getText().length || 0} characters
                    </span>
                  </div>
                </div>
              )}

              {/* Right Pane: Interactive D3 Knowledge Graph Visualizer */}
              {(activeTab === "split" || activeTab === "graph") && (
                <div
                  className={`${
                    activeTab === "split" ? "lg:col-span-6" : "lg:col-span-12"
                  } p-6 bg-(--sidebar-bg) flex flex-col justify-between`}
                >
                  {/* Graph Top Controls Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-(--border)">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-(--text-primary)">
                        D3 Force Graph
                      </span>
                      <span className="text-xs text-accent px-2 py-0.5 font-medium">
                        {nodes.length} nodes - {links.length} links
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleResetGraph}
                        className="flex items-center gap-1 text-xs text-(--text-secondary) hover:text-(--text-primary) font-medium transition-colors cursor-pointer px-2 py-1 rounded hover:bg-(--hover)"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                      </button>
                    </div>
                  </div>

                  {/* SVG Canvas for D3 Simulation */}
                  <div className="relative my-4 w-full h-80 bg-(--bg) border border-(--border) rounded-lg overflow-hidden shadow-none">
                    <svg ref={svgRef} className="w-full h-full" />

                    {/* Zoom instruction overlay badge */}
                    <div className="absolute bottom-3 right-3 bg-(--sidebar-bg)/80 backdrop-blur border border-(--border) px-2.5 py-1 rounded text-[11px] text-(--text-secondary) pointer-events-none">
                      Drag nodes • Scroll to Zoom
                    </div>
                  </div>

                  {/* Add Connected Node Bar */}
                  <div className="pt-2">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddNode();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={newNodeName}
                        onChange={(e) => setNewNodeName(e.target.value)}
                        placeholder="Add linked note (e.g. System Design)..."
                        className="flex-1 px-3 py-2 text-sm bg-(--bg) text-(--text-primary) border border-(--border-strong) rounded-lg focus:border-accent focus:outline-none transition-colors"
                      />
                      <KairoButton
                        type="submit"
                        className="flex items-center font-normal gap-1.5 px-4 py-2 text-sm bg-accent hover:bg-accent/90 text-white rounded-md transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Add Note
                      </KairoButton>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
