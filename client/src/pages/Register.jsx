import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Container from "../components/layout/Container";
import { Shield, Check, X } from "lucide-react";

function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 5);
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
  { test: (p) => /[^A-Za-z0-9]/.test(p), text: "One special character (!@#$ etc.)" },
];

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = getStrength(password);
  const strengthInfo = getStrengthLabel(strength);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (strength < 3) {
      toast.error("Please choose a stronger password");
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      toast.success("Account created! Welcome to Sole Store.");
      navigate("/account");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-md">
          <h1 className="text-4xl font-black">Create Account</h1>
          <p className="mt-2 text-gray-500">Join Sole Store and start shopping.</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black transition"
                placeholder="Your name"
              />
            </div>

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
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-black transition"
                placeholder="Create a strong password"
              />
              {password && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={"h-full rounded-full transition-all " + strengthInfo.color}
                        style={{ width: (strength / 5) * 100 + "%" }}
                      />
                    </div>
                    <span className={"text-xs font-semibold " + strengthInfo.text}>
                      {strengthInfo.label}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {requirements.map((req, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        {req.test(password) ? (
                          <Check size={14} className="text-green-500" />
                        ) : (
                          <X size={14} className="text-gray-300" />
                        )}
                        <span className={req.test(password) ? "text-green-700" : "text-gray-400"}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-black underline">
              Sign in
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

export default Register;
