// V ta layout structuras sliko (Twitter.png)
// Layout je blueprint za komponente ki sharajo same layout
// Kaj singup in login sharasta?
// V layout gre e.g. topbar in sidebar (vsi pagi sharajo to)
// Drugace bi mogu znotru usaekega paga narest topbar in sidebar

// signup in register ne sharasta forma (different form)
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="bg-black text-white h-svh max-h-svh w-[90%] max-w-[90%] sm:h-screen sm-max-h-screen">
      <main className="flex h-full w-full">
        <section className="w-1/2 flex justify-center items-center">
          <Image src="/More.png" alt="Logo" width={1000} height={1000} />
        </section>
        <section className="w-1/2 flex justify-center items-center">
          {children}
        </section>
      </main>
    </body>
  );
}
