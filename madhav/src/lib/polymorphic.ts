import * as React from "react";

export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & { as?: C }> & Omit<React.ComponentPropsWithoutRef<C>, keyof Props | "as">;

export type PolymorphicComponentPropWithRef<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & { as?: C }> & Omit<React.ComponentPropsWithRef<C>, keyof Props | "as">;

export type PolymorphicComponent<C extends React.ElementType, Props = {}> = (
  props: PolymorphicComponentProp<C, Props>
) => React.ReactElement | null;

export type PolymorphicComponentWithRef<C extends React.ElementType, Props = {}> = (
  props: PolymorphicComponentPropWithRef<C, Props>
) => React.ReactElement | null;