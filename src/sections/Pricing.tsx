import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const PLANS = [
  {
    name: '免费体验',
    price: '¥0',
    period: '',
    desc: '先来感受一下被 AI 连环追问的滋味',
    features: ['每天 1 次 5 分钟快练', '基础评估分数', '1 份简历诊断'],
    cta: '免费预约',
    highlight: false,
  },
  {
    name: '求职季卡',
    price: '¥128',
    period: '/ 求职季',
    desc: '覆盖一整个求职周期，每天练到爽',
    features: [
      '每天 3 次深度模拟面试（20–30 分钟）',
      '无限次简历诊断',
      '全岗位题库 + JD 定制追问',
      '完整评估报告与改进追踪',
    ],
    cta: '预约内测价',
    highlight: true,
  },
  {
    name: '终身特工',
    price: '¥399',
    period: '/ 永久',
    desc: '跳槽季、晋升答辩，长期持有',
    features: ['季卡全部权益，永久有效', '新岗位题库优先体验', '未来语音面试功能免费解锁'],
    cta: '预约内测价',
    highlight: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <h2 className="text-balance text-center text-2xl sm:text-3xl font-bold tracking-tight">
        一个求职季，一顿火锅钱
      </h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        内测期间所有功能免费开放，预约即锁名额。
      </p>
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-xl border p-6 ${
              p.highlight
                ? 'border-primary bg-card glow-red'
                : 'border-border bg-card'
            }`}
          >
            {p.highlight && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                内测主推 · 约 ¥1.4/天
              </Badge>
            )}
            <h3 className="text-sm font-medium text-muted-foreground">{p.name}</h3>
            <p className="mt-2">
              <span className="text-3xl font-black">{p.price}</span>
              <span className="text-sm text-muted-foreground">{p.period}</span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">{p.desc}</p>
            <ul className="mt-5 flex-1 space-y-2.5 text-[13px] text-muted-foreground">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={p.highlight ? 'default' : 'outline'}
              className="mt-6 w-full"
              asChild
            >
              <a href="#lead">{p.cta}</a>
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
