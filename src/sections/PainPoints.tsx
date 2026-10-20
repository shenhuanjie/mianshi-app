const PAINS = [
  {
    title: '练无可练',
    desc: '朋友没空陪练，对着镜子练不出真实面试的压力感。临场一紧张，准备的东西全忘。',
  },
  {
    title: '挂了不知道为什么',
    desc: '真实面试官只会说"回去等通知"。你到底哪道题答崩了、为什么崩，永远没人告诉你。',
  },
  {
    title: '题库脱离实战',
    desc: '背了 300 道八股文，面试官一追问项目细节、方案选型，立刻露馅。背题 ≠ 会面试。',
  },
]

export default function PainPoints() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-balance text-center text-2xl sm:text-3xl font-bold tracking-tight">
          简历投了 200 份，
          <span className="text-primary">面试还是挂在同一个地方</span>
        </h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          求职失败的根源，几乎从来不是"题没背够"，而是没人给你真实的追问和反馈。
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {PAINS.map((p, i) => (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <span className="text-xs font-mono font-bold text-primary">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
