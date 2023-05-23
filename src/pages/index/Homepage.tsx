import { Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Unstable_Grid2 as Grid, Tab } from '@mui/material'
// import { OverviewLatestOrders } from '../sections/overview/documentations';
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/auth-context'
import { OverviewLatestOrders } from './sections/documentations'
import { MainLayout } from '../../layouts/dashboard/layout'
import { useParams } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build-goodmantr194'
import { EditorConfig } from '@ckeditor/ckeditor5-core'
import Prism from 'prismjs'
const now = new Date()

const Homepage = () => {
  const auth = useAuthContext() as any
  const [editorData, setEditorData] = useState('')
  const { id, sheet } = useParams()

  useEffect(() => {
    document.title = 'Docifier - Homepage'

    const getDocSheetEffect = async () => {
      const data = await auth.getDocSheet(id, sheet)
      setEditorData(data.data || '')
    }
    getDocSheetEffect()
  })

  const editorConfiguration: EditorConfig = {
    toolbar: [],
    placeholder: 'loading...',
  }

  return (
    <MainLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 0.1,
          px: 5,
        }}
      >
        <Card sx={{padding: 3}}>
          <CardHeader subheader="Current Document" title={'Doc Name TODO'} />
          <CardContent>
          <CKEditor
          editor={Editor}
          config={editorConfiguration}
          data={editorData}
          onReady={(editor) => {
            editor.enableReadOnlyMode('readOnly')
            Prism.highlightAll();
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor)
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor)
          }}
        />
          </CardContent>
        </Card>
      </Box>
    </MainLayout>
  )
}

export default Homepage
