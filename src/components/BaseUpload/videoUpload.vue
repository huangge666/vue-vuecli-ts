<template>
  <el-dialog v-model="dialogVisible"
             :title="`${parameter.title}`"
             :destroy-on-close="true"
             width="580px"
             draggable>
    <el-form class="drawer-multiColumn-form"
             label-width="100px">
      <el-form-item label="文件上传 :">
        <el-upload action="string"
                   class="upload"
                   :drag="true"
                   :limit="excelLimit"
                   :multiple="true"
                   :show-file-list="true"
                   :http-request="uploadFile"
                   :before-upload="beforeExcelUpload"
                   :on-exceed="handleExceed"
                   :on-success="excelUploadSuccess"
                   :on-error="excelUploadError"
                   accept=".mp4">
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <template #tip>
            <div class="el-upload__tip">请上传 .mp4 标准格式文件</div>
          </template>
        </el-upload>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts" name="BaseUploadVideo">
import { ref } from "vue";
import { ElNotification } from "element-plus";
import { UploadFilled } from '@element-plus/icons-vue'
import { uploadFile as uploadFileFn } from "@/api/common";
import { ElLoading } from 'element-plus'

const emits = defineEmits(["on-success"]);

export interface ExcelParameterProps {
	title: string; // 标题
}

// 最大文件上传数
const excelLimit = ref(1);
// dialog状态
const dialogVisible = ref(false);
// 父组件传过来的参数
const parameter = ref<Partial<ExcelParameterProps>>({});
// 接收父组件参数
const acceptParams = (params?: any): void => {
	parameter.value = params;
	dialogVisible.value = true;
};

// 文件上传
const uploadFile = async (param: any) => {
	let excelFormData = new FormData();
	excelFormData.append("file", param.file);
	excelFormData.append("CustomerID", "178");

  const loading = ElLoading.service({
    lock: true,
    text: '上传中~~~',
    background: 'rgba(0, 0, 0, 0.7)',
    body:  true,
  })
	const result: any = await uploadFileFn(excelFormData);
  emits("on-success", result.Data.URL);
  loading.close();

	dialogVisible.value = false;
};

/**
 * @description 文件上传之前判断
 * @param file 上传的文件
 * */
const beforeExcelUpload = (file: any) => {
  const isVideo = file.type === "video/mp4";
	const isLt5M = file.size / 1024 / 1024 < 50;
	if (!isVideo)
		ElNotification({
			title: "温馨提示",
			message: "上传文件只能是 mp4 格式！",
			type: "warning"
		});
	if (!isLt5M)
		ElNotification({
			title: "温馨提示",
			message: "上传文件大小不能超过 50MB！",
			type: "warning"
		});
	return isVideo && isLt5M;
};

// 文件数超出提示
const handleExceed = (): void => {
	ElNotification({
		title: "温馨提示",
		message: "最多只能上传一个文件！",
		type: "warning"
	});
};
// 上传错误提示
const excelUploadError = (): void => {
	ElNotification({
		title: "温馨提示",
		message: "上传失败，请您重新上传！",
		type: "error"
	});
};
// 上传成功提示
const excelUploadSuccess = (): void => {
	ElNotification({
		title: "温馨提示",
		message: "上传成功！",
		type: "success"
	});
};
defineExpose({
	acceptParams
});
</script>
<style lang="scss" scoped>
.upload {
  width: 80%;
}
</style>
