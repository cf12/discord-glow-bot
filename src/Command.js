class Command {
  constructor (options, runFunc, ) {
    if (typeof options !== 'object') throw Error('Command options must be object')

    if (!options.prefix) throw Error('Command must contain string prefix: options.prefix')
    if (!options.command) throw Error('Command must contain string command name: options.command')

    this.prefix = options.prefix
    this.command = options.command
    this.shortdesc = options.desc || ''
    this.longdesc = options.desc || ''
  }

  run () {
    if (!this.run) console.error(`Command ${this.prefix}${this.command} does not have a run function`)
    else this.run()
  }
}
