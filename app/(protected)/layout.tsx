import MobileLayout from "@/components/mobile-layout";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <MobileLayout>{children}</MobileLayout>;
}
