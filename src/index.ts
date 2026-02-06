import { sort } from 'fast-sort'
export { sort } from 'fast-sort'

export type FastSortRule<T> = {
  prop: keyof T | ((it: T) => any)
  order: 'asc' | 'desc' | ((a: any, b: any) => number)
}

/**
 * just like _.orderBy API spec, (_: lodash / es-toolkit)
 */
export function fastOrderBy<T>(list: T[], props: FastSortRule<T>['prop'][], orders: FastSortRule<T>['order'][]) {
  if (props.length !== orders.length) {
    throw new Error('props & orders length not match')
  }

  const _by = props.map((prop, index) => {
    const order = orders[index]
    if (order === 'asc') return { asc: prop }
    else if (order === 'desc') return { desc: prop }
    return { asc: prop, comparer: order }
  })

  return sort(list).by(_by)
}

export function fastSortWithRules<T>(list: T[], rules: FastSortRule<T>[]) {
  const _by = rules.map(({ order, prop }) => {
    if (order === 'asc') return { asc: prop }
    else if (order === 'desc') return { desc: prop }
    return { asc: prop, comparer: order }
  })
  return sort(list).by(_by)
}
