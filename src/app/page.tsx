import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Cpu, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
            Radon AGI
          </h1>
          <p className="text-xl md:text-2xl text-[#a0a0a0] max-w-2xl mx-auto">
            Advanced General Intelligence by MagistrTheOne
          </p>
 
          <div className="pt-8">
            <Link href="/sign-in">
              <Button 
                variant="outline" 
                size="lg"
                className="glass border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200"
              >
                Start Chat
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Advanced Capabilities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-lg p-8 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-4">Advanced Reasoning</h3>
              <p className="text-[#a0a0a0]">
                Deep thinking process with step-by-step analysis and logical reasoning capabilities.
              </p>
            </div>
            <div className="glass rounded-lg p-8 text-center">
              <Cpu className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-4">30B Parameters</h3>
              <p className="text-[#a0a0a0]">
                Massive neural network with 31.72 billion parameters for superior understanding.
              </p>
            </div>
            <div className="glass rounded-lg p-8 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-4">Real-time Thinking</h3>
              <p className="text-[#a0a0a0]">
                Live reasoning process visible in responses, powered by NVIDIA H200 GPU.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#a0a0a0]">
            © 2025 MagistrTheOne. Radon AGI Project
          </p>
        </div>
      </footer>
    </div>
  );
}
