import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Container from "../components/layout/Container";
import { Mail, Lock, ArrowLeft, KeyRound, Check, X } from "lucide-react";

function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function getStrengthLabel(score) {
  if (score === 0) return { label: "Very weak", color: "bg-red-500", text: "text-red-600" };
  if (score <= 2) return { label: "Weak", color: "bg-orange-500", text: "text-orange-600" };
  if (score <= 3) return { label: "Fair", color: "bg-yellow-500", text: "text-yellow-600" };
  if (score <= 4) return { label: "Strong", color: "bg-lime-500", text: "text-lime-600" };
  return { label: "Very strong", color: "bg-green-500", text: "text-green-600" };
}

const requirements = [
  { test: (p) => p.length >= 8, text: "At least 8 characters" },
  { test: (p) => /[A-Z]/.test(p), text: "One uppercase letter" },
  { test: (p) => /[a-z]/.test(p), text: "One lowercase letter" },
  { test: (p) => /[0-9]/.test(p), text: "One number" },
  { test: (p) => /[^A-Za-z0-9]/.test(p), text: "One special character" },
];

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [demoCode, setDemoCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("email"); // email | code | done
  const { forgotPassword, resetWithCode } = useAuth();
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await forgotPassword(email);
      setSent(true);
      setStep("code");
      if (data.demoCode) setDemoCode(data.demoCode);
      toast.success("Reset code sent! Check your email.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const strength = getStrength(newPassword);
    if (strength < 3) {
      toast.error("Please choose a stronger password");
      return;
    }
    setLoading(true);
    try {
      await resetWithCode(email, code, newPassword);
      toast.success("Password reset successfully! Welcome back.");
      navigate("/account");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrength(newPassword);
  const strengthInfo = getStrengthLabel(strength);

  return (
    <div className="mx-auto max-w-md">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8">
        <ArrowLeft size={16} /> Back to Sign In
      </button>

      <h1 className="text-4xl font-black">Reset Password</h1>
      <p className="mt-2 text-gray-500">
        {step === "email" && "Enter your email and we'll send you a reset code."}
        {step === "code" && "Enter the reset code and your new password."}
      </p>

      {demoCode && step === "code" && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
          [DEMO] Your reset code: <strong>{demoCode}</strong> (expires in 15 min)
        </div>
      )}

      {step === "email" && (
        <form onSubmit={handleSendCode} className="mt-10 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black transition"
              placeholder="your@email.com"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-full bg-black py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:opacity-50">
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      )}

      {step === "code" && (
        <form onSubmit={handleReset} className="mt-10 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Reset Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black transition font-mono text-center text-lg tracking-[0.3em]"
              placeholder="000000"
              maxLength={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black transition"
              placeholder="New password"
            />
            {newPassword && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className={"h-full rounded-full transition-all " + strengthInfo.color} style={{ width: (strength / 5) * 100 + "%" }} />
                  </div>
                  <span className={"text-xs font-semibold " + strengthInfo.text}>{strengthInfo.label}</span>
                </div>
                <div className="space-y-1.5">
                  {requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      {req.test(newPassword) ? <Check size={14} className="text-green-500" /> : <X size={14} className="text-gray-300" />}
                      <span className={req.test(newPassword) ? "text-green-700" : "text-gray-400"}>{req.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button type="submit" disabled={loading} className="w-full rounded-full bg-black py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:opacity-50">
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/account");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (showForgot) {
    return (
      <section className="py-24">
        <Container>
          <ForgotPassword onBack={() => setShowForgot(false)} />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-md">
          <h1 className="text-4xl font-black">Welcome Back</h1>
          <p className="mt-2 text-gray-500">Sign in to your Sole Store account.</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black transition"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black transition"
                placeholder="Your password"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-xs font-medium text-gray-500 hover:text-black underline transition"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-black underline">
              Create one
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

export default Login;
