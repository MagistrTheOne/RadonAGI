import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Radon AGI</h1>
          <p className="text-[#a0a0a0]">Create your account</p>
        </div>
        <SignUp 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "glass border-[#2a2a2a] bg-[#1a1a1a]/50",
              headerTitle: "text-white",
              headerSubtitle: "text-[#a0a0a0]",
              socialButtonsBlockButton: "glass border-[#2a2a2a] text-white hover:bg-white/10",
              formButtonPrimary: "bg-white text-[#0a0a0a] hover:bg-white/90",
              formFieldInput: "glass border-[#2a2a2a] text-white placeholder:text-[#a0a0a0]",
              footerActionLink: "text-white hover:text-white/80",
              identityPreviewText: "text-[#a0a0a0]",
              formFieldLabel: "text-white",
            }
          }}
        />
      </div>
    </div>
  );
}
