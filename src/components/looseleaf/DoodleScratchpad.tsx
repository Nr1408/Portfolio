import React, { useRef, useState, useEffect } from "react";
import { StickyNote } from "./StickyNote";
import { LooseleafButton } from "./LooseleafButton";
import { Eraser, Pencil, Sparkles } from "lucide-react";

export function DoodleScratchpad() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#1c1917");
  const [lineWidth, setLineWidth] = useState(2.5);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Initial subtle prompt sketch
    ctx.font = "16px 'Architects Daughter', cursive";
    ctx.fillStyle = "rgba(120, 113, 108, 0.4)";
    ctx.textAlign = "center";
    ctx.fillText("✨ Scribble or doodle here! ✨", rect.width / 2, rect.height / 2);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!hasDrawn) {
      // Clear initial prompt text on first draw
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      setHasDrawn(true);
    }

    setIsDrawing(true);
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPos(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    setHasDrawn(false);

    // redraw prompt
    ctx.font = "16px 'Architects Daughter', cursive";
    ctx.fillStyle = "rgba(120, 113, 108, 0.4)";
    ctx.textAlign = "center";
    ctx.fillText("✨ Scribble or doodle here! ✨", rect.width / 2, rect.height / 2);
  };

  const getPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <StickyNote
      color="yellow"
      fastener="tape"
      tilt={1.2}
      className="w-full max-w-sm mx-auto shadow-hand"
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-dashed border-stone-800/20 font-hand">
        <span className="font-bold text-sm tracking-wide flex items-center gap-1.5 text-stone-900">
          <Pencil size={15} />
          Visitor Scratchpad
        </span>
        <button
          onClick={clearCanvas}
          className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 underline underline-offset-2"
        >
          <Eraser size={12} />
          Erase
        </button>
      </div>

      <div className="relative w-full h-40 bg-[#fffdf0] rounded-sm border-2 border-stone-800 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)] overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full block touch-none"
        />
      </div>

      {/* Pen tool selector */}
      <div className="flex items-center justify-between pt-3 mt-1 text-xs font-hand">
        <span className="text-stone-600 font-semibold">Select Pen:</span>
        <div className="flex items-center gap-2">
          {/* Black ink */}
          <button
            onClick={() => {
              setColor("#1c1917");
              setLineWidth(2.5);
            }}
            title="Black Ink"
            className={`w-6 h-6 rounded-full bg-[#1c1917] border-2 ${
              color === "#1c1917" ? "border-amber-500 scale-110" : "border-stone-400"
            }`}
          />
          {/* Red pen */}
          <button
            onClick={() => {
              setColor("#dc2626");
              setLineWidth(2.5);
            }}
            title="Red Pen"
            className={`w-6 h-6 rounded-full bg-[#dc2626] border-2 ${
              color === "#dc2626" ? "border-amber-500 scale-110" : "border-stone-400"
            }`}
          />
          {/* Blue ballpoint */}
          <button
            onClick={() => {
              setColor("#2563eb");
              setLineWidth(2.5);
            }}
            title="Blue Pen"
            className={`w-6 h-6 rounded-full bg-[#2563eb] border-2 ${
              color === "#2563eb" ? "border-amber-500 scale-110" : "border-stone-400"
            }`}
          />
          {/* Highlighter */}
          <button
            onClick={() => {
              setColor("rgba(234, 179, 8, 0.55)");
              setLineWidth(10);
            }}
            title="Yellow Highlighter"
            className={`w-6 h-6 rounded-full bg-[#eab308] border-2 ${
              color.includes("234, 179, 8") ? "border-amber-600 scale-110" : "border-stone-400"
            }`}
          />
        </div>
      </div>
    </StickyNote>
  );
}

