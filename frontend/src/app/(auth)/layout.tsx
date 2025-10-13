// V ta layout structuras sliko (Twitter.png)
// Layout je blueprint za komponente ki sharajo same layout
// Kaj singup in login sharasta?
// V layout gre e.g. topbar in sidebar (vsi pagi sharajo to)
// Drugace bi mogu znotru usaekega paga narest topbar in sidebar

// signup in register ne sharasta forma (different form)


export default function AuthLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
                {children}
            </div>
        </div>
    )
}