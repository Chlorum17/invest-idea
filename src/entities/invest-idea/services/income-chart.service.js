'use strict';

const incomeChartService = {
  getPeriodLimits(period) {
    const { timeHourAgo, timeDayAgo, timeWeekAgo, timeMonthAgo, timeYearAgo } =
      this._getTimePeriodsAgo();

    let startOfPeriod = timeHourAgo;
    let endOfPeriod = new Date();

    if (period === 'day') {
      startOfPeriod = timeDayAgo;
      endOfPeriod = timeHourAgo;
    }

    if (period === 'week') {
      startOfPeriod = timeWeekAgo;
      endOfPeriod = timeDayAgo;
    }

    if (period === 'month') {
      startOfPeriod = timeMonthAgo;
      endOfPeriod = timeWeekAgo;
    }

    if (period === 'year') {
      startOfPeriod = timeYearAgo;
      endOfPeriod = timeMonthAgo;
    }

    return { startOfPeriod, endOfPeriod };
  },

  _getTimePeriodsAgo() {
    const HOUR_IN_MILLISEC = 60 * 60 * 1000;
    const DAY_IN_MILLISEC = HOUR_IN_MILLISEC * 24;
    const WEEK_IN_MILLISEC = DAY_IN_MILLISEC * 7;
    const MONTH_IN_MILLISEC = DAY_IN_MILLISEC * 30;
    const YEARS_IN_MILLISEC = 365 * DAY_IN_MILLISEC;

    const dateNow = Date.now();

    return {
      timeHourAgo: new Date(dateNow - HOUR_IN_MILLISEC),
      timeDayAgo: new Date(dateNow - DAY_IN_MILLISEC),
      timeWeekAgo: new Date(dateNow - WEEK_IN_MILLISEC),
      timeMonthAgo: new Date(dateNow - MONTH_IN_MILLISEC),
      timeYearAgo: new Date(dateNow - YEARS_IN_MILLISEC),
    };
  },
};

module.exports = incomeChartService;
