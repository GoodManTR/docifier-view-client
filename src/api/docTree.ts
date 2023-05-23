import axios from 'axios'
import { EXAM_API_URL } from './settings'

export const getDocumentationTreeReq = async ({ docId }) => {
    try {
      const request = await axios.post(
        `${EXAM_API_URL}/Documentation/getDocumentationTree`,
        {
            docId
        }
      )
  
      return { success: true, data: request.data }
    } catch (error: any) {
      return { success: false, error: error.response.data }
    }
  }