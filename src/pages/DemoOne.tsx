import React, { useState, useEffect, useCallback } from "react";
import DataGridHero from "@/components/ui/data-grid-hero";

interface CfgState {
  rows: number;
  cols: number;
  spacing: number;
  duration: number;
  color: string;
  animationType: "pulse" | "wave" | "random";
  pulseEffect: boolean;
  mouseGlow: boolean;
  opacityMin: number;
  opacityMax: number;
  background: string;
}

export default function DemoOne() {
  const [cfg, setCfg] = useState<CfgState>({
    rows: 25,
    cols: 35,
    spacing: 4,
    duration: 5.0,
    color: "hsl(var(--green))",
    animationType: "pulse",
    pulseEffect: true,
    mouseGlow: true,
    opacityMin: 0.05,
    opacityMax: 0.6,
    background: "hsl(var(--background))",
  });
  const [panelOpen, setPanelOpen] = useState(false);

  const randomize = useCallback(() => {
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const colors = [
      "hsl(var(--green))",
      "hsl(var(--pink))",
      "hsl(var(--cyan))",
      "hsl(var(--yellow))",
      "hsl(var(--orange))",
    ];
    const anims: Array<"pulse" | "wave" | "random"> = ["pulse", "wave", "random"];
    setCfg((c) => ({
      ...c,
      rows: Math.floor(rand(15, 40)),
      cols: Math.floor(rand(15, 40)),
      duration: rand(3, 10),
      color: colors[Math.floor(Math.random() * colors.length)],
      animationType: anims[Math.floor(Math.random() * anims.length)],
      pulseEffect: Math.random() > 0.2,
      mouseGlow: Math.random() > 0.3,
      opacityMin: rand(0.05, 0.2),
      opacityMax: rand(0.5, 1.0),
      spacing: Math.floor(rand(2, 8)),
    }));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName.toLowerCase() === "input") return;
      const k = e.key.toLowerCase();
      if (k === "h") setPanelOpen((v) => !v);
      if (k === "r") randomize();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [randomize]);

  return (
    <DataGridHero {...cfg}>
      <div className="demo-content-wrapper">
        <h1 className="text-5xl font-bold tracking-tight mb-4">DataGrid Hero</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          A generative, interactive hero component built with React. Customize
          the grid animation using the control panel.
        </p>
        <div className="buttons flex justify-center gap-4">
          <button className="px-6 py-3 bg-primary text-black font-semibold rounded-lg shadow-lg hover:bg-opacity-90 transition">
            Get Started
          </button>
          <button
            className="px-6 py-3 bg-transparent border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition"
            onClick={() => setPanelOpen(true)}
          >
            Controls (H)
          </button>
        </div>
      </div>

      {panelOpen && (
        <ControlPanel
          cfg={cfg}
          setCfg={setCfg}
          onClose={() => setPanelOpen(false)}
          onRandomize={randomize}
        />
      )}
    </DataGridHero>
  );
}

// -- Control Panel & Helpers --

interface ControlPanelProps {
  cfg: CfgState;
  setCfg: React.Dispatch<React.SetStateAction<CfgState>>;
  onClose: () => void;
  onRandomize: () => void;
}

function ControlPanel({ cfg, setCfg, onClose, onRandomize }: ControlPanelProps) {
  return (
    <aside className="control-panel fixed right-6 top-24 z-50 w-80 bg-black/80 backdrop-blur-md border border-white/15 p-6 rounded-2xl shadow-2xl text-white">
      <h3 className="text-xl font-bold mb-4">Grid Controls</h3>
      <div className="space-y-4">
        <Slider
          label="Rows"
          min={5}
          max={50}
          step={1}
          value={cfg.rows}
          onChange={(v) => setCfg({ ...cfg, rows: v })}
        />
        <Slider
          label="Columns"
          min={5}
          max={50}
          step={1}
          value={cfg.cols}
          onChange={(v) => setCfg({ ...cfg, cols: v })}
        />
        <Slider
          label="Spacing"
          min={0}
          max={16}
          step={1}
          value={cfg.spacing}
          onChange={(v) => setCfg({ ...cfg, spacing: v })}
        />
        <Slider
          label="Duration"
          min={1}
          max={15}
          step={0.1}
          value={cfg.duration}
          onChange={(v) => setCfg({ ...cfg, duration: v })}
        />
        <Select
          label="Animation Type"
          value={cfg.animationType}
          options={[
            { label: "Pulse from Center", value: "pulse" },
            { label: "Wave", value: "wave" },
            { label: "Random", value: "random" },
          ]}
          onChange={(v) => setCfg({ ...cfg, animationType: v as any })}
        />
        <Toggle
          label="Pulse Effect"
          value={cfg.pulseEffect}
          onChange={(v) => setCfg({ ...cfg, pulseEffect: v })}
        />
        <Toggle
          label="Mouse Glow"
          value={cfg.mouseGlow}
          onChange={(v) => setCfg({ ...cfg, mouseGlow: v })}
        />
        <Slider
          label="Opacity Min"
          min={0}
          max={1}
          step={0.05}
          value={cfg.opacityMin}
          onChange={(v) => setCfg({ ...cfg, opacityMin: v })}
        />
        <Slider
          label="Opacity Max"
          min={0}
          max={1}
          step={0.05}
          value={cfg.opacityMax}
          onChange={(v) => setCfg({ ...cfg, opacityMax: v })}
        />
        <div className="panel-buttons flex gap-3 pt-2">
          <button 
            className="flex-1 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-sm transition"
            onClick={onRandomize}
          >
            Randomize (R)
          </button>
          <button 
            className="flex-1 py-2 bg-primary text-black font-semibold rounded-lg text-sm transition"
            onClick={onClose}
          >
            Close (H)
          </button>
        </div>
      </div>
    </aside>
  );
}

interface SliderProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (v: number) => void;
}

function Slider({ label, min, max, step, value, onChange }: SliderProps) {
  return (
    <label className="panel-control block">
      <div className="label-row flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span className="value font-mono">{Number(value).toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-primary"
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </label>
  );
}

interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ label, value, onChange }: ToggleProps) {
  return (
    <label className="panel-control toggle-control flex justify-between items-center py-1">
      <span className="text-xs text-gray-300">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={value}
        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${value ? 'bg-primary' : 'bg-white/20'}`}
        onClick={() => onChange(!value)}
      >
        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </label>
  );
}

interface SelectProps {
  label: string;
  value: string;
  options: Array<{ label: string; value: string }>;
  onChange: (v: string) => void;
}

function Select({ label, value, options, onChange }: SelectProps) {
  return (
    <label className="panel-control block">
      <div className="label-row text-xs text-gray-400 mb-1">{label}</div>
      <div className="select-wrapper relative">
        <select
          value={value}
          className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white appearance-none focus:outline-none focus:border-primary/50"
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-neutral-900 text-white">
              {o.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </label>
  );
}
