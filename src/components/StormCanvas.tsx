"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 aPos; void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }`;

// Lightning approach follows the reference ShaderToy (llycW1): intracloud flashes
// light the cloud volume from a random point inside it — no drawn bolts.
const LIGHTNING_GLSL = `
uniform float uFlash;
uniform vec2 uFlashPos;
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPar;
${LIGHTNING_GLSL}

float hash(vec2 p){
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

const mat2 M = mat2(1.6, 1.2, -1.2, 1.6);

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 6; i++){
    v += a * noise(p);
    p = M * p;
    a *= 0.5;
  }
  return v;
}

float density(vec3 pos){
  vec2 q = pos.xy * 1.5 + vec2(uTime * 0.05, -uTime * 0.012);
  vec2 w = vec2(fbm(q + vec2(0.0, 1.7)), fbm(q + vec2(5.2, 1.3)));
  float f = fbm(q + 1.2 * w);
  f = 0.72 * f + 0.28 * fbm(q * 2.6 + w);
  float h = pos.z;
  float fade = smoothstep(0.0, 0.3, h) * (1.0 - smoothstep(0.45, 1.15, h));
  return max(f * fade - 0.30, 0.0);
}

vec4 clouds(vec2 uv){
  vec3 rd = normalize(vec3(uv * vec2(1.0, 0.9), 1.4));
  vec3 ro = vec3(uPar * 0.35, 0.0);
  vec3 fp = vec3(uFlashPos.x * 2.5, uFlashPos.y * 2.0, 1.35);
  vec3 ld = normalize(vec3(-0.3, 1.0, 0.55));
  float t = 0.3;
  vec3 col = vec3(0.0);
  float trans = 1.0;
  for (int i = 0; i < 20; i++){
    vec3 p = ro + rd * t;
    float den = density(p);
    if (den > 0.004){
      float sh = density(p + ld * 0.4);
      float lum = clamp(1.0 - sh * 2.8, 0.02, 1.0);
      lum = lum * lum;
      vec3 c = mix(vec3(0.05, 0.07, 0.13), vec3(0.50, 0.58, 0.70), lum);
      c += vec3(0.78, 0.85, 1.0) * uFlash / (1.0 + dot(p - fp, p - fp) * 1.2);
      float a = clamp(den * 4.5, 0.0, 1.0);
      col += c * a * trans;
      trans *= 1.0 - a * 0.88;
      if (trans < 0.04) break;
    }
    t += max(0.11, t * 0.13);
  }
  return vec4(col, clamp(1.0 - trans, 0.0, 1.0));
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 sky = mix(vec3(0.006, 0.008, 0.018), vec3(0.025, 0.03, 0.055), smoothstep(-0.5, 0.7, uv.y));
  vec4 c = clouds(uv + vec2(0.0, -0.15));
  c.rgb *= vec3(0.85, 0.92, 1.10);
  vec3 col = sky * (1.0 - c.a) + c.rgb;
  vec3 fdir = normalize(vec3(uFlashPos * 1.6, 0.35));
  vec3 srd = normalize(vec3(uv * vec2(1.0, 0.9), 1.4));
  col += vec3(0.60, 0.70, 0.90) * uFlash
    * (pow(clamp(dot(srd, fdir), 0.0, 1.0), 8.0) * 0.18 + c.a * 0.10);
  float vig = 1.0 - 0.62 * dot(uv, uv);
  col *= vig;
  gl_FragColor = vec4(col, 1.0);
}
`;

const FRAG_FALLBACK = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPar;
${LIGHTNING_GLSL}

float hash(vec2 p){
  p = fract(p * vec2(233.34, 851.73));
  p += dot(p, p + 23.45);
  return fract(p.x * p.y);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++){
    v += a * noise(p);
    p = p * 1.6 + vec2(1.2, -1.2) * a;
    a *= 0.5;
  }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float f = fbm(uv * 1.6 + vec2(uTime * 0.04, -uTime * 0.01) + uPar * 0.1);
  float h = fbm(uv * 1.1 + vec2(-uTime * 0.025, uTime * 0.02) + 47.0);
  vec3 tint = mix(vec3(0.045, 0.09, 0.24), vec3(0.13, 0.17, 0.27), smoothstep(0.25, 0.75, h));
  vec3 col = mix(vec3(0.006, 0.008, 0.016), tint * (0.4 + f * 0.75), smoothstep(0.35, 0.95, f));
  col += vec3(0.70, 0.80, 1.00) * uFlash
    * (0.35 * smoothstep(0.55, 0.0, length(uv - uFlashPos * vec2(1.2, 0.6))) + 0.10);
  col *= 1.0 - 0.62 * dot(uv, uv);
  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) {
    console.error("StormCanvas: createShader failed, context lost?", gl.isContextLost());
    return null;
  }
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    console.error(
      "StormCanvas shader compile failed",
      "\nlog:", gl.getShaderInfoLog(sh),
      "\nglError:", gl.getError(),
      "\ncontextLost:", gl.isContextLost(),
      "\nrenderer:", dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : "n/a",
    );
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function StormCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const opts: WebGLContextAttributes = {
      alpha: false,
      antialias: false,
      failIfMajorPerformanceCaveat: false,
        powerPreference: "high-performance",
    };
    const gl =
      (canvas.getContext("webgl", opts) as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl", opts) as WebGLRenderingContext | null);
    if (!gl) {
      canvas.style.display = "none";
      return;
    }

    let disposed = false;
    let raf = 0;
    let running = false;
    let teardown: (() => void) | null = null;

    const init = () => {
      if (disposed || running) return;
      running = true;

      const vs = compile(gl, gl.VERTEX_SHADER, VERT);
      let fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!fs) {
        console.warn("StormCanvas: falling back to simplified shader");
        fs = compile(gl, gl.FRAGMENT_SHADER, FRAG_FALLBACK);
      }
      const prog = gl.createProgram();
      if (!vs || !fs || !prog) {
        canvas.style.display = "none";
        running = false;
        return;
      }
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error("StormCanvas link failed:", gl.getProgramInfoLog(prog));
        canvas.style.display = "none";
        running = false;
        return;
      }
      gl.useProgram(prog);

      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      const loc = gl.getAttribLocation(prog, "aPos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

      const uRes = gl.getUniformLocation(prog, "uRes");
      const uTime = gl.getUniformLocation(prog, "uTime");
      const uPar = gl.getUniformLocation(prog, "uPar");
      const uFlash = gl.getUniformLocation(prog, "uFlash");
      const uFlashPos = gl.getUniformLocation(prog, "uFlashPos");

      const scale = 0.8;
      const resize = () => {
        canvas.width = Math.max(2, Math.floor(window.innerWidth * scale));
        canvas.height = Math.max(2, Math.floor(window.innerHeight * scale));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, canvas.width, canvas.height);
      };
      resize();
      window.addEventListener("resize", resize);

      let visible = true;
      const io = new IntersectionObserver(([entry]) => {
        visible = !!entry?.isIntersecting;
      });
      io.observe(canvas);

      let mx = 0;
      let my = 0;
      let cx = 0;
      let cy = 0;
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      if (!reduced) window.addEventListener("mousemove", onMouse, { passive: true });

      const t0 = performance.now();
      let last = 0;

      let nextFlash = 2.2;
      let flashT = 10;
      let flashDur = 1;
      let flashX = 0.3;
      let flashY = 0.5;
      let flashInt = 1;
      let lastT = 0;

      const draw = (t: number) => {
        const dt = Math.min(0.1, Math.max(0, t - lastT));
        lastT = t;
        nextFlash -= dt;
        flashT += dt;
        if (nextFlash <= 0) {
          nextFlash = 2.8 + Math.random() * 4.2;
          flashT = 0;
          flashDur = 0.4 + Math.random() * 0.9;
          flashX = Math.random() * 1.8 - 0.9;
          flashY = 0.1 + Math.random() * 0.5;
          flashInt = 0.7 + Math.random() * 0.6;
        }
        const q = flashT / flashDur;
        const flash =
          q >= 1
            ? 0
            : Math.pow(Math.max(0, 1 - q), 2) *
              (0.55 + 0.45 * Math.abs(Math.sin(q * 28 + 1.3))) *
              flashInt;
        cx += (mx - cx) * 0.04;
        cy += (my - cy) * 0.04;
        gl.uniform1f(uTime, t);
        gl.uniform2f(uPar, cx, cy);
        if (uFlash) gl.uniform1f(uFlash, flash);
        if (uFlashPos) gl.uniform2f(uFlashPos, flashX, flashY);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      };

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (!visible) return;
        if (now - last < 33) return;
        last = now;
        draw((now - t0) / 1000);
      };

      if (reduced) {
        draw(12);
      } else {
        raf = requestAnimationFrame(frame);
      }

      teardown = () => {
        running = false;
        cancelAnimationFrame(raf);
        io.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", onMouse);
      };
    };

    const onLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
      teardown?.();
      teardown = null;
      if (!disposed) {
        window.setTimeout(() => {
          if (!disposed && gl.isContextLost()) {
            gl.getExtension("WEBGL_lose_context")?.restoreContext();
          }
        }, 120);
      }
    };

    const onRestored = () => {
      if (!disposed) init();
    };

    canvas.addEventListener("webglcontextlost", onLost, false);
    canvas.addEventListener("webglcontextrestored", onRestored, false);

    if (gl.isContextLost()) {
      gl.getExtension("WEBGL_lose_context")?.restoreContext();
    } else {
      init();
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      teardown?.();
      teardown = null;
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
