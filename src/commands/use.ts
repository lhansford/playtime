import { Command } from '@oclif/command';
import * as inquirer from 'inquirer';

import { pluraliseMinutes } from '../helpers/formatting';
import { readDataFile, updateAvailableMinutes } from '../helpers/io';

export default class Use extends Command {
  static description = 'Use play time';

  static examples = [`$ gt use`];

  async run(): Promise<void> {
    const answer = await inquirer.prompt([
      {
        name: 'amount',
        message: `How many minutes of play time do you want to use? (${pluraliseMinutes(
          readDataFile().availableTime,
        )} available)`,
        type: 'number',
      },
    ]);

    updateAvailableMinutes(-answer.amount);
    this.log(
      `${pluraliseMinutes(answer.amount)} used. ${pluraliseMinutes(
        readDataFile().availableTime,
      )} remaining.`,
    );
  }
}
