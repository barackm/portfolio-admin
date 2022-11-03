import React from 'react';
import { useCallback, useEffect, useState } from 'react';
// @ts-ignore
const Quill = typeof window === 'object' ? require('quill') : () => false;
import 'quill/dist/quill.snow.css';

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  [{ align: [] }],
  ['image', 'blockquote', 'code-block'],
  ['clean'],
];

const Editor = () => {
  const [quill, setQuill] = useState();

  const wrapperRef = useCallback((wrapper: any) => {
    if (wrapper == null) return;

    wrapper.innerHTML = '';
    const editor = document?.createElement('div');
    wrapper.append(editor);
    if (document && document.readyState === 'complete') {
      const q = new Quill(editor, {
        theme: 'snow',
        modules: { toolbar: TOOLBAR_OPTIONS },
      });
      // q.disable();
      // q.setText('Loading...');
      // setQuill(q);
    }
  }, []);

  return (
    <div className='my-5'>
      <div className='flex flex-col' ref={wrapperRef}></div>
    </div>
  );
};

export default Editor;
