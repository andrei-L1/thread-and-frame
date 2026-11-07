import AppHeader from './AppHeader'

type AppLayoutProps = {
  children: React.ReactNode
}

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-stone-100">
      <AppHeader />

      <main className="flex flex-1 flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}

export default AppLayout