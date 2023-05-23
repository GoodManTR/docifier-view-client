import axios from 'axios'
import { EXAM_API_URL } from './settings'

export const getDocumentationSheetReq = async ({ docId, sheetId }) => {
    try {
      const request = await axios.post(
        `${EXAM_API_URL}/Documentation/getDocumentationSheet`,
        {
            docId,
            sheetId
        }
      )
  
      return { success: true, data: request.data }
    } catch (error: any) {
      return { success: false, error: error.response.data }
    }
}

export const saveDocumentationSheetReq = async ({ docId, sheetId, data }) => {
    try {
      const request = await axios.post(
        `${EXAM_API_URL}/Documentation/saveDocumentationSheet`,
        {
            docId,
            sheetId,
            data
        }
      )
  
      return { success: true, data: request.data }
    } catch (error: any) {
      return { success: false, error: error.response.data }
    }
}