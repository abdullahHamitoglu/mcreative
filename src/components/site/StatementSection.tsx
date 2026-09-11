import React from 'react'
import { Reveal } from './Reveal'
import { R } from './tokens'
import type { HomepageData } from './types'

export function StatementSection({ statement }: { statement: HomepageData['statement'] }) {
  const highlightIndex = statement.highlight ? statement.quote.indexOf(statement.highlight) : -1
  const before = highlightIndex >= 0 ? statement.quote.slice(0, highlightIndex) : statement.quote
  const after = highlightIndex >= 0 ? statement.quote.slice(highlightIndex + statement.highlight.length) : ''

  return (
    <section className="relative z-10 px-5 py-10 sm:px-8">
      <Reveal className="mx-auto max-w-[1152px]">
        <div
          className="flex flex-col items-center gap-4 p-11 text-center sm:p-14"
          style={{ borderRadius: R.card, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.11)' }}
        >
          <p className="m-0 max-w-[52ch] text-[clamp(20px,3.4vw,30px)] font-bold leading-relaxed text-white">
            {highlightIndex >= 0 ? (
              <>
                {before}
                <strong className="text-[#c3d830]">{statement.highlight}</strong>
                {after}
              </>
            ) : (
              statement.quote
            )}
          </p>
          <p className="text-sm font-semibold text-[#518de5]">— {statement.cite}</p>
        </div>
      </Reveal>
    </section>
  )
}
