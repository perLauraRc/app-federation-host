/** Utility function to dynamically construct concatenated class names for HTML elements.
/** Arguments: It accepts a variable number of arguments of any type.
/** Filters out falsy values from the passed class names: (e.g., false, null, undefined, 0, NaN, or an empty string)
/** Returns a single string with the remaining truthy class names joined by spaces.
/**/
export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}
