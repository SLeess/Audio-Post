"use client";
// : { children: React.ReactNode }
export default function AuthLayout({ children }: any) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">AudioPost</h1>
          <p className="text-sm text-gray-500">Acesse sua conta para continuar</p>
        </div>
        {/* O 'children' é onde as páginas de login/registro vão ser injetadas */}
        {children} 
      </div>
    </div>
  );
}