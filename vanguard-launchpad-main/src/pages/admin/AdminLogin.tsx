import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { loginAdmin } from "@/lib/api";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAdminAuth();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      const next = (location.state as { from?: Location })?.from?.pathname ?? "/admin";
      navigate(next, { replace: true });
    }
  }, [isAuthenticated, location.state, navigate]);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      form.clearErrors();
      const result = await loginAdmin(values);
      login(result);
      toast({
        title: "Logged in",
        description: "Welcome back, admin!",
      });
      navigate("/admin", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    }
  });

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-16">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Card className="backdrop-blur-xl bg-white/5 border-white/10 shadow-xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl font-bold text-white">Admin Access</CardTitle>
            <CardDescription className="text-slate-300">
              Sign in to manage Vanguard's portfolio and video projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  {...form.register("email")}
                  className={cn("bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-primary")}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-400">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  {...form.register("password")}
                  className={cn("bg-white/10 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-primary")}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-red-400">{form.formState.errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Need assistance? <Link to="/contact" className="text-primary hover:underline">Contact support</Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
