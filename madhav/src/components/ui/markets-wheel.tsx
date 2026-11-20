'use client';

import * as React from 'react';
import Image from 'next/image';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import styles from './markets-mobile.module.css';
import { WorksWheel, type WorksWheelItem } from '@/components/ui/works-wheel';

const markets: WorksWheelItem[] = [
  { title: 'E-commerce & Apparel', image: '/images/markets/ecommerce.webp', description: 'Mailers keep clothing and accessories together, from packing table to unboxing.' },
  { title: 'Retail & Displays', image: '/images/markets/retail.webp', description: 'Counter displays organise products and make small collections easy to browse in store.' },
  { title: 'Beauty & Personal Care', image: '/images/markets/beauty.webp', description: 'Fitted paper inserts separate bottles and jars while creating a tidy presentation.' },
  { title: 'Food & Produce', image: '/images/markets/food.webp', description: 'Open trays group produce for handling and presentation. Materials and food-contact suitability are confirmed for each use.' },
  { title: 'Beverages', image: '/images/markets/beverage.webp', description: 'Handled carriers and individual dividers keep bottles organised within a multipack.' },
  { title: 'Industrial Products', image: '/images/markets/industrial.webp', description: 'Corrugated partitions, pads and corners help support components inside an outer carton.' },
];

function MobileMarkets() {
  const [active, setActive] = React.useState(0);
  const scroller = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const goTo = (index: number) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: index * el.clientWidth, behavior: reduced ? 'instant' : 'smooth' });
  };

  return (
    <div className={styles.mobile} role="region" aria-roledescription="carousel" aria-label="Packaging applications by market">
      <div className={styles.choices} aria-label="Choose a market">
        {markets.map((market, index) => <button key={market.title} type="button" aria-pressed={active === index} aria-controls="mobile-market-slides" onClick={() => goTo(index)}>{market.title}</button>)}
      </div>
      <div id="mobile-market-slides" ref={scroller} className={styles.slides} onScroll={(event) => {
        const el = event.currentTarget;
        setActive(Math.min(markets.length - 1, Math.max(0, Math.round(el.scrollLeft / (el.clientWidth || 1)))));
      }}>
        {markets.map((market, index) => (
          <article key={market.title} className={styles.slide} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${markets.length}`} aria-hidden={active !== index}>
            <div className={styles.image}><Image src={market.image} alt={market.title} fill sizes="(max-width: 767px) 90vw, 1px" className="object-contain" /></div>
            <h3>{market.title}</h3><p>{market.description}</p>
          </article>
        ))}
      </div>
      <div className={styles.controls}>
        <span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, '0')} / {String(markets.length).padStart(2, '0')}</span>
        <span className={styles.swipe}>Swipe to explore</span>
        <div><button type="button" aria-label="Previous market" disabled={active === 0} onClick={() => goTo(active - 1)}>←</button><button type="button" aria-label="Next market" disabled={active === markets.length - 1} onClick={() => goTo(active + 1)}>→</button></div>
      </div>
    </div>
  );
}

export function MarketsWheel() {
  return (
    <section id="markets" aria-labelledby="markets-title" className="scroll-mt-16 border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 pt-10 sm:px-10 sm:pt-20 md:flex-row md:items-end md:justify-between">
        <div><p className="mb-4 text-xs text-slate-500">Packaging in everyday business</p><h2 id="markets-title" className="text-[28px] sm:text-4xl font-normal tracking-tight leading-tight text-slate-800">Different markets.<br />A place for every box.</h2></div>
        <p className="max-w-md text-sm leading-relaxed text-slate-500">From a parcel at your doorstep to a display on a shop counter, see how corrugated packaging works across different products.</p>
      </div>
      <a href="#packaging-gallery" className="sr-only focus:not-sr-only focus:block focus:p-4">Skip market showcase</a>
      <MobileMarkets />
      <div className="hidden md:block mx-auto max-w-[1440px] h-[720px] lg:h-[780px]">
        <WorksWheel items={markets} label="Packaging in use" action="" className="h-full" />
      </div>
      <p className="mx-auto max-w-7xl px-6 pb-8 text-xs text-slate-400 sm:px-10">Illustrative applications. Packaging structure and material suitability depend on your product.</p>
    </section>
  );
}
