const DIMENSIONS = [
  { name: '专业能力', score: 72, note: '基础扎实，但缺少方案对比意识' },
  { name: '项目深度', score: 58, note: '第 3 层追问后失守，细节经不起深挖', weak: true },
  { name: '表达结构', score: 80, note: 'STAR 法则运用熟练，条理清晰' },
  { name: '岗位匹配', score: 65, note: '与 JD 中的高并发经验要求存在差距' },
]

export default function ReportPreview() {
  return (
    <section id="report" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="lg:sticky lg:top-24">
            <h2 className="text-balance text-2xl sm:text-3xl font-bold tracking-tight">
              每一次练习，
              <br />
              都有一份<span className="text-primary">能落地的报告</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              不是一句"表现不错"式的敷衍反馈。报告会精确指出你在
              <strong className="text-foreground">第几轮追问、哪一层逻辑</strong>
              上失守，并给出针对性改进建议和高质量参考回答。下次练习，AI 会重点检查你有没有改。
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                '分维度评分，弱项一目了然',
                '逐题复盘：哪里答崩、为什么崩',
                '参考回答 + 改进清单，练完就知道下一步',
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 报告样例卡片 */}
          <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground">模拟面试报告 · 后端工程师 · 3 年经验</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  第 4 次练习 · 相比上次 <span className="font-semibold text-emerald-500">+9 分</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-primary">68</p>
                <p className="text-xs text-muted-foreground">综合评分 / 100</p>
              </div>
            </div>

            <div className="mt-7 space-y-5">
              {DIMENSIONS.map((d) => (
                <div key={d.name}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span className="font-medium">
                      {d.name}
                      {d.weak && (
                        <span className="ml-2 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                          重点弱项
                        </span>
                      )}
                    </span>
                    <span className={d.weak ? 'font-bold text-primary' : 'text-muted-foreground'}>
                      {d.score}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`bar-grow h-full rounded-full ${d.weak ? 'bg-primary' : 'bg-muted-foreground/50'}`}
                      style={{ width: `${d.score}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-muted-foreground">{d.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <p className="text-xs font-semibold text-primary">改进建议（节选）</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                被追问"布隆过滤器误判率如何控制"时回答不完整。建议补充：误判率与位数组长度、哈希函数个数的关系公式，以及线上如何通过参数调优平衡内存与误判率。参考回答已生成 →
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
