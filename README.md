# Duration
## Install
`npm i --save @darkwolf/duration`
## Usage
```javascript
// ECMAScript
import Duration from '@darkwolf/duration'
// CommonJS
const Duration = require('@darkwolf/duration')

`${new Duration('1 year 1 quarter 1 month 1 week 1 day 23 hours 59 minutes 59 seconds 999 milliseconds 999 microseconds 999 nanoseconds')}` // => 'P1Y1Q1M1W1DT23H59M59.999999999S'
`${new Duration('P1Y1Q1M1W1DT23H59M59.999999999S')}` // => 'P1Y1Q1M1W1DT23H59M59.999999999S'
`${new Duration()
  .addYears(1)
  .addQuarters(1)
  .addMonths(1)
  .addWeeks(1)
  .addDays(1)
  .addHours(23)
  .addMinutes(59)
  .addSeconds(59)
  .addMillis(999)
  .addMicros(999)
  .addNanos(999)
}` // => 'P1Y1Q1M1W1DT23H59M59.999999999S'
`${Duration.from({
  years: 1,
  quarters: 1,
  months: 1,
  weeks: 1,
  days: 1,
  hours: 23,
  minutes: 59,
  seconds: 59,
  milliseconds: 999,
  microseconds: 999,
  nanoseconds: 999
})}` // => 'P1Y1Q1M1W1DT23H59M59.999999999S'
```
## [API Documentation](https://github.com/Darkwolf/node-duration/blob/master/docs/API.md)
## Contact Me
#### GitHub: [@PavelWolfDark](https://github.com/PavelWolfDark)
#### Telegram: [@PavelWolfDark](https://t.me/PavelWolfDark)
#### Email: [PavelWolfDark@gmail.com](mailto:PavelWolfDark@gmail.com)
