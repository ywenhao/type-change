const res = defineRes([
  { label: 'a', value: '1', getData: () => ['a', '1'] },
  { label: 'b', value: '2', getData: () => ['b', '2'] },
])

function defineRes<T extends ResValue[]>(res: ResOption<T>) {
  return res
}

type LabelValue = {
  label: string
  value: string
}

interface ResValue extends LabelValue {
  getData(): [ResValue['label'], ResValue['value']]
}

type GetData<T extends ResValue> = Exclude<T, 'getData'> & {
  getData(): [T['label'], T['value']]
}

type ResOption<T extends ResValue[]> = {
  [P in keyof T]: GetData<T[P]>
}
