/* eslint-disable @next/next/no-img-element */
'use client';
import React, {useState} from 'react';

import {PlusOutlined} from '@ant-design/icons';
import {message, Modal, Upload} from 'antd';
import {v4} from 'uuid';

import {getPostImgUrl, uploadImg} from '@/app/src/api/admin';

import type {RcFile, UploadProps} from 'antd/es/upload';
import type {UploadFile} from 'antd/es/upload/interface';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => {
      return reject(error);
    };
  });

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

export function UploadBox({images}: {images: string[]}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleFileUpload = async ({file, onSuccess}: any) => {
    const imgName = v4();
    const img = {
      imgName,
      imgFile: file,
    };
    await uploadImg(img);
    onSuccess();
    images.push(getPostImgUrl(imgName));
  };

  const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        customRequest={handleFileUpload}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple
        maxCount={10}
        accept="image/*"
        beforeUpload={beforeUpload}>
        {fileList.length >= 10 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{width: '100%'}} src={previewImage} />
      </Modal>
    </>
  );
}

export default UploadBox;
