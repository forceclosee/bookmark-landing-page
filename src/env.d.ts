/**
 * utility to make attribute required
 *
 * @example
 * to make "href" and "target" required
 * ```tsx
 * interface Props extends MakeRequired<HTMLAttributes<"a">, "href" | "target"> {custom props here};
 * ```
 * or
 * ```tsx
 * type Props = RequireAttributes<HTMLAttributes<"a">, "href" | "target"> & {custom props here};
 * ```
 */
type RequireAttributes<T, K extends keyof T> = Omit<T, K> &
	Required<Pick<T, K>>;
