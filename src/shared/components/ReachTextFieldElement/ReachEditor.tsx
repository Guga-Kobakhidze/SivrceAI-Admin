import { toast } from 'react-toastify'
import { Editor } from 'react-draft-wysiwyg'
import { useEffect, useState } from 'react'
import { FormControl, FormLabel } from '@mui/material'
import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import MDEditorRoot from './MDEditorRoot'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

type RichEditorProps = {
  onChange: (htmlContent: string) => void
  label?: string
  defaultValue?: string
  isSubmited?: boolean
}

if (typeof global === 'undefined') {
  global = window
}

const RichEditor: React.FC<RichEditorProps> = ({
  onChange,
  label = '',
  defaultValue = '',
  isSubmited,
}) => {
  const [editorState, setEditorState] = useState(() => {
    if (defaultValue) {
      const { contentBlocks, entityMap } = htmlToDraft(defaultValue)
      return EditorState.createWithContent(
        ContentState.createFromBlockArray(contentBlocks, entityMap),
      )
    }

    return EditorState.createEmpty()
  })

  useEffect(() => {
    if (isSubmited) setEditorState(EditorState.createEmpty())
  }, [isSubmited])

  const handlePastedText = (
    _: any,
    html: string,
    editorState: EditorState,
    onChange: (editorState: EditorState) => void,
  ): boolean => {
    if (html && html.indexOf('<img') !== -1) {
      const contentState = editorState.getCurrentContent()
      const contentStateWithEntity = contentState.createEntity(
        'IMAGE',
        'IMMUTABLE',
        { src: html },
      )
      const newEditorState = EditorState.push(
        editorState,
        contentStateWithEntity,
        'insert-characters',
      )
      onChange(newEditorState)
      toast.error(
        'You cant paste image, please use image uploader in text editor',
      )
      return true
    }
    return false
  }

  return (
    <MDEditorRoot>
      <FormControl sx={{ width: '100%' }}>
        <FormLabel sx={{ mt: '2px', mb: 0.5 }}>{label}</FormLabel>
        <Editor
          editorStyle={{ height: '15em' }}
          editorState={editorState}
          onEditorStateChange={newState => {
            onChange(draftToHtml(convertToRaw(newState.getCurrentContent())))
            setEditorState(newState)
          }}
          handlePastedText={handlePastedText}
        />
      </FormControl>
    </MDEditorRoot>
  )
}

export default RichEditor
