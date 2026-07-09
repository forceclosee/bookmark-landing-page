/**
 * utility to make attribute required
 *
 * @example
 * ```tsx
 * interface Props extends MakeRequired<HTMLAttributes<"a">, "href" | "target"> {}
 * ```
 */
type RequireAttributes<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;
