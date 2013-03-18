meteor-scheduler
================

A simple drop-in job scheduler for meteor apps.

## Installation:

Drop the scheduler.js file into your meteor app's server directory.

## Usage:

### add_job(name, wait, callback, options)

Adds a named job to the list of scheduled jobs, if name already exists, it will replace the existing entry.

Parameters:
 * *name*: The name to store the schedule under (unique).
 * *wait*: Delay in milliseconds before the job will be run again.
 * *callback*: The function to be called when the job is to be run.
 * *options*: Parameters to pass into callback. Will appear as `this.options` inside callback function.

You may specify a different "first run" wait time by supplying `options.first`.

### stop_job(name)

Stops and removes a job named `name`.

### trigger_job(name)

Schedules job named `name` for immediate execution.

## Example:

To add a job, simply call:

    add_job('hello_world', 2500, function() {
      console.log("Hello world!");
    })

Then to cancel it later:

    stop_job('hello_world')

## License:

Project code is released under CC0 license:

<a rel="license" href="http://creativecommons.org/publicdomain/zero/1.0/">
<img src="http://i.creativecommons.org/p/zero/1.0/88x31.png" style="border-style: none;" alt="CC0" />
</a>
