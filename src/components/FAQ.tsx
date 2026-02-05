import type { FAQItem } from '../content/faq'

const FAQ = ({ items }: { items: FAQItem[] }) => {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <details key={item.question} className="section-card group p-5">
          <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-slate-800">
            {item.question}
            <span className="text-brand-cyan transition group-open:rotate-180">▾</span>
          </summary>
          <p className="mt-3 text-sm text-slate-600">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

export default FAQ
