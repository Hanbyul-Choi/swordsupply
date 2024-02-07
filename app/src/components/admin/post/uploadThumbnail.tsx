import type {Dispatch, SetStateAction} from 'react';
import React from 'react';

import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload} from 'antd';
import {v4} from 'uuid';

const beforeUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file.size > 2 * 1024 * 1024) {
      reject('2MB 미만의 사진만 업로드가 가능합니다.');
      message.error('2MB 미만의 사진만 업로드가 가능합니다.');
    } else {
      resolve('Success');
    }
  });
};

import {getPostImgUrl, uploadImg} from '@/app/src/api/admin';

function UploadThumbnail({
  setThumbnail,
  defaultImg,
}: {
  setThumbnail: Dispatch<SetStateAction<string>>;
  defaultImg?: string;
}) {
  const handleFileUpload = async ({file, onSuccess}: any) => {
    const imgName = v4();
    const img = {
      imgName,
      imgFile: file,
    };
    await uploadImg(img);
    onSuccess();
    setThumbnail(getPostImgUrl(imgName));
  };
  return (
    <Upload
      customRequest={handleFileUpload}
      listType="picture"
      maxCount={1}
      beforeUpload={beforeUpload}
      accept="image/*"
      defaultFileList={
        defaultImg
          ? [
              {
                uid: '1',
                name: 'Thumbnail',
                status: 'done',
                url: defaultImg,
              },
            ]
          : []
      }>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
}

export default UploadThumbnail;
