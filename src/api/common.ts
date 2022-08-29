import { request } from "@/utils/service";
import { useEnumStore } from "@/store/modules/enum";
const enumsStore = useEnumStore();

export interface enumModel {
  code: number;
  dese: string;
  enumType: string;
}

const getEumes = () =>
  request({
    url: "/enum",
    method: "GET",
  });

export const getEumeList = async () => {
  if (JSON.stringify(enumsStore.enums) !== "{}") {
    return enumsStore.enums;
  }
  const { data } = await getEumes();
  enumsStore.setEnums(data);
  return data;
};

export const getEumeByKey = async (key: string) => {
  const temp = await getEumeList();
  return temp[key];
};
