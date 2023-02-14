const data = [
  { label: 'a', value: '1' },
  { label: 'b', value: '2' },
  { label: 'c', value: '3' },
  { label: 'd', value: '4' },
  { label: 'e', value: '5' },
] as const

type NoReadonly<T> = {
  -readonly [P in keyof T]: T[P] extends object ? NoReadonly<T[P]> : T[P]
}

type LabelValue = {
  label: string
  value: string
}

type Data = NoReadonly<typeof data>

type Child<T> = T extends Array<infer R extends LabelValue>
  ? { [P in R['label']]: PickValueByLabel<T, R, P> }
  : never

type PickValueByLabel<
  D extends T[],
  T extends LabelValue,
  L extends T['label']
> = D extends Array<infer R>
  ? R extends T
    ? L extends R['label']
      ? R['value']
      : never
    : never
  : never

const child = data.map((v) => [v.label, v.value])
const obj = Object.fromEntries(child) as Child<Data>

console.log(obj.b)

