import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQS = [
  {
    q: '和背题、刷题库类 App 有什么区别？',
    a: '题库是"你背它问"，我们是"你答它追问"。AI 面试官会根据你的回答层层深入，模拟真实面试中"面试官起了疑心继续挖"的场景。真实面试里挂掉的人，几乎都是倒在追问上，而不是死在第一题。',
  },
  {
    q: '评估报告靠谱吗？',
    a: '报告基于完整面试上下文生成，逐题定位问题层级。内测期间我们也在持续校准评分模型——这正是需要内测用户的原因。你的每次反馈都会让评分更准。',
  },
  {
    q: '我的简历和面试内容安全吗？',
    a: '数据仅用于生成你的面试报告，加密存储，可随时删除。我们不出售、不共享任何用户数据，这也是付费产品的底线。',
  },
  {
    q: '支持语音面试吗？',
    a: '第一期以文字面试为主，保证追问质量和报告准确度。语音面试已在路线图上，内测用户将优先免费体验。',
  },
  {
    q: '内测需要付费吗？',
    a: '不需要。内测期间全部功能免费，预约后我们按批次发出邀请。我们只需要你诚实反馈：练完是否真的有帮助、定价是否合理。',
  },
]

export default function Faq() {
  return (
    <section id="faq" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-16 sm:py-20">
        <h2 className="text-center text-2xl sm:text-3xl font-bold tracking-tight">
          你可能想问
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-[15px] hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
