import { Button } from '@/components/ui/button'

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-primary">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-md bg-primary opacity-25" />
            <span className="relative text-[13px] font-black text-primary-foreground">
              特
            </span>
          </span>
          <span className="text-[15px] font-bold tracking-wide">
            面试特工
            <span className="ml-2 hidden sm:inline text-xs font-normal text-muted-foreground">
              AI 求职陪练
            </span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#how" className="hover:text-foreground transition-colors">
            工作原理
          </a>
          <a href="#report" className="hover:text-foreground transition-colors">
            报告样例
          </a>
          <a href="#pricing" className="hover:text-foreground transition-colors">
            定价
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            常见问题
          </a>
        </nav>
        <Button size="sm" asChild>
          <a href="#lead">预约内测</a>
        </Button>
      </div>
    </header>
  )
}
