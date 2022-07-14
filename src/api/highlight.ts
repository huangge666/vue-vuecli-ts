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

interface IBgStyleExhibitionData {
  title: string;
}

/** 获取风采列表 */
export function getHighlightList(params: IHighlightRequestData) {
  return request({
    url: "/bg-style-exhibition",
    method: "GET",
    params,
  });
}

/** 获取风采详情 */
export function getHighlightInfo(id: string) {
  return request({
    url: `/bg-style-exhibition/${id}`,
    method: "GET",
  });
}

/* 新增风采列表 */
export const addBgStyleExhibition = (data: IBgStyleExhibitionData) =>
  request({
    url: "/bg-style-exhibition",
    method: "POST",
    data,
  });

/* 编辑风采列表 */
export const editBgStyleExhibition = (
  data: IBgStyleExhibitionData,
  id: string
) =>
  request({
    url: `/bg-style-exhibition/${id}`,
    method: "POST",
    data,
  });

/* 删除风采列表 */
export const delBgStyleExhibition = (ids: string[]) =>
  request({
    url: "/bg-style-exhibition",
    method: "DELETE",
    data: {
      id: ids,
    },
  });
