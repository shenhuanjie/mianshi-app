import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

type Msg = {
  role: 'ai' | 'user'
  text: string
  tag?: string
}

const SCRIPT: Msg[] = [
  { role: 'ai', text: '你好，我是今天的面试官。岗位：后端工程师（3 年经验）。先做个自我介绍吧。' },
  { role: 'user', text: '我有 3 年 Java 后端经验，主要负责订单和支付系统…' },
  { role: 'ai', text: '订单系统峰值 QPS 多少？你具体做了什么优化？', tag: '追问 ①' },
  { role: 'user', text: '峰值 3000 左右，我加了 Redis 缓存，还把扣减库存异步化了。' },
  { role: 'ai', text: '缓存穿透怎么解决的？为什么选这个方案而不是空值缓存？', tag: '追问 ②' },
  { role: 'user', text: '用了布隆过滤器，因为空值缓存会占用…呃，会有不一致问题。' },
  { role: 'ai', text: '不一致具体指什么？布隆过滤器误判率怎么控制？', tag: '追问 ③' },
]

function useInterviewSim() {
  const [idx, setIdx] = useState(0)
  const [chars, setChars] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (idx >= SCRIPT.length) {
      const t = setTimeout(() => {
        setIdx(0)
        setChars(0)
        setDone(false)
      }, 5200)
      return () => clearTimeout(t)
    }
    const msg = SCRIPT[idx]
    if (chars < msg.text.length) {
      const speed = msg.role === 'ai' ? 34 : 22
      const t = setTimeout(() => setChars((c) => c + 1), speed)
      return () => clearTimeout(t)
    }
    setDone(true)
    const t = setTimeout(() => {
      setIdx((i) => i + 1)
      setChars(0)
      setDone(false)
    }, msg.role === 'ai' ? 1400 : 900)
    return () => clearTimeout(t)
  }, [idx, chars])

  const visible = useMemo(() => {
    const list: { msg: Msg; partial?: string }[] = []
    for (let i = 0; i < idx; i++) list.push({ msg: SCRIPT[i] })
    if (idx < SCRIPT.length) {
      list.push({ msg: SCRIPT[idx], partial: SCRIPT[idx].text.slice(0, chars) })
    }
    return list
  }, [idx, chars])

  return { visible, finished: idx >= SCRIPT.length, typing: !done && idx < SCRIPT.length }
}

function InterviewSim() {
  const { visible, finished, typing } = useInterviewSim()

  return (
    <div className="glow-red relative rounded-2xl border border-border bg-card/90 backdrop-blur overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary/80" />
          <span className="text-xs text-muted-foreground">
            模拟面试 · 后端工程师 · 第 {Math.min(visible.filter((v) => v.msg.role === 'ai').length, 3)} 轮
          </span>
        </div>
        <span className="rounded border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          LIVE 实录
        </span>
      </div>

      <div className="h-[340px] sm:h-[380px] space-y-3 overflow-hidden px-4 py-4">
        {visible.map(({ msg, partial }, i) => (
          <div key={i} className="msg-in flex flex-col gap-1">
            {msg.tag && (
              <span className="self-start rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                {msg.tag}
              </span>
            )}
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                msg.role === 'ai'
                  ? 'self-start rounded-bl-sm border border-border bg-secondary/70'
                  : 'self-end rounded-br-sm bg-primary text-primary-foreground'
              }`}
            >
              {partial ?? msg.text}
              {partial !== undefined && i === visible.length - 1 && typing && (
                <span className="caret" />
              )}
            </div>
          </div>
        ))}
        {finished && (
          <div className="msg-in self-center rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
            面试结束，正在生成评估报告… 综合评分 68 / 100
          </div>
        )}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-14">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-14 pb-20 sm:pt-20 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary hover:bg-primary/10">
              首批内测招募中 · 限 500 名
            </Badge>
            <h1 className="text-balance mt-5 text-4xl sm:text-5xl font-black leading-[1.15] tracking-tight">
              让 AI 面试官
              <br />
              把你问到
              <span className="text-primary">拿 offer</span>为止
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              粘贴目标岗位 JD，AI 面试官像真人一样咬着你的回答连环追问 3–8
              轮。练完立刻拿到分维度评估报告、每题改进建议和参考回答——不再挂在同一个地方。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <a href="#lead">免费预约内测</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#report">查看报告样例</a>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-border pt-6">
              {[
                ['3–8 轮', '单题连环追问'],
                ['5 分钟', '出具完整报告'],
                ['12 类', '互联网岗位覆盖'],
              ].map(([num, label]) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-xl font-bold text-primary">{num}</dd>
                  <dd className="mt-1 text-xs text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
          <InterviewSim />
        </div>
      </div>
    </section>
  )
}
