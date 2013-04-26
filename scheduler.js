var _scheduled_jobs = {};

add_job = function add_job(name, every, callback, options) {
	if ('string' !== typeof name) {
		console.log('Must supply name for job');
		return;
	}

	every = Math.floor(every);
	if (!every || every < 250) {
		console.log('Interval for job', name, 'must be greater than 250ms');
		return;
	}

	if ('function' !== typeof callback) {
		console.log('Did not supply callback function for', name, 'task, to be run every', every, 'ms');
		return;
	}

	var now = +(new Date),
		first = options&&options.first ? options.first : every;

	_scheduled_jobs[name] = {
		last_run: now,
		duration: 0,
		every: every,
		running: false,
		next_run: now + first,
		callback: callback,
		options: options
	};
}

stop_job = function stop_job(name) {
	delete _scheduled_jobs[name];
}

trigger_job = function trigger_job(name) {
	if (_scheduled_jobs[name]) {
		_scheduled_jobs[name].next_run = 0;
	}
}

function run_jobs() {
	var now = +(new Date), later;
	for (var name in _scheduled_jobs) {
		if (_scheduled_jobs.hasOwnProperty(name)) {
			var job = _scheduled_jobs[name];
			if (now >= job.next_run && !job.running) {
				job.running = true;
				try {
					job.callback();
				}
				catch (ex) {
					console.log('Exception running job', name);
					dump(ex);

					if (ex.stack) {
						dump(ex.stack);
					}
				}
				later = +(new Date);
				job.duration = later - now;
				job.last_run = now
				job.next_run = now + job.every;
				job.running = false;

				if (job.duration > 3500) {
					console.log('Job', name, 'took', job.duration, 'ms');
				}
				now = later;
			}
		}
	}
}

Meteor.setInterval(run_jobs, 250);
