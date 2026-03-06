import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <SignIn
                appearance={{
                    variables: {
                        colorBackground: "#ffffff",
                        colorText: "#111827",
                        colorPrimary: "#6b21a8",
                        colorInputBackground: "#f9fafb",
                        colorInputText: "#111827",
                    },
                    elements: {
                        card: {
                            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                            border: "1px solid #e5e7eb",
                        },
                        headerTitle: { color: "#111827" },
                        headerSubtitle: { color: "#6b7280" },
                        socialButtonsBlockButton: {
                            border: "1px solid #e5e7eb",
                            color: "#111827",
                            backgroundColor: "#ffffff",
                        },
                        formFieldLabel: { color: "#374151" },
                        formFieldInput: {
                            border: "1px solid #d1d5db",
                            backgroundColor: "#f9fafb",
                            color: "#111827",
                        },
                        footerActionLink: { color: "#6b21a8" },
                        dividerLine: { backgroundColor: "#e5e7eb" },
                        dividerText: { color: "#9ca3af" },
                    },
                }}
            />
        </div>
    );
}
