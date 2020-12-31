import { Command } from '@oclif/command';
import * as inquirer from 'inquirer';

import { pluraliseMinutes } from '../helpers/formatting';

import {
  addTimeSource,
  getTimes,
  getTimeSources,
  ITime,
  ITimeSource,
  updateAvailableMinutes,
} from '../helpers/io';

const ADD_SOURCE_STRING = 'Add a new source...';

async function addNewTimeSource(): Promise<ITimeSource> {
  const newTimeSource = await inquirer.prompt([
    {
      name: 'name',
      message: 'Add a name for the source:',
      type: 'input',
    },
    {
      name: 'modifier',
      message:
        'Set a modifier for the source (e.g. if the modifier is 0.1, then for every 60 minutes add for the time source you will receive 6 minutes of play time.',
      type: 'number',
    },
  ]);
  addTimeSource(newTimeSource);
  return newTimeSource;
}

function calculatePlaytime(time: ITime, timeSource: ITimeSource): number {
  return time.minutes * (time.modifier || 1) * timeSource.modifier;
}

export default class Add extends Command {
  static description = 'Add play time.';

  static examples = [`$ playtime add`];

  async run(): Promise<void> {
    const timeSources = getTimeSources();
    const times = getTimes();

    const answersTimeSource = await inquirer.prompt([
      {
        name: 'timeSource',
        message: 'Select a source for the time (or add a new one)',
        type: 'list',
        choices: [...timeSources, { name: 'Add a new source...' }],
      },
    ]);

    const timeSource =
      answersTimeSource.timeSource === ADD_SOURCE_STRING
        ? await addNewTimeSource()
        : timeSources.find(({ name }) => name === answersTimeSource.timeSource);

    if (!timeSource) {
      console.log(timeSources);
      throw new Error('Could not match the time sources.');
    }

    const answersTime = await inquirer.prompt([
      {
        name: 'time',
        message: 'Select an amount of time to add',
        type: 'list',
        choices: getTimes().map((time) => ({
          value: time.minutes,
          name: `${pluraliseMinutes(time.minutes)} (for ${pluraliseMinutes(
            calculatePlaytime(time, timeSource),
          )} of play time)`,
        })),
      },
    ]);

    const time = times.find(({ minutes }) => minutes === answersTime.time);

    if (!time) {
      throw new Error('Could not match the times.');
    }

    const availableTime = updateAvailableMinutes(calculatePlaytime(time, timeSource));
    this.log(
      `${answersTime.time} minutes added. ${availableTime} minutes of play time now available.`,
    );
  }
}
