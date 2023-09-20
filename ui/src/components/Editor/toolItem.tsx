import { FC, useContext, useEffect } from 'react';
import { Dropdown, Button } from 'react-bootstrap';

import { EditorContext } from './EditorContext';
import { IEditorContext } from './types';

interface IProps {
  keyMap?: string[];
  onClick?: ({
    editor,
    wrapText,
    replaceLines,
    appendBlock,
  }: IEditorContext) => void;
  tip?: string;
  className?: string;
  as?: any;
  children?;
  label?: string;
  disable?: boolean;
  isShow?: boolean;
  onBlur?: ({
    editor,
    wrapText,
    replaceLines,
    appendBlock,
  }: IEditorContext) => void;
}
const ToolItem: FC<IProps> = (props) => {
  const editor = useContext(EditorContext);

  const {
    label,
    tip,
    disable = false,
    isShow,
    keyMap,
    onClick,
    className,
    as,
    children,
    onBlur,
  } = props;

  useEffect(() => {
    if (!editor) {
      return;
    }
    if (!keyMap) {
      return;
    }

    keyMap.forEach((key) => {
      editor?.addKeyMap({
        [key]: () => {
          onClick?.({
            editor,
            wrapText: editor?.wrapText,
            replaceLines: editor?.replaceLines,
            appendBlock: editor?.appendBlock,
          });
        },
      });
    });
  }, [editor]);

  const btnRender = () => (
    <Button
      variant="link"
      title={tip}
      className={`p-0 b-0 btn-no-border toolbar icon-${label} ${
        disable ? 'disabled' : ''
      } `}
      disabled={disable}
      tabIndex={-1}
      onClick={(e) => {
        e.preventDefault();
        onClick?.({
          editor,
          wrapText: editor?.wrapText,
          replaceLines: editor?.replaceLines,
          appendBlock: editor?.appendBlock,
        });
      }}
      onBlur={(e) => {
        e.preventDefault();
        onBlur?.({
          editor,
          wrapText: editor?.wrapText,
          replaceLines: editor?.replaceLines,
          appendBlock: editor?.appendBlock,
        });
      }}
    />
  );

  if (!editor) {
    return null;
  }
  return (
    <div className={`toolbar-item-wrap ${className || ''}`}>
      {as === 'dropdown' ? (
        <Dropdown className="h-100 w-100" show={isShow}>
          <Dropdown.Toggle as="div" className="h-100">
            {btnRender()}
          </Dropdown.Toggle>
          {children}
        </Dropdown>
      ) : (
        <>
          {btnRender()}
          {children}
        </>
      )}
    </div>
  );
};

export default ToolItem;
