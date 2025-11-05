import { useState } from "react";

interface InlineEditableTextClassNames {
    container?: string;
    input?: string;
    textarea?: string;
    span?: string;
}

interface InlineEditableTextProperties {
    initText: string;
    onChange?: (data: string) => void;
    onBlur?: () => void;
    initEditing?: boolean;
    editingAllow?: boolean;
    limit?: number;
    numberOnly?: boolean;
    wrap?: boolean;
    className?: string;
    classNames?: InlineEditableTextClassNames;
}

export default function InlineEditableText({ initText = '', onChange, onBlur, limit, wrap = false, numberOnly = false, initEditing = false, editingAllow = true, classNames = { container: '', input: '', span: '', textarea: '' } }: InlineEditableTextProperties) {
  const [text, setText] = useState(initText.slice(0, limit));
  const [editing, setEditing] = useState(initEditing);

  return (
    <div className={`${wrap && 'flex h-full min-h-0'} ${classNames.container}`}>
      {editing && editingAllow ? (
        !wrap ?
        <input
          autoFocus
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); onChange?.(e.target.value); }}
          onBlur={(_) => { setEditing(false); onBlur?.(); }}
          className={`border-b-2 border-active-bar bg-transparent focus:outline-none text-left ${classNames.input}`}
          maxLength={limit}
          onKeyDown={(event) => {
            if (numberOnly && event.key != "Backspace" && !/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        /> :
        <textarea
          className={`block outline-0 resize-none overflow-hidden field-sizing-content w-full ${classNames.textarea}`}
          autoFocus
          value={text}
          onChange={(e) => { setText(e.target.value) }}>
        </textarea>
        
      ) : (
        <span
          onClick={() => setEditing(true)}
          className={`transition-colors whitespace-normal ${wrap && 'break-words'} ${classNames.span}`}
        >
          {text == '' ? 'Введите текст' : text}
        </span>
      )}
    </div>
  );
}