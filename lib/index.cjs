const {
  ObjectCreate,
  ObjectDefineProperties,
  ObjectEntries,
  ObjectValues,
  FunctionPrototypeApply,
  FunctionPrototypeBind,
  FunctionPrototypeSymbolHasInstance,
  Symbol,
  SymbolToPrimitive,
  SymbolToStringTag,
  RangeError,
  SyntaxError,
  TypeError,
  Number,
  NumberIsFinite,
  NumberIsNaN,
  NumberPrototypeToFixed,
  MathCeil,
  MathFloor,
  MathRound,
  MathTrunc,
  Date,
  DatePrototypeGetTime,
  String,
  StringPrototypeIncludes,
  StringPrototypeMatch,
  StringPrototypePadStart,
  StringPrototypeSlice,
  StringPrototypeToLowerCase,
  StringPrototypeTrim,
  StringPrototypeSafeMatchAll,
  ArrayIsArray,
  ArrayPrototypeForEach,
  ReflectSetPrototypeOf,
  PrimitivesIsString,
  InstancesIsDate,
  TypesIsPlainObject,
  TypesToNumber
} = require('@darkwolf/primordials')

const secondsSymbol = Symbol('seconds')
const nanosecondsSymbol = Symbol('nanoseconds')
const addSymbol = Symbol('add')
const subtractSymbol = Symbol('subtract')
const convertToSymbol = Symbol('convertTo')
const toStringSymbol = Symbol('toString')
const valueOfSymbol = Symbol('valueOf')

const POSITIVE_CHAR = '+'
const NEGATIVE_CHAR = '-'
const SEPARATOR_CHAR = '.'

const NANOSECONDS_PER_MICROSECOND = 1e3
const MICROSECONDS_PER_MILLISECOND = 1e3
const MILLISECONDS_PER_SECOND = 1e3
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const HOURS_PER_DAY = 24
const DAYS_PER_WEEK = 7
const DAYS_PER_YEAR = 365
const MONTHS_PER_QUARTER = 3
const MONTHS_PER_YEAR = 12
const DAYS_PER_MONTH = DAYS_PER_YEAR / MONTHS_PER_YEAR
const WEEKS_PER_MONTH = DAYS_PER_MONTH / DAYS_PER_WEEK
const QUARTERS_PER_YEAR = 4

const NANOSECONDS_PER_MILLISECOND = NANOSECONDS_PER_MICROSECOND * MICROSECONDS_PER_MILLISECOND
const NANOSECONDS_PER_SECOND = NANOSECONDS_PER_MILLISECOND * MILLISECONDS_PER_SECOND
const NANOSECONDS_PER_MINUTE = NANOSECONDS_PER_SECOND * SECONDS_PER_MINUTE
const NANOSECONDS_PER_HOUR = NANOSECONDS_PER_MINUTE * MINUTES_PER_HOUR
const NANOSECONDS_PER_DAY = NANOSECONDS_PER_HOUR * HOURS_PER_DAY
const NANOSECONDS_PER_WEEK = NANOSECONDS_PER_DAY * DAYS_PER_WEEK
const NANOSECONDS_PER_MONTH = NANOSECONDS_PER_DAY * DAYS_PER_MONTH
const NANOSECONDS_PER_QUARTER = NANOSECONDS_PER_MONTH * MONTHS_PER_QUARTER
const NANOSECONDS_PER_YEAR = NANOSECONDS_PER_DAY * DAYS_PER_YEAR

const MICROSECONDS_PER_SECOND = MICROSECONDS_PER_MILLISECOND * MILLISECONDS_PER_SECOND
const MICROSECONDS_PER_MINUTE = MICROSECONDS_PER_SECOND * SECONDS_PER_MINUTE
const MICROSECONDS_PER_HOUR = MICROSECONDS_PER_MINUTE * MINUTES_PER_HOUR
const MICROSECONDS_PER_DAY = MICROSECONDS_PER_HOUR * HOURS_PER_DAY
const MICROSECONDS_PER_WEEK = MICROSECONDS_PER_DAY * DAYS_PER_WEEK
const MICROSECONDS_PER_MONTH = MICROSECONDS_PER_DAY * DAYS_PER_MONTH
const MICROSECONDS_PER_QUARTER = MICROSECONDS_PER_MONTH * MONTHS_PER_QUARTER
const MICROSECONDS_PER_YEAR = MICROSECONDS_PER_DAY * DAYS_PER_YEAR

const MILLISECONDS_PER_MINUTE = MILLISECONDS_PER_SECOND * SECONDS_PER_MINUTE
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * MINUTES_PER_HOUR
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * HOURS_PER_DAY
const MILLISECONDS_PER_WEEK = MILLISECONDS_PER_DAY * DAYS_PER_WEEK
const MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DAY * DAYS_PER_MONTH
const MILLISECONDS_PER_QUARTER = MILLISECONDS_PER_MONTH * MONTHS_PER_QUARTER
const MILLISECONDS_PER_YEAR = MILLISECONDS_PER_DAY * DAYS_PER_YEAR

const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * MINUTES_PER_HOUR
const SECONDS_PER_DAY = SECONDS_PER_HOUR * HOURS_PER_DAY
const SECONDS_PER_WEEK = SECONDS_PER_DAY * DAYS_PER_WEEK
const SECONDS_PER_MONTH = SECONDS_PER_DAY * DAYS_PER_MONTH
const SECONDS_PER_QUARTER = SECONDS_PER_MONTH * MONTHS_PER_QUARTER
const SECONDS_PER_YEAR = SECONDS_PER_DAY * DAYS_PER_YEAR

const MINUTES_PER_DAY = MINUTES_PER_HOUR * HOURS_PER_DAY
const MINUTES_PER_WEEK = MINUTES_PER_DAY * DAYS_PER_WEEK
const MINUTES_PER_MONTH = MINUTES_PER_DAY * DAYS_PER_MONTH
const MINUTES_PER_QUARTER = MINUTES_PER_MONTH * MONTHS_PER_QUARTER
const MINUTES_PER_YEAR = MINUTES_PER_DAY * DAYS_PER_YEAR

const HOURS_PER_WEEK = HOURS_PER_DAY * DAYS_PER_WEEK
const HOURS_PER_MONTH = HOURS_PER_DAY * DAYS_PER_MONTH
const HOURS_PER_QUARTER = HOURS_PER_MONTH * MONTHS_PER_QUARTER
const HOURS_PER_YEAR = HOURS_PER_DAY * DAYS_PER_YEAR

const DAYS_PER_QUARTER = DAYS_PER_MONTH * MONTHS_PER_QUARTER

const WEEKS_PER_QUARTER = WEEKS_PER_MONTH * MONTHS_PER_QUARTER
const WEEKS_PER_YEAR = WEEKS_PER_QUARTER * QUARTERS_PER_YEAR

const UNIT = 'second'
const ROUNDING_MODE = 'trunc'

const factorLookup = {
  microsecond: {
    nanosecond: NANOSECONDS_PER_MICROSECOND
  },
  millisecond: {
    nanosecond: NANOSECONDS_PER_MILLISECOND,
    microsecond: MICROSECONDS_PER_MILLISECOND
  },
  second: {
    nanosecond: NANOSECONDS_PER_SECOND,
    microsecond: MICROSECONDS_PER_SECOND,
    millisecond: MILLISECONDS_PER_SECOND
  },
  minute: {
    nanosecond: NANOSECONDS_PER_MINUTE,
    microsecond: MICROSECONDS_PER_MINUTE,
    millisecond: MILLISECONDS_PER_MINUTE,
    second: SECONDS_PER_MINUTE
  },
  hour: {
    nanosecond: NANOSECONDS_PER_HOUR,
    microsecond: MICROSECONDS_PER_HOUR,
    millisecond: MILLISECONDS_PER_HOUR,
    second: SECONDS_PER_HOUR,
    minute: MINUTES_PER_HOUR
  },
  day: {
    nanosecond: NANOSECONDS_PER_DAY,
    microsecond: MICROSECONDS_PER_DAY,
    millisecond: MILLISECONDS_PER_DAY,
    second: SECONDS_PER_DAY,
    minute: MINUTES_PER_DAY,
    hour: HOURS_PER_DAY
  },
  week: {
    nanosecond: NANOSECONDS_PER_WEEK,
    microsecond: MICROSECONDS_PER_WEEK,
    millisecond: MILLISECONDS_PER_WEEK,
    second: SECONDS_PER_WEEK,
    minute: MINUTES_PER_WEEK,
    hour: HOURS_PER_WEEK,
    day: DAYS_PER_WEEK
  },
  month: {
    nanosecond: NANOSECONDS_PER_MONTH,
    microsecond: MICROSECONDS_PER_MONTH,
    millisecond: MILLISECONDS_PER_MONTH,
    second: SECONDS_PER_MONTH,
    minute: MINUTES_PER_MONTH,
    hour: HOURS_PER_MONTH,
    day: DAYS_PER_MONTH,
    week: WEEKS_PER_MONTH
  },
  quarter: {
    nanosecond: NANOSECONDS_PER_QUARTER,
    microsecond: MICROSECONDS_PER_QUARTER,
    millisecond: MILLISECONDS_PER_QUARTER,
    second: SECONDS_PER_QUARTER,
    minute: MINUTES_PER_QUARTER,
    hour: HOURS_PER_QUARTER,
    day: DAYS_PER_QUARTER,
    week: WEEKS_PER_QUARTER,
    month: MONTHS_PER_QUARTER
  },
  year: {
    nanosecond: NANOSECONDS_PER_YEAR,
    microsecond: MICROSECONDS_PER_YEAR,
    millisecond: MILLISECONDS_PER_YEAR,
    second: SECONDS_PER_YEAR,
    minute: MINUTES_PER_YEAR,
    hour: HOURS_PER_YEAR,
    day: DAYS_PER_YEAR,
    week: WEEKS_PER_YEAR,
    month: MONTHS_PER_YEAR,
    quarter: QUARTERS_PER_YEAR
  }
}
ReflectSetPrototypeOf(factorLookup, null)

const getUnits = () => [
  'nanosecond',
  'microsecond',
  'millisecond',
  'second',
  'minute',
  'hour',
  'day',
  'week',
  'month',
  'quarter',
  'year'
]
const units = getUnits()

const unitLookup = ObjectCreate(null)
ArrayPrototypeForEach(units, (unit, index) => {
  unitLookup[unit] = index
})

const getRoundingModes = () => [
  'trunc',
  'ceil',
  'floor',
  'round'
]

const roundingModeLookup = ObjectCreate(null)
ArrayPrototypeForEach(getRoundingModes(), (mode, index) => {
  roundingModeLookup[mode] = index
})

const getDisplayModes = () => [
  'always',
  'auto',
  'none'
]

const displayModeLookup = ObjectCreate(null)
ArrayPrototypeForEach(getDisplayModes(), (mode, index) => {
  displayModeLookup[mode] = index
})

const getNanosecondNames = () => [
  'ns',
  'nsec',
  'nsecs',
  'nanos',
  'nanosec',
  'nanosecs',
  'nanosecond',
  'nanoseconds'
]
const getMicrosecondNames = () => [
  'μs',
  'us',
  'μsec',
  'usec',
  'μsecs',
  'usecs',
  'micros',
  'microsec',
  'microsecs',
  'microsecond',
  'microseconds'
]
const getMillisecondNames = () => [
  'ms',
  'msec',
  'msecs',
  'millis',
  'millisec',
  'millisecs',
  'millisecond',
  'milliseconds'
]
const getSecondNames = () => [
  's',
  'sec',
  'secs',
  'second',
  'seconds'
]
const getMinuteNames = () => [
  'm',
  'min',
  'mins',
  'minute',
  'minutes'
]
const getHourNames = () => [
  'h',
  'hr',
  'hrs',
  'hour',
  'hours'
]
const getDayNames = () => [
  'd',
  'day',
  'days'
]
const getWeekNames = () => [
  'w',
  'wk',
  'wks',
  'week',
  'weeks'
]
const getMonthNames = () => [
  'mo',
  'month',
  'months'
]
const getQuarterNames = () => [
  'qtr',
  'qtrs',
  'quarter',
  'quarters'
]
const getYearNames = () => [
  'y',
  'yr',
  'yrs',
  'year',
  'years'
]

const unitNameLookup = ObjectCreate(null)
ArrayPrototypeForEach([
  getNanosecondNames(),
  getMicrosecondNames(),
  getMillisecondNames(),
  getSecondNames(),
  getMinuteNames(),
  getHourNames(),
  getDayNames(),
  getWeekNames(),
  getMonthNames(),
  getQuarterNames(),
  getYearNames()
], (names, index) => {
  const unit = units[index]
  ArrayPrototypeForEach(names, name => {
    unitNameLookup[name] = unit
  })
})

const unitLocaleNameLookup = {
  'нс': 'nanosecond',
  'нсек': 'nanosecond',
  'наносек': 'nanosecond',
  'наносекунда': 'nanosecond',
  'наносекунду': 'nanosecond',
  'наносекунды': 'nanosecond',
  'наносекунд': 'nanosecond',
  'мкс': 'microsecond',
  'мксек': 'microsecond',
  'микросек': 'microsecond',
  'микросекунда': 'microsecond',
  'микросекунду': 'microsecond',
  'микросекунды': 'microsecond',
  'микросекунд': 'microsecond',
  'мс': 'millisecond',
  'мсек': 'millisecond',
  'миллисек': 'millisecond',
  'миллисекунда': 'millisecond',
  'миллисекунду': 'millisecond',
  'миллисекунды': 'millisecond',
  'миллисекунд': 'millisecond',
  'с': 'second',
  'сек': 'second',
  'секунда': 'second',
  'секунду': 'second',
  'секунды': 'second',
  'секунд': 'second',
  'м': 'minute',
  'мин': 'minute',
  'минута': 'minute',
  'минуту': 'minute',
  'минуты': 'minute',
  'минут': 'minute',
  'ч': 'hour',
  'час': 'hour',
  'часа': 'hour',
  'часов': 'hour',
  'д': 'day',
  'дн': 'day',
  'день': 'day',
  'дня': 'day',
  'дней': 'day',
  'сут': 'day',
  'сутки': 'day',
  'суток': 'day',
  'нед': 'week',
  'неделя': 'week',
  'неделю': 'week',
  'недели': 'week',
  'недель': 'week',
  'мес': 'month',
  'месяц': 'month',
  'месяца': 'month',
  'месяцев': 'month',
  'кв': 'quarter',
  'кварт': 'quarter',
  'квартал': 'quarter',
  'квартала': 'quarter',
  'кварталов': 'quarter',
  'г': 'year',
  'год': 'year',
  'года': 'year',
  'лет': 'year'
}
ReflectSetPrototypeOf(unitLocaleNameLookup, null)

const toAmount = (value, unit) => {
  value = TypesToNumber(value)
  if (!NumberIsFinite(value)) {
    throw new RangeError(`The ${unit} must be a finite number`)
  }
  return value || 0
}

const isUnit = value => PrimitivesIsString(value) && unitLookup[value] !== undefined

const toUnit = value => {
  if (!PrimitivesIsString(value)) {
    throw new TypeError('The unit must be a string')
  }
  value = StringPrototypeToLowerCase(value)
  const unit = unitNameLookup[value]
  if (unit === undefined) {
    throw new TypeError('The unit must be "nanosecond", "microsecond", "millisecond", "second", "minute", "hour", "day", "week", "month", "quarter" or "year"')
  }
  return unit
}

const getUnitIndex = unit => {
  unit = toUnit(unit)
  return unitLookup[unit]
}

const isRoundingMode = value => PrimitivesIsString(value) && roundingModeLookup[value] !== undefined

const toRoundingMode = value => {
  if (!PrimitivesIsString(value)) {
    throw new TypeError('The roundingMode must be a string')
  }
  if (roundingModeLookup[value] === undefined) {
    throw new TypeError('The roundingMode must be "trunc", "ceil", "floor" or "round"')
  }
  return value
}

const toDisplayMode = value => {
  if (!PrimitivesIsString(value)) {
    throw new TypeError('The display must be a string')
  }
  if (displayModeLookup[value] === undefined) {
    throw new TypeError('The display must be "always", "auto" or "none"')
  }
  return value
}

const toConvertOptions = value => {
  if (!TypesIsPlainObject(value)) {
    throw new TypeError('The options must be a plain object')
  }
  let {
    rounding,
    roundingMode
  } = value
  if (rounding) {
    roundingMode = roundingMode !== undefined ? toRoundingMode(roundingMode) : ROUNDING_MODE
  }
  return {
    ...value,
    roundingMode
  }
}

const toParts = value => {
  if (!TypesIsPlainObject(value)) {
    throw new TypeError('The parts must be a plain object')
  }
  const {length} = units
  const result = {}
  for (let i = length - 1; i >= 0; i--) {
    const unit = units[i]
    const key = `${unit}s`
    const amount = value[key]
    if (amount !== undefined) {
      result[key] = toAmount(amount, key)
    }
  }
  return result
}

const toPartsOptions = value => {
  if (value === undefined) {
    return {
      largestUnit: 'year',
      smallestUnit: 'nanosecond'
    }
  } else if (!TypesIsPlainObject(value)) {
    throw new TypeError('The options must be a plain object')
  }
  let {
    largestUnit,
    smallestUnit,
    units,
    rounding,
    roundingMode
  } = value
  if (units === undefined) {
    largestUnit = largestUnit !== undefined ? toUnit(largestUnit) : 'year'
    smallestUnit = smallestUnit !== undefined ? toUnit(smallestUnit) : 'nanosecond'
  } else {
    units = toAllowedUnits(units)
  }
  if (rounding) {
    roundingMode = roundingMode !== undefined ? toRoundingMode(roundingMode) : ROUNDING_MODE
  }
  return {
    ...value,
    largestUnit,
    smallestUnit,
    units,
    roundingMode
  }
}

const toAllowedUnits = value => {
  if (!ArrayIsArray(value)) {
    throw new TypeError('The units must be an array')
  }
  const lookup = ObjectCreate(null)
  ArrayPrototypeForEach(value, (unit, index) => {
    unit = toUnit(unit)
    const unitIndex = unitLookup[unit]
    if (lookup[unitIndex] !== undefined) {
      throw new SyntaxError(`The unit "${unit}" at index ${index} is already in the units`)
    }
    lookup[unitIndex] = unit
  })
  return ObjectValues(lookup)
}

const round = (value, mode) => (
  mode === 'trunc' ? MathTrunc(value) :
  mode === 'ceil' ? MathCeil(value) :
  mode === 'floor' ? MathFloor(value) : MathRound(value)
) || 0

const numberToString = (number, digits = 9) => {
  const string = NumberPrototypeToFixed(number, digits)
  if (StringPrototypeIncludes(string, SEPARATOR_CHAR)) {
    const {length} = string
    const lastIndex = length - 1
    let zeroCount = 0
    while (string[lastIndex - zeroCount] === '0') {
      zeroCount++
    }
    if (string[lastIndex - zeroCount] === SEPARATOR_CHAR) {
      zeroCount++
    }
    if (zeroCount) {
      return StringPrototypeSlice(string, 0, -zeroCount)
    }
  }
  return string
}

const _wrapSlots = slots => {
  let {
    seconds,
    nanoseconds
  } = slots
  let duration = MathTrunc(seconds)
  const fraction = seconds - duration
  if (fraction) {
    nanoseconds += fraction * NANOSECONDS_PER_SECOND
  }
  if (nanoseconds) {
    const amount = nanoseconds / NANOSECONDS_PER_SECOND
    const trunc = MathTrunc(amount)
    seconds = duration + trunc
    let fraction = amount - trunc
    if (seconds > 0 && fraction < 0) {
      seconds -= 1
      fraction += 1
    } else if (seconds < 0 && fraction > 0) {
      seconds += 1
      fraction -= 1
    }
    nanoseconds = fraction ? MathRound(fraction * NANOSECONDS_PER_SECOND) : 0
  }
  return {
    seconds,
    nanoseconds
  }
}
const wrapSlots = slots => {
  if (!TypesIsPlainObject(slots)) {
    throw new TypeError('The slots must be a plain object')
  }
  let {
    seconds,
    nanoseconds
  } = slots
  seconds = toAmount(seconds, 'seconds')
  nanoseconds = toAmount(nanoseconds, 'nanoseconds')
  return _wrapSlots({
    seconds,
    nanoseconds
  })
}

const _convert = (amount, unit, targetUnit, options) => {
  let result = null
  if (unit !== targetUnit) {
    const unitIndex = unitLookup[unit]
    const targetUnitIndex = unitLookup[targetUnit]
    if (targetUnitIndex > unitIndex) {
      const factor = factorLookup[targetUnit][unit]
      result = amount / factor
    } else {
      const factor = factorLookup[unit][targetUnit]
      result = amount * factor
    }
  } else {
    result = amount
  }
  if (options) {
    const {
      rounding,
      roundingMode
    } = options
    if (rounding) {
      return round(result, roundingMode)
    }
  }
  return result || 0
}
const convert = (amount, unit, targetUnit, options) => {
  if (options !== undefined) {
    options = toConvertOptions(options)
  }
  unit = toUnit(unit)
  targetUnit = toUnit(targetUnit)
  amount = toAmount(amount, `${unit}s`)
  return _convert(amount, unit, targetUnit, options)
}

const _slotsToDuration = (slots, unit, options) => {
  const {
    seconds,
    nanoseconds
  } = slots
  const result = _convert(seconds, 'second', unit) + _convert(nanoseconds, 'nanosecond', unit)
  if (options) {
    const {
      rounding,
      roundingMode
    } = options
    if (rounding) {
      return round(result, roundingMode)
    }
  }
  return result
}
const slotsToDuration = (slots, unit, options) => {
  if (options !== undefined) {
    options = toConvertOptions(options)
  }
  unit = unit !== undefined ? toUnit(unit) : UNIT
  slots = wrapSlots(slots)
  return _slotsToDuration(slots, unit, options)
}

const _slotsToParts = (slots, options) => {
  const {
    largestUnit,
    smallestUnit,
    units: allowedUnits,
    rounding,
    roundingMode
  } = options
  let {
    seconds,
    nanoseconds
  } = slots
  const result = {}
  if (allowedUnits) {
    const {length} = allowedUnits
    const lastIndex = length - 1
    for (let i = lastIndex; i >= 0; i--) {
      const unit = allowedUnits[i]
      const unitIndex = unitLookup[unit]
      const key = `${unit}s`
      if (i > 0) {
        if (unitIndex > 2) {
          const duration = _convert(seconds, 'second', unit)
          const amount = MathTrunc(duration) || 0
          result[key] = amount
          seconds -= _convert(amount, unit, 'second')
        } else if (i === lastIndex) {
          const secondsDuration = _convert(seconds, 'second', unit)
          const nanosecondsDuration = _convert(nanoseconds, 'nanosecond', unit)
          const secondsAmount = MathTrunc(secondsDuration) || 0
          const nanosecondsAmount = MathTrunc(nanosecondsDuration) || 0
          result[key] = secondsAmount + nanosecondsAmount
          seconds -= _convert(secondsAmount, unit, 'second')
          nanoseconds -= _convert(nanosecondsAmount, unit, 'nanosecond')
        } else {
          const duration = _convert(nanoseconds, 'nanosecond', unit)
          const amount = MathTrunc(duration) || 0
          result[key] = amount
          nanoseconds -= _convert(amount, unit, 'nanosecond')
        }
        const slots = _wrapSlots({
          seconds,
          nanoseconds
        })
        seconds = slots.seconds
        nanoseconds = slots.nanoseconds
      } else {
        result[key] = _slotsToDuration({
          seconds,
          nanoseconds
        }, unit, options)
      }
    }
    if (rounding && roundingMode !== ROUNDING_MODE) {
      for (let i = 0; i < lastIndex; i++) {
        const unit = allowedUnits[i]
        const key = `${unit}s`
        const amount = result[key]
        if (amount) {
          const nextUnit = allowedUnits[i + 1]
          const nextKey = `${nextUnit}s`
          const duration = _convert(amount, unit, nextUnit)
          const increment = MathTrunc(duration) || 0
          if (increment) {
            if (i > 0) {
              result[key] = 0
            } else {
              result[key] -= _convert(increment, nextUnit, unit)
            }
            result[nextKey] += increment
          } else {
            return result
          }
        } else {
          return result
        }
      }
    }
  } else {
    const largestUnitIndex = unitLookup[largestUnit]
    const smallestUnitIndex = unitLookup[smallestUnit]
    for (let i = largestUnitIndex; i >= smallestUnitIndex; i--) {
      const unit = units[i]
      const key = `${unit}s`
      if (i > smallestUnitIndex) {
        if (i > 2) {
          const duration = _convert(seconds, 'second', unit)
          const amount = MathTrunc(duration) || 0
          result[key] = amount
          seconds -= _convert(amount, unit, 'second')
        } else if (i === largestUnitIndex) {
          const secondsDuration = _convert(seconds, 'second', unit)
          const nanosecondsDuration = _convert(nanoseconds, 'nanosecond', unit)
          const secondsAmount = MathTrunc(secondsDuration) || 0
          const nanosecondsAmount = MathTrunc(nanosecondsDuration) || 0
          result[key] = secondsAmount + nanosecondsAmount
          seconds -= _convert(secondsAmount, unit, 'second')
          nanoseconds -= _convert(nanosecondsAmount, unit, 'nanosecond')
        } else {
          const duration = _convert(nanoseconds, 'nanosecond', unit)
          const amount = MathTrunc(duration) || 0
          result[key] = amount
          nanoseconds -= _convert(amount, unit, 'nanosecond')
        }
        const slots = _wrapSlots({
          seconds,
          nanoseconds
        })
        seconds = slots.seconds
        nanoseconds = slots.nanoseconds
      } else {
        result[key] = _slotsToDuration({
          seconds,
          nanoseconds
        }, unit, options)
      }
    }
    if (rounding && roundingMode !== ROUNDING_MODE) {
      for (let i = smallestUnitIndex; i < largestUnitIndex; i++) {
        const unit = units[i]
        const key = `${unit}s`
        const amount = result[key]
        if (amount) {
          const nextUnit = units[i + 1]
          const nextKey = `${nextUnit}s`
          const duration = _convert(amount, unit, nextUnit)
          const increment = MathTrunc(duration) || 0
          if (increment) {
            if (i > smallestUnitIndex) {
              result[key] = 0
            } else {
              result[key] -= _convert(increment, nextUnit, unit)
            }
            result[nextKey] += increment
          } else {
            return result
          }
        } else {
          return result
        }
      }
    }
  }
  return result
}
const slotsToParts = (slots, options) => {
  options = toPartsOptions(options)
  slots = wrapSlots(slots)
  return _slotsToParts(slots, options)
}

const _convertToSlots = (amount, unit) => {
  const unitIndex = unitLookup[unit]
  let seconds = 0
  let nanoseconds = 0
  if (unitIndex > 2) {
    seconds = _convert(amount, unit, 'second')
  } else {
    nanoseconds = _convert(amount, unit, 'nanosecond')
  }
  return _wrapSlots({
    seconds,
    nanoseconds
  })
}
const convertToSlots = (amount, unit) => {
  unit = toUnit(unit)
  amount = toAmount(amount, `${unit}s`)
  return _convertToSlots(amount, unit)
}

const _convertToParts = (amount, unit, options) => {
  const slots = _convertToSlots(amount, unit)
  return _slotsToParts(slots, options)
}
const convertToParts = (amount, unit, options) => {
  options = toPartsOptions(options)
  unit = toUnit(unit)
  amount = toAmount(amount, `${unit}s`)
  return _convertToParts(amount, unit, options)
}

const _parseUnit = (string, targetUnit, options) => {
  string = StringPrototypeTrim(string)
  const match = StringPrototypeMatch(string, /^([+-]?(?:\d+\.?\d*|\d*\.?\d+)(?:e[+-]?\d+)?)\s*([a-zа-яμ]+)$/i)
  if (!match) {
    return NaN
  }
  let [input, amount, name] = match
  name = StringPrototypeToLowerCase(name)
  const unit = unitNameLookup[name] || unitLocaleNameLookup[name]
  if (unit === undefined) {
    return NaN
  }
  amount = Number(amount) || 0
  return _convert(amount, unit, targetUnit, options)
}
const parseUnit = (string, unit, options) => {
  if (options !== undefined) {
    options = toConvertOptions(options)
  }
  unit = unit !== undefined ? toUnit(unit) : UNIT
  string = String(string)
  return _parseUnit(string, unit, options)
}

const _parseUnits = (string, targetUnit, options) => {
  let isNegative = false
  let result = null
  const matches = StringPrototypeSafeMatchAll(string, /([+-])?((?:\d+\.?\d*|\d*\.?\d+)(?:e[+-]?\d+)?)\s*([a-zа-яμ]+)/gi)
  for (const match of matches) {
    let [input, sign, amount, name] = match
    name = StringPrototypeToLowerCase(name)
    const unit = unitNameLookup[name] || unitLocaleNameLookup[name]
    if (unit !== undefined) {
      if (sign !== undefined) {
        isNegative = sign === NEGATIVE_CHAR
      }
      amount = Number(amount)
      result += _convert(isNegative ? -amount : amount, unit, targetUnit)
    }
  }
  if (result === null) {
    return NaN
  }
  if (options) {
    const {
      rounding,
      roundingMode
    } = options
    if (rounding) {
      return round(result, roundingMode)
    }
  }
  return result
}
const parseUnits = (string, unit, options) => {
  if (options !== undefined) {
    options = toConvertOptions(options)
  }
  unit = unit !== undefined ? toUnit(unit) : UNIT
  string = String(string)
  return _parseUnits(string, unit, options)
}

const _parseUnitsToParts = string => {
  let isNegative = false
  const lookup = ObjectCreate(null)
  const matches = StringPrototypeSafeMatchAll(string, /([+-])?((?:\d+\.?\d*|\d*\.?\d+)(?:e[+-]?\d+)?)\s*([a-zа-яμ]+)/gi)
  for (const match of matches) {
    let [input, sign, amount, name] = match
    name = StringPrototypeToLowerCase(name)
    const unit = unitNameLookup[name] || unitLocaleNameLookup[name]
    if (unit !== undefined) {
      if (sign !== undefined) {
        isNegative = sign === NEGATIVE_CHAR
      }
      const unitIndex = unitLookup[unit]
      if (lookup[unitIndex] === undefined) {
        lookup[unitIndex] = 0
      }
      amount = Number(amount)
      lookup[unitIndex] += isNegative ? -amount : amount
    }
  }
  const entries = ObjectEntries(lookup)
  const {length} = entries
  if (!length) {
    return null
  }
  const result = {}
  for (let i = length - 1; i >= 0; i--) {
    const [index, amount] = entries[i]
    const unit = units[index]
    const key = `${unit}s`
    result[key] = amount
  }
  return result
}
const parseUnitsToParts = string => {
  string = String(string)
  return _parseUnitsToParts(string)
}

const _parseTime = (string, unit, options) => {
  const match = StringPrototypeMatch(string, /^([+-])?(\d+):([0-5]\d)(?::([0-5]\d(?:\.\d{1,9})?))?$/)
  if (!match) {
    return NaN
  }
  let [input, sign, hours, minutes, seconds] = match
  const isNegative = sign === NEGATIVE_CHAR
  hours = Number(hours)
  minutes = Number(minutes)
  let result = _convert(hours, 'hour', unit) + _convert(minutes, 'minute', unit)
  if (seconds !== undefined) {
    seconds = Number(seconds)
    result += _convert(seconds, 'second', unit)
  }
  if (isNegative) {
    result = -result
  }
  if (options) {
    const {
      rounding,
      roundingMode
    } = options
    if (rounding) {
      return round(result, roundingMode)
    }
  }
  return result || 0
}
const parseTime = (string, unit, options) => {
  if (options !== undefined) {
    options = toConvertOptions(options)
  }
  unit = unit !== undefined ? toUnit(unit) : UNIT
  string = String(string)
  return _parseTime(string, unit, options)
}

const _parseTimeToParts = string => {
  const match = StringPrototypeMatch(string, /^([+-])?(\d+):([0-5]\d)(?::([0-5]\d(?:\.\d{1,9})?))?$/)
  if (!match) {
    return null
  }
  let [input, sign, hours, minutes, seconds] = match
  const isNegative = sign === NEGATIVE_CHAR
  hours = Number(hours) || 0
  minutes = Number(minutes) || 0
  const parts = {
    hours: isNegative && hours ? -hours : hours,
    minutes: isNegative && minutes ? -minutes : minutes,
  }
  if (seconds !== undefined) {
    seconds = Number(seconds) || 0
    parts.seconds = isNegative && seconds ? -seconds : seconds
  }
  return parts
}
const parseTimeToParts = string => {
  string = String(string)
  return _parseTimeToParts(string)
}

const _parseDuration = (string, unit, options) => {
  const match = StringPrototypeMatch(string, /^([+-])?P(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))Y)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))Q)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))M)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))W)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))D)?(?:(?:T|(?<=P))(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))H)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))M)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))S)?)?$/i)
  if (!match) {
    return NaN
  }
  let [
    input,
    sign,
    years,
    quarters,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds
  ] = match
  const isNegative = sign === NEGATIVE_CHAR
  let result = null
  if (years !== undefined) {
    years = Number(years)
    result += _convert(isNegative ? -years : years, 'year', unit)
  }
  if (quarters !== undefined) {
    quarters = Number(quarters)
    result += _convert(isNegative ? -quarters : quarters, 'quarter', unit)
  }
  if (months !== undefined) {
    months = Number(months)
    result += _convert(isNegative ? -months : months, 'month', unit)
  }
  if (weeks !== undefined) {
    weeks = Number(weeks)
    result += _convert(isNegative ? -weeks : weeks, 'week', unit)
  }
  if (days !== undefined) {
    days = Number(days)
    result += _convert(isNegative ? -days : days, 'day', unit)
  }
  if (hours !== undefined) {
    hours = Number(hours)
    result += _convert(isNegative ? -hours : hours, 'hour', unit)
  }
  if (minutes !== undefined) {
    minutes = Number(minutes)
    result += _convert(isNegative ? -minutes : minutes, 'minute', unit)
  }
  if (seconds !== undefined) {
    seconds = Number(seconds)
    result += _convert(isNegative ? -seconds : seconds, 'second', unit)
  }
  if (result === null) {
    return NaN
  }
  if (options) {
    const {
      rounding,
      roundingMode
    } = options
    if (rounding) {
      return round(result, roundingMode)
    }
  }
  return result
}
const parseDuration = (string, unit, options) => {
  if (options !== undefined) {
    options = toConvertOptions(options)
  }
  unit = unit !== undefined ? toUnit(unit) : UNIT
  string = String(string)
  return _parseDuration(string, unit, options)
}

const _parseDurationToParts = string => {
  const match = StringPrototypeMatch(string, /^([+-])?P(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))Y)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))Q)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))M)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))W)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))D)?(?:(?:T|(?<=P))(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))H)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))M)?(?:([+-]?(?:\d+\.?\d*|\d*\.?\d+))S)?)?$/i)
  if (!match) {
    return null
  }
  let [
    input,
    sign,
    years,
    quarters,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds
  ] = match
  const hasYears = years !== undefined
  const hasQuarters = quarters !== undefined
  const hasMonths = months !== undefined
  const hasWeeks = weeks !== undefined
  const hasDays = days !== undefined
  const hasHours = hours !== undefined
  const hasMinutes = minutes !== undefined
  const hasSeconds = seconds !== undefined
  if (
    !hasYears &&
    !hasQuarters &&
    !hasMonths &&
    !hasWeeks &&
    !hasDays &&
    !hasHours &&
    !hasMinutes &&
    !hasSeconds
  ) {
    return null
  }
  const isNegative = sign === NEGATIVE_CHAR
  const parts = {}
  if (hasYears) {
    years = Number(years) || 0
    parts.years = isNegative && years ? -years : years
  }
  if (hasQuarters) {
    quarters = Number(quarters) || 0
    parts.quarters = isNegative && quarters ? -quarters : quarters
  }
  if (hasMonths) {
    months = Number(months) || 0
    parts.months = isNegative && months ? -months : months
  }
  if (hasWeeks) {
    weeks = Number(weeks) || 0
    parts.weeks = isNegative && weeks ? -weeks : weeks
  }
  if (hasDays) {
    days = Number(days) || 0
    parts.days = isNegative && days ? -days : days
  }
  if (hasHours) {
    hours = Number(hours) || 0
    parts.hours = isNegative && hours ? -hours : hours
  }
  if (hasMinutes) {
    minutes = Number(minutes) || 0
    parts.minutes = isNegative && minutes ? -minutes : minutes
  }
  if (hasSeconds) {
    seconds = Number(seconds) || 0
    parts.seconds = isNegative && seconds ? -seconds : seconds
  }
  return parts
}
const parseDurationToParts = string => {
  string = String(string)
  return _parseDurationToParts(string)
}

const _parse = (string, unit, options) => {
  let result = _parseDuration(string, unit, options)
  if (NumberIsNaN(result)) {
    result = _parseTime(string, unit, options)
    if (NumberIsNaN(result)) {
      result = _parseUnits(string, unit, options)
    }
  }
  return result
}
const parse = (string, unit, options) => {
  if (options !== undefined) {
    options = toConvertOptions(options)
  }
  unit = unit !== undefined ? toUnit(unit) : UNIT
  string = String(string)
  return _parse(string, unit, options)
}

const _parseToParts = string => {
  let result = _parseDurationToParts(string)
  if (!result) {
    result = _parseTimeToParts(string)
    if (!result) {
      result = _parseUnitsToParts(string)
    }
  }
  return result
}
const parseToParts = string => {
  string = String(string)
  return _parseToParts(string)
}

const _partsToDuration = (parts, targetUnit, options) => {
  let result = 0
  ArrayPrototypeForEach(units, unit => {
    const key = `${unit}s`
    const amount = parts[key]
    if (amount !== undefined) {
      result += _convert(amount, unit, targetUnit)
    }
  })
  if (options) {
    const {
      rounding,
      roundingMode
    } = options
    if (rounding) {
      return round(result, roundingMode)
    }
  }
  return result
}
const partsToDuration = (parts, unit, options) => {
  if (options !== undefined) {
    options = toConvertOptions(options)
  }
  unit = unit !== undefined ? toUnit(unit) : UNIT
  parts = toParts(parts)
  return _partsToDuration(parts, unit, options)
}

const _partsToSlots = parts => {
  let seconds = 0
  let nanoseconds = 0
  ArrayPrototypeForEach(units, unit => {
    const key = `${unit}s`
    const amount = parts[key]
    if (amount !== undefined) {
      const slots = _convertToSlots(amount, unit)
      seconds += slots.seconds
      nanoseconds += slots.nanoseconds
    }
  })
  return _wrapSlots({
    seconds,
    nanoseconds
  })
}
const partsToSlots = parts => {
  parts = toParts(parts)
  return _partsToSlots(parts)
}

const durationToSlots = duration => {
  let slots = null
  if (PrimitivesIsString(duration)) {
    const parts = _parseToParts(duration)
    if (parts) {
      slots = _partsToSlots(parts)
    }
  }
  if (!slots) {
    duration = TypesToNumber(duration)
    if (!NumberIsFinite(duration)) {
      throw new RangeError('The duration must be a finite number')
    }
    slots = _convertToSlots(duration, 'second')
  }
  return slots
}

const _dateToSlots = date => {
  const timestamp = DatePrototypeGetTime(date)
  if (NumberIsNaN(timestamp)) {
    throw new RangeError('The value of the date must be a finite number')
  }
  const seconds = MathTrunc(timestamp / MILLISECONDS_PER_SECOND) || 0
  const nanoseconds = (timestamp - seconds * MILLISECONDS_PER_SECOND) * NANOSECONDS_PER_MILLISECOND
  return {
    seconds,
    nanoseconds
  }
}
const dateToSlots = date => {
  if (!InstancesIsDate(date)) {
    throw new TypeError('The date must be an instance of Date')
  }
  return _dateToSlots(date)
}

const toSlots = input => {
  if (isDuration(input)) {
    return {
      seconds: input[secondsSymbol],
      nanoseconds: input[nanosecondsSymbol]
    }
  }
  return InstancesIsDate(input) ? _dateToSlots(input) :
    TypesIsPlainObject(input) ? partsToSlots(input) : durationToSlots(input)
}

const toDuration = (input, unit, options) => {
  if (options !== undefined) {
    options = toConvertOptions(options)
  }
  unit = unit !== undefined ? toUnit(unit) : UNIT
  if (isDuration(input)) {
    return _slotsToDuration({
      seconds: input[secondsSymbol],
      nanoseconds: input[nanosecondsSymbol]
    }, unit, options)
  }
  if (InstancesIsDate(input)) {
    const timestamp = DatePrototypeGetTime(input)
    if (NumberIsNaN(timestamp)) {
      throw new RangeError('The value of the date must be a finite number')
    }
    return _convert(timestamp, 'millisecond', unit, options)
  }
  if (TypesIsPlainObject(input)) {
    input = toParts(input)
    return _partsToDuration(input, unit, options)
  }
  if (PrimitivesIsString(input)) {
    const duration = _parse(input, unit, options)
    if (!NumberIsNaN(duration)) {
      return duration
    }
  }
  const duration = TypesToNumber(input)
  if (!NumberIsFinite(duration)) {
    throw new RangeError('The duration must be a finite number')
  }
  return _convert(duration, 'second', unit, options)
}

const between = (duration1, duration2, unit, options) => {
  if (options !== undefined) {
    options = toConvertOptions(options)
  }
  unit = unit !== undefined ? toUnit(unit) : UNIT
  const slots1 = toSlots(duration1)
  const slots2 = toSlots(duration2)
  const seconds = slots2.seconds - slots1.seconds
  const nanoseconds = slots2.nanoseconds - slots1.nanoseconds
  return _slotsToDuration({
    seconds,
    nanoseconds
  }, unit, options)
}

const compare = (duration1, duration2) => {
  const {
    seconds: seconds1,
    nanoseconds: nanoseconds1
  } = toSlots(duration1)
  const {
    seconds: seconds2,
    nanoseconds: nanoseconds2
  } = toSlots(duration2)
  return seconds1 === seconds2 && nanoseconds1 === nanoseconds2 ? 0 :
    seconds1 >= seconds2 && nanoseconds1 >= nanoseconds2 ? 1 : -1
}

const of = (amount, unit) => {
  const slots = convertToSlots(amount, unit)
  return new Duration(slots.seconds, slots.nanoseconds)
}
const ofNanoseconds = nanoseconds => of(nanoseconds, 'nanosecond')
const ofNanos = ofNanoseconds
const ofMicroseconds = microseconds => of(microseconds, 'microsecond')
const ofMicros = ofMicroseconds
const ofMilliseconds = milliseconds => of(milliseconds, 'millisecond')
const ofMillis = ofMilliseconds
const ofSeconds = seconds => of(seconds, 'second')
const ofMinutes = minutes => of(minutes, 'minute')
const ofHours = hours => of(hours, 'hour')
const ofDays = days => of(days, 'day')
const ofWeeks = weeks => of(weeks, 'week')
const ofMonths = months => of(months, 'month')
const ofQuarters = quarters => of(quarters, 'quarter')
const ofYears = years => of(years, 'year')

const _fromParts = parts => {
  const slots = _partsToSlots(parts)
  return new Duration(slots.seconds, slots.nanoseconds)
}
const fromParts = parts => {
  parts = toParts(parts)
  return _fromParts(parts)
}

const from = input => {
  const slots = toSlots(input)
  return new Duration(slots.seconds, slots.nanoseconds)
}

class Duration {
  constructor(...args) {
    const {length} = args
    if (!length) {
      this[secondsSymbol] = 0
      this[nanosecondsSymbol] = 0
    } else if (length === 1) {
      const [duration] = args
      const slots = durationToSlots(duration)
      this[secondsSymbol] = slots.seconds
      this[nanosecondsSymbol] = slots.nanoseconds
    } else {
      const [seconds, nanoseconds] = args
      const slots = wrapSlots({
        seconds,
        nanoseconds
      })
      this[secondsSymbol] = slots.seconds
      this[nanosecondsSymbol] = slots.nanoseconds
    }
  }

  get seconds() {
    return this[secondsSymbol]
  }

  get nanoseconds() {
    return this[nanosecondsSymbol]
  }

  get isZero() {
    return this[secondsSymbol] === 0 && this[nanosecondsSymbol] === 0
  }

  get isNegative() {
    return this[secondsSymbol] < 0 || this[nanosecondsSymbol] < 0
  }

  get sign() {
    const seconds = this[secondsSymbol]
    const nanoseconds = this[nanosecondsSymbol]
    return (seconds > 0 || nanoseconds > 0) ? 1 : (seconds < 0 || nanoseconds < 0) ? -1 : 0
  }

  withSeconds(seconds) {
    return new Duration(seconds, this[nanosecondsSymbol])
  }

  withNanoseconds(nanoseconds) {
    return new Duration(this[secondsSymbol], nanoseconds)
  }

  [addSymbol](...args) {
    let slots = null
    if (args.length > 1) {
      const [amount, unit] = args
      slots = convertToSlots(amount, unit)
    } else {
      const [input] = args
      slots = toSlots(input)
    }
    const seconds = this[secondsSymbol] + slots.seconds
    const nanoseconds = this[nanosecondsSymbol] + slots.nanoseconds
    return new Duration(seconds, nanoseconds)
  }

  add(...args) {
    return FunctionPrototypeApply(this[addSymbol], this, args)
  }

  addNanoseconds(nanoseconds) {
    return this[addSymbol](nanoseconds, 'nanosecond')
  }

  addMicroseconds(microseconds) {
    return this[addSymbol](microseconds, 'microsecond')
  }

  addMilliseconds(milliseconds) {
    return this[addSymbol](milliseconds, 'millisecond')
  }

  addSeconds(seconds) {
    return this[addSymbol](seconds, 'second')
  }

  addMinutes(minutes) {
    return this[addSymbol](minutes, 'minute')
  }

  addHours(hours) {
    return this[addSymbol](hours, 'hour')
  }

  addDays(days) {
    return this[addSymbol](days, 'day')
  }

  addWeeks(weeks) {
    return this[addSymbol](weeks, 'week')
  }

  addMonths(months) {
    return this[addSymbol](months, 'month')
  }

  addQuarters(quarters) {
    return this[addSymbol](quarters, 'quarter')
  }

  addYears(years) {
    return this[addSymbol](years, 'year')
  }

  [subtractSymbol](...args) {
    let slots = null
    if (args.length > 1) {
      const [amount, unit] = args
      slots = convertToSlots(amount, unit)
    } else {
      const [input] = args
      slots = toSlots(input)
    }
    const seconds = this[secondsSymbol] - slots.seconds
    const nanoseconds = this[nanosecondsSymbol] - slots.nanoseconds
    return new Duration(seconds, nanoseconds)
  }

  subtract(...args) {
    return FunctionPrototypeApply(this[subtractSymbol], this, args)
  }

  subtractNanoseconds(nanoseconds) {
    return this[subtractSymbol](nanoseconds, 'nanosecond')
  }

  subtractMicroseconds(microseconds) {
    return this[subtractSymbol](microseconds, 'microsecond')
  }

  subtractMilliseconds(milliseconds) {
    return this[subtractSymbol](milliseconds, 'millisecond')
  }

  subtractSeconds(seconds) {
    return this[subtractSymbol](seconds, 'second')
  }

  subtractMinutes(minutes) {
    return this[subtractSymbol](minutes, 'minute')
  }

  subtractHours(hours) {
    return this[subtractSymbol](hours, 'hour')
  }

  subtractDays(days) {
    return this[subtractSymbol](days, 'day')
  }

  subtractWeeks(weeks) {
    return this[subtractSymbol](weeks, 'week')
  }

  subtractMonths(months) {
    return this[subtractSymbol](months, 'month')
  }

  subtractQuarters(quarters) {
    return this[subtractSymbol](quarters, 'quarter')
  }

  subtractYears(years) {
    return this[subtractSymbol](years, 'year')
  }

  multiply(multiplier) {
    multiplier = TypesToNumber(multiplier)
    if (!NumberIsFinite(multiplier)) {
      throw new RangeError('The multiplier must be a finite number')
    }
    if (!multiplier) {
      throw new RangeError('The multiplier must be greater or less than zero')
    }
    const seconds = this[secondsSymbol] * multiplier
    const nanoseconds = this[nanosecondsSymbol] * multiplier
    return new Duration(seconds, nanoseconds)
  }

  divide(divisor) {
    divisor = TypesToNumber(divisor)
    if (!NumberIsFinite(divisor)) {
      throw new RangeError('The divisor must be a finite number')
    }
    if (!divisor) {
      throw new RangeError('The divisor must be greater or less than zero')
    }
    const seconds = this[secondsSymbol] / divisor
    const nanoseconds = this[nanosecondsSymbol] / divisor
    return new Duration(seconds, nanoseconds)
  }

  negated() {
    return new Duration(-this[secondsSymbol], -this[nanosecondsSymbol])
  }

  abs() {
    let seconds = this[secondsSymbol]
    let nanoseconds = this[nanosecondsSymbol]
    if (seconds < 0) {
      seconds = -seconds
    }
    if (nanoseconds < 0) {
      nanoseconds = -nanoseconds
    }
    return new Duration(seconds, nanoseconds)
  }

  round(options) {
    if (options === undefined) {
      options = {}
    } else if (!TypesIsPlainObject(options)) {
      throw new TypeError('The options must be a plain object')
    }
    let {
      largestUnit,
      smallestUnit,
      units,
      roundingMode
    } = options
    if (units === undefined) {
      largestUnit = largestUnit !== undefined ? toUnit(largestUnit) : 'year'
      smallestUnit = smallestUnit !== undefined ? toUnit(smallestUnit) : 'nanosecond'
    } else {
      units = toAllowedUnits(units)
    }
    roundingMode = roundingMode !== undefined ? toRoundingMode(roundingMode) : ROUNDING_MODE
    const parts = _slotsToParts({
      seconds: this[secondsSymbol],
      nanoseconds: this[nanosecondsSymbol]
    }, {
      largestUnit,
      smallestUnit,
      units,
      rounding: true,
      roundingMode
    })
    return _fromParts(parts)
  }

  between(input) {
    const slots = toSlots(input)
    const seconds = slots.seconds - this[secondsSymbol]
    const nanoseconds = slots.nanoseconds - this[nanosecondsSymbol]
    return new Duration(seconds, nanoseconds)
  }

  compare(input) {
    const {
      seconds: secondsSlot,
      nanoseconds: nanosecondsSlot
    } = toSlots(input)
    const seconds = this[secondsSymbol]
    const nanoseconds = this[nanosecondsSymbol]
    return seconds === secondsSlot && nanoseconds === nanosecondsSlot ? 0 :
      seconds >= secondsSlot && nanoseconds >= nanosecondsSlot ? 1 : -1
  }

  [convertToSymbol](unit, options) {
    if (options !== undefined) {
      options = toConvertOptions(options)
    }
    unit = unit !== undefined ? toUnit(unit) : UNIT
    return _slotsToDuration({
      seconds: this[secondsSymbol],
      nanoseconds: this[nanosecondsSymbol]
    }, unit, options)
  }

  convertTo(unit, options) {
    return this[convertToSymbol](unit, options)
  }

  toNanoseconds(options) {
    return this[convertToSymbol]('nanosecond', options)
  }

  toMicroseconds(options) {
    return this[convertToSymbol]('microsecond', options)
  }

  toMilliseconds(options) {
    return this[convertToSymbol]('millisecond', options)
  }

  toSeconds(options) {
    return this[convertToSymbol]('second', options)
  }

  toMinutes(options) {
    return this[convertToSymbol]('minute', options)
  }

  toHours(options) {
    return this[convertToSymbol]('hour', options)
  }

  toDays(options) {
    return this[convertToSymbol]('day', options)
  }

  toWeeks(options) {
    return this[convertToSymbol]('week', options)
  }

  toMonths(options) {
    return this[convertToSymbol]('month', options)
  }

  toQuarters(options) {
    return this[convertToSymbol]('quarter', options)
  }

  toYears(options) {
    return this[convertToSymbol]('year', options)
  }

  toSlots() {
    return {
      seconds: this[secondsSymbol],
      nanoseconds: this[nanosecondsSymbol]
    }
  }

  toParts(options) {
    options = toPartsOptions(options)
    return _slotsToParts({
      seconds: this[secondsSymbol],
      nanoseconds: this[nanosecondsSymbol]
    }, options)
  }

  toDate() {
    const milliseconds = _slotsToDuration({
      seconds: this[secondsSymbol],
      nanoseconds: this[nanosecondsSymbol]
    }, 'millisecond')
    return new Date(milliseconds)
  }

  [toStringSymbol](options) {
    if (options === undefined) {
      options = {}
    } else if (!TypesIsPlainObject(options)) {
      throw new TypeError('The options must be a plain object')
    }
    let {
      largestUnit,
      smallestUnit,
      units,
      roundingMode
    } = options
    if (units === undefined) {
      largestUnit = largestUnit !== undefined ? toUnit(largestUnit) : 'year'
      smallestUnit = smallestUnit !== undefined ? toUnit(smallestUnit) : 'nanosecond'
    } else {
      units = toAllowedUnits(units)
    }
    roundingMode = roundingMode !== undefined ? toRoundingMode(roundingMode) : ROUNDING_MODE
    let seconds = this[secondsSymbol]
    let nanoseconds = this[nanosecondsSymbol]
    const isNegative = seconds < 0 || nanoseconds < 0
    const parts = _slotsToParts({
      seconds,
      nanoseconds
    }, {
      largestUnit,
      smallestUnit,
      units,
      rounding: true,
      roundingMode
    })
    const {
      years,
      quarters,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds: secondsPart,
      milliseconds,
      microseconds,
      nanoseconds: nanosecondsPart
    } = parts
    let result = 'P'
    if (years) {
      result += `${numberToString(years < 0 ? -years : years)}Y`
    }
    if (quarters) {
      result += `${numberToString(quarters < 0 ? -quarters : quarters)}Q`
    }
    if (months) {
      result += `${numberToString(months < 0 ? -months : months)}M`
    }
    if (weeks) {
      result += `${numberToString(weeks < 0 ? -weeks : weeks)}W`
    }
    if (days) {
      result += `${numberToString(days < 0 ? -days : days)}D`
    }
    if (hours) {
      result += `T${numberToString(hours < 0 ? -hours : hours)}H`
    }
    if (minutes) {
      if (!hours) {
        result += 'T'
      }
      result += `${numberToString(minutes < 0 ? -minutes : minutes)}M`
    }
    if (secondsPart || milliseconds || microseconds || nanosecondsPart) {
      if (!hours && !minutes) {
        result += 'T'
      }
      const duration = _partsToDuration({
        seconds: secondsPart,
        milliseconds,
        microseconds,
        nanoseconds: nanosecondsPart
      }, 'second')
      result += `${numberToString(duration < 0 ? -duration : duration)}S`
    }
    if (result.length === 1) {
      if (
        secondsPart !== undefined ||
        milliseconds !== undefined ||
        microseconds !== undefined ||
        nanosecondsPart !== undefined
      ) {
        result += 'T0S'
      } else if (minutes !== undefined) {
        result += 'T0M'
      } else if (hours !== undefined) {
        result += 'T0H'
      } else if (days !== undefined) {
        result += '0D'
      } else if (weeks !== undefined) {
        result += '0W'
      } else if (months !== undefined) {
        result += '0M'
      } else if (quarters !== undefined) {
        result += '0Q'
      } else if (years !== undefined) {
        result += '0Y'
      }
    } else if (isNegative) {
      result = `${NEGATIVE_CHAR}${result}`
    }
    return result
  }

  toString(options) {
    return this[toStringSymbol](options)
  }

  toJSON() {
    return this[toStringSymbol]()
  }

  toTimeString(options) {
    if (options === undefined) {
      options = {}
    } else if (!TypesIsPlainObject(options)) {
      throw new TypeError('The options must be a plain object')
    }
    let {
      smallestUnit,
      roundingMode,
      signDisplay,
      leadingZeroDisplay,
      secondDisplay,
      trailingZerosDisplay
    } = options
    if (smallestUnit === undefined) {
      smallestUnit = 'second'
    } else {
      smallestUnit = toUnit(smallestUnit)
      const unitIndex = unitLookup[smallestUnit]
      if (unitIndex > 4) {
        smallestUnit = 'minute'
      }
    }
    roundingMode = roundingMode !== undefined ? toRoundingMode(roundingMode) : ROUNDING_MODE
    signDisplay = signDisplay !== undefined ? toDisplayMode(signDisplay) : 'auto'
    leadingZeroDisplay = leadingZeroDisplay !== undefined ? toDisplayMode(leadingZeroDisplay) : 'auto'
    secondDisplay = secondDisplay !== undefined ? toDisplayMode(secondDisplay) : 'always'
    trailingZerosDisplay = trailingZerosDisplay !== undefined ? toDisplayMode(trailingZerosDisplay) : 'always'
    let seconds = this[secondsSymbol]
    let nanoseconds = this[nanosecondsSymbol]
    const isNegative = seconds < 0 || nanoseconds < 0
    const parts = _slotsToParts({
      seconds,
      nanoseconds
    }, {
      largestUnit: 'hour',
      smallestUnit,
      rounding: true,
      roundingMode
    })
    let result = ''
    if (signDisplay !== 'none') {
      if (signDisplay === 'always') {
        result += isNegative ? NEGATIVE_CHAR : POSITIVE_CHAR
      } else if (isNegative) {
        result += NEGATIVE_CHAR
      }
    }
    let {
      hours,
      minutes,
      seconds: secondsPart,
      milliseconds,
      microseconds,
      nanoseconds: nanosecondsPart
    } = parts
    if (hours < 0) {
      hours = -hours
    }
    if (minutes < 0) {
      minutes = -minutes
    }
    result += `${leadingZeroDisplay !== 'none' ? StringPrototypePadStart(hours, 2, 0) : hours}:${StringPrototypePadStart(minutes, 2, 0)}`
    if (secondDisplay !== 'none') {
      let duration = _partsToDuration({
        seconds: secondsPart,
        milliseconds,
        microseconds,
        nanoseconds: nanosecondsPart
      }, 'second')
      if (duration < 0) {
        duration = -duration
      }
      if (secondDisplay === 'always' || secondDisplay === 'auto' && duration) {
        const digits = (
          nanosecondsPart !== undefined ? 9 :
          microseconds !== undefined ? 6 :
          milliseconds !== undefined ? 3 : 0
        )
        result += `:${duration < 10 ? 0 : ''}${trailingZerosDisplay === 'none' ? numberToString(duration, digits) : NumberPrototypeToFixed(duration, digits)}`
      }
    }
    return result
  }

  [valueOfSymbol]() {
    return this[secondsSymbol] + (this[nanosecondsSymbol] / NANOSECONDS_PER_SECOND)
  }

  valueOf() {
    return this[valueOfSymbol]()
  }

  [SymbolToPrimitive](hint) {
    return hint === 'string' ? this[toStringSymbol]() : this[valueOfSymbol]()
  }
}

const isDuration = FunctionPrototypeBind(FunctionPrototypeSymbolHasInstance, null, Duration)

ObjectDefineProperties(Duration, {
  POSITIVE_CHAR: {
    value: POSITIVE_CHAR
  },
  NEGATIVE_CHAR: {
    value: NEGATIVE_CHAR
  },
  SEPARATOR_CHAR: {
    value: SEPARATOR_CHAR
  },
  NANOSECONDS_PER_MICROSECOND: {
    value: NANOSECONDS_PER_MICROSECOND
  },
  MICROSECONDS_PER_MILLISECOND: {
    value: MICROSECONDS_PER_MILLISECOND
  },
  MILLISECONDS_PER_SECOND: {
    value: MILLISECONDS_PER_SECOND
  },
  SECONDS_PER_MINUTE: {
    value: SECONDS_PER_MINUTE
  },
  MINUTES_PER_HOUR: {
    value: MINUTES_PER_HOUR
  },
  HOURS_PER_DAY: {
    value: HOURS_PER_DAY
  },
  DAYS_PER_WEEK: {
    value: DAYS_PER_WEEK
  },
  DAYS_PER_MONTH: {
    value: DAYS_PER_MONTH
  },
  DAYS_PER_YEAR: {
    value: DAYS_PER_YEAR
  },
  WEEKS_PER_MONTH: {
    value: WEEKS_PER_MONTH
  },
  MONTHS_PER_QUARTER: {
    value: MONTHS_PER_QUARTER
  },
  MONTHS_PER_YEAR: {
    value: MONTHS_PER_YEAR
  },
  QUARTERS_PER_YEAR: {
    value: QUARTERS_PER_YEAR
  },
  NANOSECONDS_PER_MILLISECOND: {
    value: NANOSECONDS_PER_MILLISECOND
  },
  NANOSECONDS_PER_SECOND: {
    value: NANOSECONDS_PER_SECOND
  },
  NANOSECONDS_PER_MINUTE: {
    value: NANOSECONDS_PER_MINUTE
  },
  NANOSECONDS_PER_HOUR: {
    value: NANOSECONDS_PER_HOUR
  },
  NANOSECONDS_PER_DAY: {
    value: NANOSECONDS_PER_DAY
  },
  NANOSECONDS_PER_WEEK: {
    value: NANOSECONDS_PER_WEEK
  },
  NANOSECONDS_PER_MONTH: {
    value: NANOSECONDS_PER_MONTH
  },
  NANOSECONDS_PER_QUARTER: {
    value: NANOSECONDS_PER_QUARTER
  },
  NANOSECONDS_PER_YEAR: {
    value: NANOSECONDS_PER_YEAR
  },
  MICROSECONDS_PER_SECOND: {
    value: MICROSECONDS_PER_SECOND
  },
  MICROSECONDS_PER_MINUTE: {
    value: MICROSECONDS_PER_MINUTE
  },
  MICROSECONDS_PER_HOUR: {
    value: MICROSECONDS_PER_HOUR
  },
  MICROSECONDS_PER_DAY: {
    value: MICROSECONDS_PER_DAY
  },
  MICROSECONDS_PER_WEEK: {
    value: MICROSECONDS_PER_WEEK
  },
  MICROSECONDS_PER_MONTH: {
    value: MICROSECONDS_PER_MONTH
  },
  MICROSECONDS_PER_QUARTER: {
    value: MICROSECONDS_PER_QUARTER
  },
  MICROSECONDS_PER_YEAR: {
    value: MICROSECONDS_PER_YEAR
  },
  MILLISECONDS_PER_MINUTE: {
    value: MILLISECONDS_PER_MINUTE
  },
  MILLISECONDS_PER_HOUR: {
    value: MILLISECONDS_PER_HOUR
  },
  MILLISECONDS_PER_DAY: {
    value: MILLISECONDS_PER_DAY
  },
  MILLISECONDS_PER_WEEK: {
    value: MILLISECONDS_PER_WEEK
  },
  MILLISECONDS_PER_MONTH: {
    value: MILLISECONDS_PER_MONTH
  },
  MILLISECONDS_PER_QUARTER: {
    value: MILLISECONDS_PER_QUARTER
  },
  MILLISECONDS_PER_YEAR: {
    value: MILLISECONDS_PER_YEAR
  },
  SECONDS_PER_HOUR: {
    value: SECONDS_PER_HOUR
  },
  SECONDS_PER_DAY: {
    value: SECONDS_PER_DAY
  },
  SECONDS_PER_WEEK: {
    value: SECONDS_PER_WEEK
  },
  SECONDS_PER_MONTH: {
    value: SECONDS_PER_MONTH
  },
  SECONDS_PER_QUARTER: {
    value: SECONDS_PER_QUARTER
  },
  SECONDS_PER_YEAR: {
    value: SECONDS_PER_YEAR
  },
  MINUTES_PER_DAY: {
    value: MINUTES_PER_DAY
  },
  MINUTES_PER_WEEK: {
    value: MINUTES_PER_WEEK
  },
  MINUTES_PER_MONTH: {
    value: MINUTES_PER_MONTH
  },
  MINUTES_PER_QUARTER: {
    value: MINUTES_PER_QUARTER
  },
  MINUTES_PER_YEAR: {
    value: MINUTES_PER_YEAR
  },
  HOURS_PER_WEEK: {
    value: HOURS_PER_WEEK
  },
  HOURS_PER_MONTH: {
    value: HOURS_PER_MONTH
  },
  HOURS_PER_QUARTER: {
    value: HOURS_PER_QUARTER
  },
  HOURS_PER_YEAR: {
    value: HOURS_PER_YEAR
  },
  DAYS_PER_QUARTER: {
    value: DAYS_PER_QUARTER
  },
  WEEKS_PER_QUARTER: {
    value: WEEKS_PER_QUARTER
  },
  WEEKS_PER_YEAR: {
    value: WEEKS_PER_YEAR
  },
  UNIT: {
    value: UNIT
  },
  ROUNDING_MODE: {
    value: ROUNDING_MODE
  },
  isDuration: {
    value: isDuration
  },
  getUnits: {
    value: getUnits
  },
  isUnit: {
    value: isUnit
  },
  toUnit: {
    value: toUnit
  },
  getUnitIndex: {
    value: getUnitIndex
  },
  getRoundingModes: {
    value: getRoundingModes
  },
  isRoundingMode: {
    value: isRoundingMode
  },
  wrapSlots: {
    value: wrapSlots
  },
  getNanosecondNames: {
    value: getNanosecondNames
  },
  getMicrosecondNames: {
    value: getMicrosecondNames
  },
  getMillisecondNames: {
    value: getMillisecondNames
  },
  getSecondNames: {
    value: getSecondNames
  },
  getMinuteNames: {
    value: getMinuteNames
  },
  getHourNames: {
    value: getHourNames
  },
  getDayNames: {
    value: getDayNames
  },
  getWeekNames: {
    value: getWeekNames
  },
  getMonthNames: {
    value: getMonthNames
  },
  getQuarterNames: {
    value: getQuarterNames
  },
  getYearNames: {
    value: getYearNames
  },
  convert: {
    value: convert
  },
  slotsToDuration: {
    value: slotsToDuration,
  },
  slotsToParts: {
    value: slotsToParts
  },
  convertToSlots: {
    value: convertToSlots
  },
  convertToParts: {
    value: convertToParts
  },
  parseUnit: {
    value: parseUnit
  },
  parseUnits: {
    value: parseUnits
  },
  parseUnitsToParts: {
    value: parseUnitsToParts
  },
  parseTime: {
    value: parseTime
  },
  parseTimeToParts: {
    value: parseTimeToParts
  },
  parseDuration: {
    value: parseDuration
  },
  parseDurationToParts: {
    value: parseDurationToParts
  },
  parse: {
    value: parse
  },
  parseToParts: {
    value: parseToParts
  },
  partsToDuration: {
    value: partsToDuration
  },
  partsToSlots: {
    value: partsToSlots
  },
  durationToSlots: {
    value: durationToSlots
  },
  dateToSlots: {
    value: dateToSlots
  },
  toSlots: {
    value: toSlots
  },
  toDuration: {
    value: toDuration
  },
  between: {
    value: between
  },
  compare: {
    value: compare
  },
  of: {
    value: of
  },
  ofNanoseconds: {
    value: ofNanoseconds
  },
  ofNanos: {
    value: ofNanos
  },
  ofMicroseconds: {
    value: ofMicroseconds
  },
  ofMicros: {
    value: ofMicros
  },
  ofMilliseconds: {
    value: ofMilliseconds
  },
  ofMillis: {
    value: ofMillis
  },
  ofSeconds: {
    value: ofSeconds
  },
  ofMinutes: {
    value: ofMinutes
  },
  ofHours: {
    value: ofHours
  },
  ofDays: {
    value: ofDays
  },
  ofWeeks: {
    value: ofWeeks
  },
  ofMonths: {
    value: ofMonths
  },
  ofQuarters: {
    value: ofQuarters
  },
  ofYears: {
    value: ofYears
  },
  fromParts: {
    value: fromParts
  },
  from: {
    value: from
  }
})
ObjectDefineProperties(Duration.prototype, {
  withNanos: {
    value: Duration.prototype.withNanoseconds
  },
  addNanos: {
    value: Duration.prototype.addNanoseconds
  },
  addMicros: {
    value: Duration.prototype.addMicroseconds
  },
  addMillis: {
    value: Duration.prototype.addMilliseconds
  },
  subtractNanos: {
    value: Duration.prototype.subtractNanoseconds
  },
  subtractMicros: {
    value: Duration.prototype.subtractMicroseconds
  },
  subtractMillis: {
    value: Duration.prototype.subtractMilliseconds
  },
  toNanos: {
    value: Duration.prototype.toNanoseconds
  },
  toMicros: {
    value: Duration.prototype.toMicroseconds
  },
  toMillis: {
    value: Duration.prototype.toMilliseconds
  },
  [SymbolToStringTag]: {
    value: 'Duration'
  }
})

module.exports = Duration
