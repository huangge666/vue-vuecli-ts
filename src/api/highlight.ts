import { request } from "@/utils/service";

interface IHighlightRequestData {
  current: number;
  size: number;
  keyword: string;
  startData: string;
  endData: string;
  order: string;
  orderBy: string;
}

/** 登录，返回 token */
export function getHighlightList(params: IHighlightRequestData) {
  return request({
    url: "/bg-style-exhibition",
    method: "GET",
    params,
  });
}
