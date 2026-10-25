"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SubgridSectionProps {
  children: React.ReactNode;
  className?: string;
  columns?: number | "auto-fit" | "auto-fill";
  minColumnWidth?: string;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  alignRows?: boolean;
  as?: React.ElementType;
}

export function SubgridSection({
  children,
  className,
  columns = "auto-fit",
  minColumnWidth = "280px",
  gap = "var(--grid-gap, 1.5rem)",
  rowGap,
  columnGap,
  alignRows = true,
  as: Component = "section",
}: SubgridSectionProps) {
  const columnTemplate =
    columns === "auto-fit" || columns === "auto-fill"
      ? `repeat(${columns}, minmax(${minColumnWidth}, 1fr))`
      : `repeat(${columns}, 1fr)`;

  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn("subgrid-section", className)}
      style={{
        gridTemplateColumns: columnTemplate,
        gap: gap,
        rowGap,
        columnGap,
      } as React.CSSProperties}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child as React.ReactElement<any>, {
          className: cn(
            (child.props as any).className,
            alignRows ? "subgrid-card" : ""
          ),
        });
      })}
    </Comp>
  );
}

interface FeatureGridProps {
  children: React.ReactNode;
  className?: string;
  minCardWidth?: string;
  gap?: string;
  as?: React.ElementType;
}

export function FeatureGrid({
  children,
  className,
  minCardWidth = "300px",
  gap = "var(--grid-gap, 1.5rem)",
  as: Component = "div",
}: FeatureGridProps) {
  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn("feature-grid", className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`,
        gap,
      } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}

interface FeatureCardProps {
  children?: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  link?: React.ReactNode;
  as?: React.ElementType;
}

export function FeatureCard({
  children,
  className,
  icon,
  title,
  description,
  link,
  as: Component = "article",
}: FeatureCardProps) {
  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn("feature-card", className)}
      style={{
        gridTemplateRows: "auto auto 1fr auto",
        gap: "var(--spacing-md, 1rem)",
        padding: "var(--spacing-lg, 1.5rem)",
      } as React.CSSProperties}
    >
      {icon && <div className="feature-card__icon">{icon}</div>}
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>
      {link && <div className="feature-card__link">{link}</div>}
      {children}
    </Comp>
  );
}

interface PricingGridProps {
  children: React.ReactNode;
  className?: string;
  minCardWidth?: string;
  gap?: string;
  as?: React.ElementType;
}

export function PricingGrid({
  children,
  className,
  minCardWidth = "280px",
  gap = "var(--grid-gap, 1.5rem)",
  as: Component = "div",
}: PricingGridProps) {
  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn("pricing-grid", className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`,
        gap,
        alignItems: "start",
      } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}

interface PricingCardProps {
  children?: React.ReactNode;
  className?: string;
  name: React.ReactNode;
  price: React.ReactNode;
  period?: React.ReactNode;
  features: React.ReactNode;
  cta: React.ReactNode;
  as?: React.ElementType;
}

export function PricingCard({
  children,
  className,
  name,
  price,
  period,
  features,
  cta,
  as: Component = "article",
}: PricingCardProps) {
  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn("pricing-card", className)}
      style={{
        gridTemplateRows: "auto auto auto 1fr auto",
        gap: "var(--spacing-md, 1rem)",
        padding: "var(--spacing-xl, 2rem)",
      } as React.CSSProperties}
    >
      <div className="pricing-card__name">{name}</div>
      <div className="pricing-card__price">{price}</div>
      {period && <div className="pricing-card__period">{period}</div>}
      <div className="pricing-card__features">{features}</div>
      <div className="pricing-card__cta">{cta}</div>
      {children}
    </Comp>
  );
}

interface ArticleGridProps {
  children: React.ReactNode;
  className?: string;
  minCardWidth?: string;
  gap?: string;
  as?: React.ElementType;
}

export function ArticleGrid({
  children,
  className,
  minCardWidth = "320px",
  gap = "var(--grid-gap, 1.5rem)",
  as: Component = "div",
}: ArticleGridProps) {
  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn("article-grid", className)}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`,
        gap,
      } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}

interface ArticleCardProps {
  children?: React.ReactNode;
  className?: string;
  image: React.ReactNode;
  meta: React.ReactNode;
  excerpt: React.ReactNode;
  link: React.ReactNode;
  as?: React.ElementType;
}

export function ArticleCard({
  children,
  className,
  image,
  meta,
  excerpt,
  link,
  as: Component = "article",
}: ArticleCardProps) {
  const Comp: React.ComponentType<any> = Component as any;

  return (
    <Comp
      className={cn("article-card", className)}
      style={{
        gridTemplateRows: "auto auto 1fr auto",
        gap: "var(--spacing-md, 1rem)",
      } as React.CSSProperties}
    >
      <div className="article-card__image">{image}</div>
      <div className="article-card__meta">{meta}</div>
      <div className="article-card__excerpt">{excerpt}</div>
      <div className="article-card__link">{link}</div>
      {children}
    </Comp>
  );
}