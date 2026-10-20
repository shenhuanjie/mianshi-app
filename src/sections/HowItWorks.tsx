const STEPS = [
  {
    step: '第 1 步',
    title: '告诉它你要面什么',
    desc: '选择目标岗位和工作年限，粘贴真实 JD。AI 会围绕这家公司的要求定制面试，不是通用题库。',
  },
  {
    step: '第 2 步',
    title: '接受连环追问',
    desc: 'AI 面试官逐题深入：你答什么，它就追问什么。答到第三层还站得住，真面试就稳了。',
  },
  {
    step: '第 3 步',
    title: '拿到评估报告',
    desc: '专业能力、项目深度、表达结构分维度打分，每道题给出改进建议和高质量参考回答。',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <h2 className="text-balance text-center text-2xl sm:text-3xl font-bold tracking-tight">
        三步，把面试练成肌肉记忆
      </h2>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {STEPS.map((s) => (
          <div key={s.title} className="relative rounded-xl border border-border bg-card p-6">
            <span className="rounded bg-secondary px-2 py-1 text-[11px] font-semibold text-muted-foreground">
              {s.step}
            </span>
            <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
