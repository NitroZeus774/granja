import { RegisterForm } from "@/components/register-form"

export default function RegistroPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f9f2] py-12 px-4 sm:px-6 lg:px-8">
           

            <div className="max-w-md w-full space-y-8">
                <RegisterForm />
            </div>
        </div>
    )
}