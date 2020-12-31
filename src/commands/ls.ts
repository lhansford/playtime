import { Command } from '@oclif/command';

import { pluraliseMinutes } from '../helpers/formatting';

import { readDataFile } from '../helpers/io';

export default class List extends Command {
  static description = 'Lists the available amount of play time.';

  static examples = [
    `$ playtime ls
5 minutes of play time available
`,
  ];

  async run(): Promise<void> {
    const data = readDataFile();
    this.log(`${pluraliseMinutes(data.availableTime)} of play time available`);
  }
}
