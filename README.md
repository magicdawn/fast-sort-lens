# fast-sort-lens

> API wrapper around fast-sort

[![Build Status](https://img.shields.io/github/actions/workflow/status/magicdawn/fast-sort-lens/ci.yml?style=flat-square&branch=main)](https://github.com/magicdawn/fast-sort-lens/actions/workflows/ci.yml)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/fast-sort-lens.svg?style=flat-square)](https://codecov.io/gh/magicdawn/fast-sort-lens)
[![npm version](https://img.shields.io/npm/v/fast-sort-lens.svg?style=flat-square)](https://www.npmjs.com/package/fast-sort-lens)
[![npm downloads](https://img.shields.io/npm/dm/fast-sort-lens.svg?style=flat-square)](https://www.npmjs.com/package/fast-sort-lens)
[![npm license](https://img.shields.io/npm/l/fast-sort-lens.svg?style=flat-square)](http://magicdawn.mit-license.org)

<img src="https://github.com/magicdawn/fast-sort-lens/assets/4067115/bf686315-1c51-4da0-9dee-3c591a2c52ab" width="700" />

## Install

```sh
$ pnpm add fast-sort-lens
```

## API

```ts
import { fastOrderBy, fastSortWithRules } from 'fast-sort-lens'
```

### `fastOrderBy`

just like lodash.orderBy or `es-toolkit.orderBy` API spec.

```ts
const list = [
  { id: 1, name: 'a' },
  { id: 1, name: 'c' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
  { id: 3, name: 'a' },
]

expect(fastOrderBy(list, ['id', 'name'], ['desc', 'desc'])).toEqual([
  { id: 3, name: 'c' },
  { id: 3, name: 'a' },
  { id: 2, name: 'b' },
  { id: 1, name: 'c' },
  { id: 1, name: 'a' },
])
```

### `fastSortWithRules`

```ts
const list = [
  { id: 1, name: 'a' },
  { id: 1, name: 'c' },
  { id: 2, name: 'b' },
  { id: 3, name: 'c' },
  { id: 3, name: 'a' },
]

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
```

## Changelog

See [Releases](https://github.com/magicdawn/fast-sort-lens/releases)

## License

the MIT License http://magicdawn.mit-license.org
