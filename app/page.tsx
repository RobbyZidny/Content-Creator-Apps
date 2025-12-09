"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, CreditCard, BookOpen, ArrowRight, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import bgImage from "@assets/generated_images/abstract_neon_gradient_background.png";

const registerSchema = z.object({
    username: z.string().min(2, "Nama terlalu pendek"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    nim: z.string().min(5, "NIM minimal 5 digit"),
    major: z.string().min(2, "Jurusan harus diisi"),
});

const loginSchema = z.object({
    username: z.string().min(2, "Nama terlalu pendek"),
    password: z.string().min(6, "Password minimal 6 karakter"),
});

export default function Login() {
    const router = useRouter();
    const [isRegister, setIsRegister] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(isRegister ? registerSchema : loginSchema),
        defaultValues: {
            username: "",
            password: "",
            nim: "",
            major: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true);
        try {
            if (isRegister) {
                await api.register(values);
                toast({
                    title: "Berhasil mendaftar!",
                    description: "Selamat datang di CreatorID",
                });
            } else {
                await api.login({
                    username: values.username,
                    password: values.password,
                });
                toast({
                    title: "Berhasil login!",
                    description: "Selamat datang kembali",
                });
            }
            router.push("/dashboard");
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Terjadi kesalahan",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 opacity-60"
                style={{
                    backgroundImage: `url(${bgImage.src})`, // Next.js imports images as objects
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />

            <div className="relative z-10 w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">
                            Creator<span className="text-primary">ID</span>
                        </h1>
                        <p className="text-white/60">Join the creative community</p>
                    </div>

                    <Card className="border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
                        <CardHeader>
                            <CardTitle className="text-xl text-white">{isRegister ? "Daftar" : "Login"}</CardTitle>
                            <CardDescription className="text-white/40">
                                {isRegister ? "Buat akun baru untuk bergabung" : "Masuk ke akun Anda"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/80">Username</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                                        <Input
                                                            placeholder="johndoe"
                                                            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary"
                                                            data-testid="input-username"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white/80">Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                                        <Input
                                                            type="password"
                                                            placeholder="******"
                                                            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary"
                                                            data-testid="input-password"
                                                            {...field}
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {isRegister && (
                                        <>
                                            <FormField
                                                control={form.control}
                                                name="nim"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-white/80">NIM</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                                                <Input
                                                                    placeholder="12345678"
                                                                    className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary"
                                                                    data-testid="input-nim"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="major"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-white/80">Jurusan (Major)</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <BookOpen className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                                                <Input
                                                                    placeholder="Informatics Engineering"
                                                                    className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary"
                                                                    data-testid="input-major"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 mt-2 shadow-[0_0_20px_hsl(265,89%,66%,0.3)]"
                                        data-testid="button-submit"
                                    >
                                        {isLoading ? "Loading..." : (isRegister ? "Daftar" : "Login")} <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </form>
                            </Form>

                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => {
                                        setIsRegister(!isRegister);
                                        form.reset();
                                    }}
                                    className="text-sm text-white/60 hover:text-primary transition-colors"
                                    data-testid="button-toggle-mode"
                                >
                                    {isRegister ? "Sudah punya akun? Login" : "Belum punya akun? Daftar"}
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
