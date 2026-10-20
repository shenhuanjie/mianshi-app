import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { CheckCircle2 } from 'lucide-react'

// Supabase 项目 mianshi-agent（新加坡区）
// 使用 publishable key + RLS：仅允许插入，读取仅限 Supabase 后台导出
const SUPABASE_URL = 'https://fwwivnhfcsgfbfahwfaf.supabase.co'
const SUPABASE_KEY =
  'sb_publishable_WNPtHMHpew1E43JA0C1YXg_LAe9OuLI'

const ROLES = ['后端开发', '前端开发', '算法 / AI', '产品经理', '运营', '测试', '其他岗位']
const YEARS = ['应届 / 1 年以内', '1–3 年', '3–5 年', '5 年以上']
const STATUSES = [
  '正在求职，急需面试',
  '在职观望，随时可能跳',
  '暂时不看机会，先备着',
  '帮朋友 / 帮学生看',
]
const WILLINGNESS = [
  { value: 'yes', label: '确定会付费' },
  { value: 'maybe', label: '看试用效果决定' },
  { value: 'no', label: '不会付费' },
]

async function fetchLeadCount(): Promise<number> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/lead_count`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  })
  if (!res.ok) throw new Error('count failed')
  const data = await res.json()
  return typeof data === 'number' ? data : 0
}

async function saveLead(lead: {
  role: string
  years: string
  status: string
  contact: string
  willingness: string
}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
  })
  if (!res.ok) throw new Error(`save failed: ${res.status}`)
}

export default function LeadForm() {
  const [role, setRole] = useState('')
  const [years, setYears] = useState('')
  const [status, setStatus] = useState('')
  const [contact, setContact] = useState('')
  const [willingness, setWillingness] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    fetchLeadCount()
      .then(setTotal)
      .catch(() => setTotal(null))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role || !years || !status || !contact.trim() || !willingness) {
      setError('请把表单填完整——尤其是付费意愿那一题，我们最想知道。')
      return
    }
    setSubmitting(true)
    setError('')
    const lead = {
      role,
      years,
      status,
      contact: contact.trim(),
      willingness,
    }
    try {
      await saveLead(lead)
      setTotal((t) => (t === null ? null : t + 1))
      setSubmitted(true)
    } catch {
      setError('提交失败，请检查网络后重试，或加微信 mianshi-agent 预约。')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="lead" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="glow-red mx-auto max-w-lg rounded-2xl border border-primary/40 bg-card p-10 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-5 text-2xl font-bold">预约成功</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            你已进入内测队列。我们按批次发出邀请，
            届时会通过你留下的联系方式联系你。
          </p>
          <p className="mt-6 rounded-lg bg-secondary/60 px-4 py-3 text-xs text-muted-foreground">
            内测邀请发出时，会同步附上 3 次免费深度面试额度——练完觉得没用，直接告诉我们为什么。
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="lead" className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-lg">
        <h2 className="text-balance text-center text-2xl sm:text-3xl font-bold tracking-tight">
          锁定首批内测名额
        </h2>
        <p className="mt-3 text-center text-sm text-muted-foreground">
          留 30 秒信息，换一整个求职季的免费陪练。
          {total !== null && (
            <>
              {' '}已有 <span className="font-bold text-primary">{total}</span> 人预约。
            </>
          )}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="role">目标岗位</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="选择你要面试的岗位" />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">工作年限</Label>
            <Select value={years} onValueChange={setYears}>
              <SelectTrigger id="years">
                <SelectValue placeholder="选择工作年限" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">当前状态</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id="status">
                <SelectValue placeholder="选择当前状态" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">联系方式（微信 或 邮箱）</Label>
            <Input
              id="contact"
              placeholder="用于接收内测邀请"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <Label>灵魂一问：如果定价 ¥128 / 求职季，你会付费吗？</Label>
            <RadioGroup value={willingness} onValueChange={setWillingness}>
              {WILLINGNESS.map((w) => (
                <label
                  key={w.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                    willingness === w.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-background hover:border-primary/40'
                  }`}
                >
                  <RadioGroupItem value={w.value} />
                  {w.label}
                </label>
              ))}
            </RadioGroup>
          </div>

          {error && <p className="text-xs text-primary">{error}</p>}

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? '提交中…' : '提交预约'}
          </Button>
          <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
            提交即视为同意：联系方式仅用于内测邀请，可随时要求删除。
          </p>
        </form>
      </div>
    </section>
  )
}
