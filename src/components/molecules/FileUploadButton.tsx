import { IconButton } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
// import Api from '../../utils/api.js';
import Icon from '../atoms/Icon.js';
// import APIClient from '../../utils/APIClient.js';

interface FileUploadButtonProps {
  className?: string;
  color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
  Component?: any;
  disabled?: boolean;
}

// @deprecated
export default function FileUploadButton(props?: FileUploadButtonProps) {
  const fileRef = useRef<any>();
  const [file, setFile] = useState<any>();
  const { Component } = props || {};

  useEffect(() => {
    if (file) {
      // Api.Post(`/api/upload`, { file }, false).then(() => setFile(undefined));
    }
  }, [file]);

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        name="uploadFile"
        onChange={(a) => {
          setFile(a.target.files?.[0]);
        }}
        style={{ display: 'none' }}
      />
      {Component ? (
        <Component onClick={() => fileRef?.current?.click()} />
      ) : (
        <IconButton
          disabled={props?.disabled}
          size="small"
          className={props?.className}
          color={props?.color || 'primary'}
          onClick={() => fileRef?.current?.click()}>
          <Icon.Upload />
        </IconButton>
      )}
    </>
  );
}
