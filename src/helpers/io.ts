import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

import { CONFIG_DIR_ENV, VERSION } from '../constants';

export interface ITimeSource {
  name: string;
  modifier: number;
}

export interface ITime {
  minutes: number;
  modifier?: number;
}

interface IData {
  availableTime: number;
  version: number;
  timeSources: ITimeSource[];
  customTimes?: ITime[];
}

const DEFAULT_CONFIG_DIR = `${process.env.HOME}/.playtime`;
const DEFAULT_TIMES: ITime[] = [{ minutes: 25 }, { minutes: 60 }, { minutes: 90, modifier: 1.5 }];

export function getConfigDirectory(): string {
  const dir = process.env[CONFIG_DIR_ENV] || DEFAULT_CONFIG_DIR;
  if (process.env.NODE_ENV !== 'test' && !existsSync(dir)) {
    mkdirSync(dir);
  }
  return dir;
}

const getDataFilePath = (): string => `${getConfigDirectory()}/data.json`;

function writeDataFile(data: IData): void {
  writeFileSync(getDataFilePath(), JSON.stringify(data), {
    encoding: 'utf8',
    flag: 'w',
  });
}

function isCorrectVersion(data: IData): boolean {
  return data.version === VERSION;
}

export function readDataFile(): IData {
  if (!existsSync(getDataFilePath())) {
    writeDataFile({ version: VERSION, availableTime: 0, timeSources: [] });
  }
  const data = readFileSync(getDataFilePath());
  if (!isCorrectVersion) {
    throw new Error('The data version is incorrect.');
  }
  return JSON.parse(data.toString());
}

export function updateAvailableMinutes(amount: number): number {
  const data = readDataFile();
  const availableTime = data.availableTime + amount;
  writeDataFile({ ...data, availableTime });
  return availableTime;
}

export function getTimeSources(): ITimeSource[] {
  return readDataFile().timeSources;
}

export function addTimeSource(timeSource: ITimeSource): void {
  const data = readDataFile();
  writeDataFile({ ...data, timeSources: [...data.timeSources, timeSource] });
}

export function getTimes(): ITime[] {
  return readDataFile().customTimes || DEFAULT_TIMES;
}
