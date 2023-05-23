import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon'
import UserIcon from '@heroicons/react/24/solid/UserIcon'
import HomeIcon from '@heroicons/react/24/solid/HomeIcon'
import DocumentPlusIcon from '@heroicons/react/24/solid/DocumentPlusIcon'
import { SvgIcon } from '@mui/material'

export const documentations = (docs: any[]) => {
  return docs.map((doc) => ({
      type: 'documentation',
      docId: doc.docId,
      title: doc.alias,
      path: `/docs/overview?id=${doc.docId}`,
      icon: (
        <SvgIcon fontSize="small">
          <DocumentTextIcon />
        </SvgIcon>
      ),
    }))
  
}

export const userTabs = [
  {
    type: 'userTab',
    title: 'Homepage',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <HomeIcon />
      </SvgIcon>
    ),
  },
  {
    type: 'userTab',
    title: 'Create Documentation',
    path: '/createDoc',
    icon: (
      <SvgIcon fontSize="small">
        <DocumentPlusIcon />
      </SvgIcon>
    ),
  },
  {
    type: 'userTab',
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
]

export const courses = [
  {
    id: 'COME125',
    name: 'Introduction to Computer Science',
  },
  {
    id: 'COME225',
    name: 'Data Structures and Algorithms',
  },
  {
    id: 'COME325',
    name: 'Database Systems',
  },
  {
    id: 'COME425',
    name: 'Software Engineering',
  },
  {
    id: 'COME525',
    name: 'Artificial Intelligence',
  },
  {
    id: 'COME625',
    name: 'Computer Networks',
  },
  {
    id: 'COME725',
    name: 'Computer Security',
  },
  {
    id: 'COME825',
    name: 'Distributed Systems',
  },
  {
    id: 'COME925',
    name: 'Cloud Computing',
  },
  {
    id: 'COME1025',
    name: 'Machine Learning',
  },
  {
    id: 'COME1125',
    name: 'Mobile Application Development',
  },
  {
    id: 'COME1225',
    name: 'Web Development',
  },
  {
    id: 'COME1325',
    name: 'Computer Graphics',
  },
  {
    id: 'COME1425',
    name: 'Human-Computer Interaction',
  },
  {
    id: 'COME1525',
    name: 'Natural Language Processing',
  },
]
