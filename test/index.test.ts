import { createFinderSortKeyComparator, getFinderSortKey } from '@magicdawn/finder-sort'
import { describe, expect, it } from 'vitest'
import { fastOrderBy, fastSortWithRules } from '../src'

const list = [
  { id: 1, name: 'a' },
  { id: 1, name: 'c' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
  { id: 3, name: 'a' },
]

describe('_.orderBy spec', () => {
  it('it works', () => {
    expect(fastOrderBy(list, ['id'], ['asc'])).toEqual([
      { id: 1, name: 'a' },
      { id: 1, name: 'c' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
      { id: 3, name: 'a' },
    ])

    expect(fastOrderBy(list, ['id', 'name'], ['desc', 'desc'])).toEqual([
      { id: 3, name: 'c' },
      { id: 3, name: 'a' },
      { id: 2, name: 'b' },
      { id: 1, name: 'c' },
      { id: 1, name: 'a' },
    ])
  })
})

describe('fastSortWithRules spec', () => {
  it('it works', () => {
    expect(fastSortWithRules(list, [{ prop: 'id', order: 'asc' }])).toEqual([
      { id: 1, name: 'a' },
      { id: 1, name: 'c' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
      { id: 3, name: 'a' },
    ])

    expect(
      fastSortWithRules(list, [
        { prop: 'id', order: 'desc' },
        { prop: 'name', order: 'desc' },
      ]),
    ).toEqual([
      { id: 3, name: 'c' },
      { id: 3, name: 'a' },
      { id: 2, name: 'b' },
      { id: 1, name: 'c' },
      { id: 1, name: 'a' },
    ])
  })

  it('works with @magicdawn/finder-sort', () => {
    const list = [
      { file: '啊.txt', val: 1 },
      { file: '啊.txt', val: 2 },
      { file: '包青天/1.mp4', val: 1 },
      { file: '包青天/1.mp4', val: 2 },
    ]

    {
      const sorted = fastSortWithRules(list, [
        {
          prop: (item) => getFinderSortKey(item.file),
          order: createFinderSortKeyComparator('zh-CN'),
        },
        { prop: 'val', order: 'desc' },
      ])
      expect(sorted).toEqual([
        { file: '啊.txt', val: 2 },
        { file: '啊.txt', val: 1 },
        { file: '包青天/1.mp4', val: 2 },
        { file: '包青天/1.mp4', val: 1 },
      ])
    }

    {
      const sorted = fastSortWithRules(list, [
        {
          prop: (item) => getFinderSortKey(item.file, true),
          order: createFinderSortKeyComparator('zh-CN'),
        },
        { prop: 'val', order: 'asc' },
      ])
      expect(sorted).toEqual([
        { file: '包青天/1.mp4', val: 1 },
        { file: '包青天/1.mp4', val: 2 },
        { file: '啊.txt', val: 1 },
        { file: '啊.txt', val: 2 },
      ])
    }
  })
})
