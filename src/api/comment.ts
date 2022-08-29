import { request } from "@/utils/service";

interface ICommentRequestData {
  current: number;
  size: number;
  keyword?: string;
  startData?: string;
  endData?: string;
  order?: string;
  orderBy?: string;
  status?: string;
}

/** 获取评论列表 */
export function getCommentList(params: ICommentRequestData) {
  return request({
    url: "/bg-comment",
    method: "GET",
    params,
  });
}

interface updateCommentRequestData {
  id: string[];
  status: string;
}

/* 更新评论状态 */
export const updateComment = (data: updateCommentRequestData) =>
  request({
    url: "/bg-comment/status",
    method: "POST",
    data,
  });

/* 删除评论 */
export const delComment = (ids: string[]) =>
  request({
    url: "/bg-comment",
    method: "DELETE",
    data: {
      id: ids,
    },
  });
