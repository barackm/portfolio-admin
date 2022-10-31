import { useFormikContext } from 'formik';
import Image from 'next/image';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Tooltip from '../Tooltip';
import { getFileSize } from '../../../utlis/files';

interface FileUploadDropzoneProps {
  label?: string;
  name: string;
  error?: string;
  usesFormik?: boolean;
  value?: string;
  onChange?: (e: any) => void;
  isMulti?: boolean;
}

const FileUploadDropzone = (props: FileUploadDropzoneProps) => {
  const { label, name, error, usesFormik, value, onChange, isMulti } = props;
  const {
    values,
    handleChange,
    setFieldTouched,
    errors,
    touched,
    setFieldValue,
  } = useFormikContext() || {};
  const inpurError =
    touched &&
    touched[name as keyof typeof errors] &&
    errors &&
    errors[name as keyof typeof errors];

  const onDrop = useCallback((acceptedFiles: any) => {
    handleAddFile(acceptedFiles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    //   @ts-ignore
    accept: 'image/*',
    multiple: isMulti,
  });

  const formikValue = values && values[name as keyof typeof values];
  const formattedFiles = usesFormik
    ? Array.isArray(formikValue)
      ? formikValue
      : formikValue
      ? [formikValue]
      : []
    : Array.isArray(value)
    ? value
    : value
    ? [value]
    : [];

  const handleRemoveFile = (file: any) => {
    const newFiles =
      formattedFiles && formattedFiles.filter((f: any) => f.name !== file.name);
    if (usesFormik) {
      setFieldValue(name, newFiles);
    } else {
      onChange &&
        onChange({
          target: {
            name,
            value: newFiles,
          },
        });
    }
  };

  const handleAddFile = (acceptedFiles: any) => {
    const newFiles = [...formattedFiles, ...acceptedFiles];
    if (usesFormik) {
      setFieldValue(name, newFiles);
    } else {
      onChange &&
        onChange({
          target: {
            name,
            value: newFiles,
          },
        });
    }
  };

  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className='block text-md mb-1 font-[400] text-gray-700'
        >
          {label}
        </label>
      )}
      <div
        {...getRootProps()}
        className={`border border-solid border-gray-300 p-3 rounded-xl min-h-[10rem] bg-[#f8f9fa] flex items-center ${
          error || inpurError
            ? 'focus:shadow-soft-primary-error-outline'
            : 'focus:shadow-soft-primary-outline'
        }`}
      >
        <input {...getInputProps()} />
        {!formattedFiles.length && (
          <div className='flex justify-center items-center w-full'>
            {isDragActive ? (
              <p className='text-blue-500 flex flex-col items-center'>
                <CloudUploadIcon className='text-4xl' />
                <span>Drop the files here ...</span>
              </p>
            ) : (
              <p className='flex flex-col items-center'>
                <CloudUploadIcon className='text-4xl text-slate-600' />
                <span className='text-slate-600'>
                  Drag and drop some files here, or click to select files
                </span>
              </p>
            )}
          </div>
        )}
        <ul className='flex gap-4'>
          {formattedFiles.map((file: any) => (
            <li
              key={file.path}
              className='flex flex-col z-100 bg-slate-200 p-2 rounded-xl'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className='flex flex-col w-[120px] justify-center items-center rounded-xl overflow-hidden relative'>
                <div className='absolute z-100 w-full flex flex-col items-center'>
                  <span className='text-gray-DEFAULT-50 p-1 text-xs bg-gray-600 rounded-1'>
                    {getFileSize(file.size) || 'Unknown size'}
                  </span>
                  <div className='w-[95%] h-5 bg-gray-500 mt-2 rounded-[2px] px-1 flex items-center overflow-hidden'>
                    <Tooltip title={file.name}>
                      <span className='text-sm font-light flex w-full whitespace-nowrap overflow-hidden overflow-ellipsis '>
                        {file.name}
                      </span>
                    </Tooltip>
                  </div>
                </div>
                <Image
                  src={
                    file.path && file.path.startsWith('http')
                      ? file.path
                      : URL.createObjectURL(file)
                  }
                  alt={file.name}
                  width={120}
                  height={120}
                />
              </div>
              <button
                type='button'
                className='text-primaryColor hover:text-secondaryColor transition-all ease-soft'
                onClick={() => handleRemoveFile(file)}
              >
                Remove File
              </button>
            </li>
          ))}
        </ul>
      </div>
      {(inpurError || error) && (
        <p className='text-sm text-red-600 mb-0' id='email-error'>
          {inpurError || error}
        </p>
      )}
    </div>
  );
};

FileUploadDropzone.defaultProps = {
  widthAuto: true,
  name: 'text-input',
  id: 'text-input',
  type: 'text',
  placeholder: 'Enter text',
  value: '',
  label: '',
  onChange: () => {},
  disabled: false,
  usesFormik: true,
  isMulti: false,
};
export default FileUploadDropzone;
