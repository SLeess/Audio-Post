"use client";

import useLogin from "@/modules/auth/hooks/Login/useLogin";

import BannerImage from "@/modules/auth/components/Login/BannerImage";
import FormLogin from "@/modules/auth/components/Login/FormLogin";

export default function LoginPage()
{
    const { form, onSubmit, isLoading } = useLogin();

    return (<>
        <div className="grid grid-cols-12 min-h-screen w-full">
            <FormLogin 
                form={form}
                onSubmit={onSubmit}
                isLoading={isLoading}
            />
            <BannerImage />
        </div>
    </>);
}