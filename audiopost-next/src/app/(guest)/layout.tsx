"use client";
// : { children: React.ReactNode }
export default function AuthLayout({ children }: any) {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-full">
        {/* <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-indigo-600">AudioPost</h1>
          <p className="text-sm text-gray-500">Acesse sua conta para continuar</p>
        </div> */}
        {/* O 'children' é onde as páginas de login/registro vão ser injetadas */}
        {children} 
      </div>
      <div className="grid grid-cols-2">
        <footer className="fixed col-span-1 bottom-0 w-full bg-gray-100 text-center py-4">
          <p className="text-sm text-gray-500">© 2024 AudioPost. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}