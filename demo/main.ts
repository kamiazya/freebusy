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
