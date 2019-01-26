[![Codacy Badge](https://api.codacy.com/project/badge/Grade/08cca3a1cc7c48fd91e9e9abea307e0c)](https://app.codacy.com/app/kamiazya/freebusy?utm_source=github.com&utm_medium=referral&utm_content=kamiazya/freebusy&utm_campaign=Badge_Grade_Dashboard) [![Maintainability](https://api.codeclimate.com/v1/badges/45b4f1f243a6fc8efd32/maintainability)](https://codeclimate.com/github/kamiazya/freebusy/maintainability) [![CodeFactor](https://www.codefactor.io/repository/github/kamiazya/freebusy/badge)](https://www.codefactor.io/repository/github/kamiazya/freebusy) [![Build Status](https://travis-ci.org/kamiazya/freebusy.svg?branch=master)](https://travis-ci.org/kamiazya/freebusy) [![codecov](https://codecov.io/gh/kamiazya/freebusy/branch/master/graph/badge.svg)](https://codecov.io/gh/kamiazya/freebusy) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkamiazya%2Ffreebusy.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkamiazya%2Ffreebusy?ref=badge_shield) [![npm version](https://badge.fury.io/js/%40kamiazya%2Ffreebusy.svg)](https://badge.fury.io/js/%40kamiazya%2Ffreebusy) [![BCH compliance](https://bettercodehub.com/edge/badge/kamiazya/freebusy?branch=master)](https://bettercodehub.com/)

# freebusy

Determine free blocks from a list of events.

## Description

It returns the free block within scope when you enter a list of events.

Redesign [raineorshine/freebusy](https://github.com/raineorshine/freebusy) with TypeScript.

[![https://nodei.co/npm/@kamiazya/freebusy.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/@kamiazya/freebusy.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@kamiazya/freebusy)

## Installation

### yarn

```bash
yarn add @kamiazya/freebusy
```

### npm

```bash
npm install @kamiazya/freebusy
```

## Usage

Determine free blocks from a list of events.

Format result by [luxon](https://moment.github.io/luxon/).

### Simple

In this case, it detects free block when there are three events from 9 o'clock to 17 o'clock in 2019-01-10.

```typescript
import { getFree, BlockLike, ScopeTime } from '@kamiazya/freebusy';

const events: BlockLike[] = [
  {
    start: '2019-01-10T09:30',
    end: '2019-01-10T10:00',
  },
  {
    start: '2019-01-10T12:00',
    end: '2019-01-10T13:00',
  },
  {
    start: '2019-01-10T15:00',
    end: '2019-01-10T16:00',
  },
];

const freeBlocks = getFree({
  scope: {
    start: '2019-01-10',
    end: '2019-01-11',
    time: new ScopeTime({
      defaultStart: 9,
      defaultEnd: 17,
    }),
  },
  events,
});

freeBlocks.blocks
  .forEach((block) => {
    const start = block.start.toFormat('DDD T');
    const end = block.end.toFormat('T');
    console.log(`${start} - ${end}`);
  });

// Output:
//   2019年1月10日 9:00 - 9:30
//   2019年1月10日 10:00 - 12:00
//   2019年1月10日 13:00 - 15:00
//   2019年1月10日 16:00 - 17:00
```

## Licence

This software is released under the MIT License, see LICENSE.

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fkamiazya%2Ffreebusy.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fkamiazya%2Ffreebusy?ref=badge_large)
