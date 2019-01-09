import moment from 'moment';
import { getFree, BlockLike, ScopeTime } from '@kamiazya/freebusy';

function main() {

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
}

main();
