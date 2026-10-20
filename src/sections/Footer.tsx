export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xs font-black text-primary-foreground">
              特
            </span>
            <span className="text-sm font-bold">面试特工</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 面试特工 · 让每一次练习都算数
          </p>
        </div>
      </div>
    </footer>
  )
}
