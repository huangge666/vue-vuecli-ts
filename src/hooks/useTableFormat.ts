// import { ref } from "vue";
import dayjs from "dayjs";

const datetimeFormat = (a: any, b: any, c: string, d: number) => {
  if (!c) {
    return `--`;
  }
  const date = new Date(+c);
  return dayjs(date).format("YYYY-MM-DD HH:mm");
};

export { datetimeFormat };
