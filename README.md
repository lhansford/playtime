# Playtime

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/playtime.svg)](https://npmjs.org/package/playtime)
[![Downloads/week](https://img.shields.io/npm/dw/playtime.svg)](https://npmjs.org/package/playtime)
[![License](https://img.shields.io/npm/l/playtime.svg)](https://github.com/lhansford/playtime/blob/master/package.json)

A command line tool for earning and spending your leisure time. Spend some time doing a more "virtuous"
task (e.g. study Chinese for 30 minutes or work on the book for 2 hours) and convert that into
minutes you can use later to do something a little less "productive" (like playing computer games or
binge watching that new series).

![Adding play time example](example.gif)

- [Playtime](#playtime)
  - [Usage](#usage)
  - [Commands](#commands)
    - [`playtime add`](#playtime-add)
    - [`playtime use`](#playtime-use)
    - [`playtime ls`](#playtime-ls)
  - [Configuration](#configuration)
    - [Config Directory](#config-directory)
    - [Custom times / time modifiers](#custom-times--time-modifiers)
  - [Inspiration / Concept](#inspiration--concept)
  - [Development](#development)
    - [Releasing](#releasing)

## Usage

```sh-session
$ npm install -g playtime
$ playtime COMMAND
running command...
$ playtime (-v|--version|version)
playtime/0.0.1 darwin-x64 node-v14.7.0
$ playtime --help [COMMAND]
USAGE
  $ playtime COMMAND
...
```

## Commands

### `playtime add`

Add time spent on an activity in order to earn play time.

```sh
$ playtime add
# You'll be prompted to enter a time source and amount of time spent.
> 5 minutes added. 25 minutes of play time now available.
```

_See code: [src/commands/add.ts](https://github.com/lhansford/playtime/blob/main/src/commands/add.ts)_

### `playtime use`

Use play time that you've previously earned.

```sh
$ playtime use
# You'll be prompted to enter the time to use
> 5 minutes used. 20 minutes remaining.
```

_See code: [src/commands/add.ts](https://github.com/lhansford/playtime/blob/main/src/commands/add.ts)_

### `playtime ls`

Show how much playtime you've previously earned.

```sh
$ playtime ls
> 5 minutes of play time available
```

_See code: [src/commands/add.ts](https://github.com/lhansford/playtime/blob/main/src/commands/add.ts)_

## Configuration

### Config Directory

The default config directory is `~/.playtime/`. You can set a custom directoy by adding the following
to your shell config:

```sh
PLAYTIME_DIR=/whatever/path/you/like
```

### Custom times / time modifiers

By default the times available 25 minutes, 50 minutes (both inspired by the Pomodoro Technique), and
90 minutes (inspired by [Cal Newport's Deep Work](https://www.calnewport.com/books/deep-work/)). The
90 minutes time has a modifier of 1.5 applied, so an extra 50% of play time is awarded.

You can add custom times (with optional modifiers) by editing the file `data.json` in the config
directory (see the [Config Directory section above](#config-directory) for more info). You can add
a `customTimes` field to the json with an array of objects containing a `minutes` field and an optional
`modifier` field. E.g.

```json
{
  "version":1,
  "availableTime":17,
  "timeSources":[{"name":"Study Spanish","modifier":0.2}],
  "customTimes": [
    { "minutes": 30 },
    { "minutes": 60, "modifier": 1.2 }
  ]
}
```

## Inspiration / Concept

Not surprisingly, this app was written on New Year's Eve as I reflected on some of my habits in 2020.
Two in particular stuck out. The first was that I was rarely spending my time doing "deep work". Some
of this was to blame on externalities - working from home full-time, adapting to having a first child,
my day job evolving into more of a management role, etc. - but the biggest difficulty I could identify
was that I rarely have a good trigger to start on deep work. When it comes down to the small, well-defined, surface
level task vs the large, ill-defined deep work, the former tends to be the default option.

The second issue, was much simpler - I'm really bad at regulating my leisure time! While it's not bad
enough to impact my relationships or work life, it does mean that when it comes to a choice between
working on a cool side project or playing that new video game, the latter tends to win. I don't want
to quit playing games, and I don't want to arbitrarily limit myself (I've tried this in the past and
it usually falls apart when the holidays come around and I've got a whole day free to spend on that
game no reason to cap it at 1 hour).

The objective then of `playtime` is to pit these two issues against each other in the hope of solving both.
Do deep work, enter it into `playtime`, and it gets transformed into time you can use later for
your leisure activities! It's still a somewhat arbitrary cap, but in the past I've found that systemising
habits in this way makes me more likely to stick to them.

## Development

### Releasing

Currently releasing is a manual process:

- Create a release branch from `main`
- Run `npm publish`
- Merge the branch back into `main` (the only change should be the version number)
