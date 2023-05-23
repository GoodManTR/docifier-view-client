import axios from 'axios'
import { EXAM_API_URL } from './settings'

export const getDocsRequest = async ({ accessToken }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/Documentation/getDocumentations`,
      {},
      {
        headers: {
          _token: accessToken,
        },
      },
    )

    return { success: true, data: request.data }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}

export const createDocumentation = async ({ title, accessToken }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/Documentation/createDocumentation`,
      {
        alias: title
      },
      {
        headers: {
          _token: accessToken,
        },
      },
    )

    return { success: true, data: request.data }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}

export const deleteDocumentation = async ({ docId, accessToken }) => {
  try {
    const request = await axios.post(
      `${EXAM_API_URL}/Documentation/deleteDocumentation`,
      {
        docId
      },
      {
        headers: {
          _token: accessToken,
        },
      },
    )

    return { success: true, data: request.data }
  } catch (error: any) {
    return { success: false, error: error.response.data }
  }
}