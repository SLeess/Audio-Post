"use client";

import useLogin from "@/modules/auth/hooks/Login/useLogin";

import BannerImage from "@/modules/auth/components/Login/BannerImage";
import FormLogin from "@/modules/auth/components/Login/FormLogin";

export default function LoginPage()
{
    const { 
        formData,
        handleInputChange,
        handleSubmit 
    } = useLogin();

    return (<>
        <div className="grid grid-cols-12 min-h-screen w-full">
            <FormLogin 
                formData={formData}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
            />
            <BannerImage />
        </div>
    </>);
}