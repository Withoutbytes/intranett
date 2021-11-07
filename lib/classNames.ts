export function classNames(...classes: (string | any | false)[]) {
    return classes.filter(Boolean).join(' ')
}