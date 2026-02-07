import moment from "moment";

//今年
export const $year = moment().format("YYYY");

// 去年
export const $oldYear = moment().subtract(1, "year").startOf("year").format("YYYY");

// 当前月
export const $month = moment().format("MM");
// 上个月
export const $preMonth = moment().subtract(1, "month").format("YYYY-MM");

// 今天
export const $today = moment().format("YYYY-MM-DD");

// 当前单日
export const $onetoday = moment().format("DD");

// 明天 T+1
export const $tomorow = moment().add(1, "days").format("YYYY-MM-DD");

// 后天 T+2
export const $aftertomorow = moment().add(2, "days").format("YYYY-MM-DD");

// 昨天  T-1
export const $boforeOneDay = moment().subtract(1, "days").format("YYYY-MM-DD");

// 前天  T-2
export const $boforeTwoDay = moment().subtract(2, "days").format("YYYY-MM-DD");

// 今年 第一天
export const $thisYearFristDay = moment().startOf("year").format("YYYY-MM-DD");

// 今年 第一天
export const $thisYearEndDay = moment().endOf("year").format("YYYY-MM-DD");

//当前 年月
export const $yearMonth = moment().format("YYYY-MM");

//当前季度
export const $quarter = moment().quarter();

// 今天之前
export const boforeToday = (time: Date) => {
  return time.getTime() < moment().subtract(1, "days");
};

//今天之后
export const afterToday = (time: Date) => {
  return time.getTime() > moment().subtract(1, "days");
};

// 返回false or true(今天之前的 不是 上个月的 最后一天)
export const everyMonthNotLastDay = (time: Date) => {
  return (
    moment(time).format("YYYY-MM-DD") !==
      moment(time).endOf("month").format("YYYY-MM-DD") ||
    time.getTime() > moment().subtract(1, "days")
  );
};

// 上个月 第一天
export const $preMonthFirstDay = moment()
  .subtract(1, "month")
  .startOf("month")
  .format("YYYY-MM-DD");

// 上个月 最后一天
export const $preMonthLastDay = moment()
  .subtract(1, "month")
  .endOf("month")
  .format("YYYY-MM-DD");

// 上一年 第一天
export const $preYearFristDay = moment()
  .subtract(1, "year")
  .startOf("year")
  .format("YYYY-MM-DD");

// 上一年 最后一天
export const $preYearLastDay = moment()
  .subtract(1, "year")
  .endOf("year")
  .format("YYYY-MM-DD");

export const startToEndDay = () => {
  let [startDay, endDay] = ["", ""];
  if ($month !== "01") {
    // 今年 第一天 至 上一月最后一天
    startDay = $thisYearFristDay;
    endDay = $preMonthLastDay;
  } else {
    //上一年 第一天 至 上一年最后一天
    startDay = $preYearFristDay;
    endDay = $preYearLastDay;
  }
  return [startDay, endDay];
};

// 今年第一天 至 前天
export const yearFristDayYestoday = () => {
  let [startDay, endDay] = ["", ""];
  if (
    $thisYearFristDay == $boforeOneDay ||
    $thisYearFristDay == $boforeTwoDay
  ) {
    //上一年 第一天 至 上一年最后一天
    startDay = $preYearFristDay;
    endDay = $preYearLastDay;
  } else {
    // 今年第一天 至 前天
    startDay = $thisYearFristDay;
    endDay = $boforeTwoDay;
  }
  return [startDay, endDay];
};

export const DateFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

//一个月前的今天
export const preMonthToday = moment(new Date()).subtract(1,'months').format('YYYY-MM-DD')

