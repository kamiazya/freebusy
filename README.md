# freebusy

Determine free blocks from a list of events.

## Description

It returns the free block within scope when you enter a list of events.

Redesign [raineorshine/freebusy](https://github.com/raineorshine/freebusy) with TypeScript.

## Feature

- Determine Free block

## Installation (not yet)

### yarn

```bash
yarn install @kamiazya/freebusy
```

### npm

```bash
npm install @kamiazya/freebusy
```

## Usage

Determine free blocks from a list of events and display result with [moment.js](http://momentjs.com/).

In this case, it detects free block when there are three events from 9 o'clock to 17 o'clock in 2019-01-10.

### Simple

```typescript
import moment from 'moment';
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
  events: events,
});

freeBlocks.blocks
  .forEach(block => {
    const formatedStart = moment(block.start).format('YYYY-MM-DD HH:mm');
    const formatedEnd = moment(block.end).format('HH:mm');
    console.log(`${formatedStart} - ${formatedEnd} is free.`);
  });

// Output:
//   2019-01-10 09:00 - 09:30 is free.
//   2019-01-10 10:00 - 12:00 is free.
//   2019-01-10 13:00 - 15:00 is free.
//   2019-01-10 16:00 - 17:00 is free.
```

## Todo

- [ ] add test
- [ ] add CI
- [ ] take coverage
- [ ] add badges

## Licence

This software is released under the MIT License, see LICENSE.
