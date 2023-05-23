import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Link,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from '../../../components/scrollbar';
import { useAuthContext } from '../../../contexts/auth-context';

export const OverviewLatestOrders = (props) => {
  const { docs = [], sx } = props;
  const auth = useAuthContext() as any;
  
  const handleSubmit = async (docId: string) => {
    await auth.deleteDoc(docId)

    window.location.reload()
  }

  return (
    <Card sx={sx}>
      <CardHeader title="My Documentations" />

      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Doc ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {docs.map((doc) => {
                return (
                  <TableRow hover key={doc.docId}>
                    <TableCell>
                      <Button
                        color="primary"
                        endIcon={
                          <SvgIcon fontSize="small">
                            <ArrowRightIcon />
                          </SvgIcon>
                        }
                        size="small"
                        variant="text"
                        href={`/docs/overview?id=${doc.docId}`}
                      >
                        {doc.alias}
                      </Button>
                    </TableCell>
                    <TableCell>{doc.docId}</TableCell>
                    <TableCell>
                      <Button
                        color="inherit"
                        endIcon={
                          <SvgIcon fontSize="small">
                            <TrashIcon />
                          </SvgIcon>
                        }
                        size="small"
                        variant="text"
                        onClick={() => {
                          handleSubmit(doc.docId)
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {docs.length === 0 && <>You dont have any documentations yet.</>}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          onClick={() => { window.location.href = '/createDoc'}}
        >
          Create Documentation
        </Button>
      </CardActions>
    </Card>
  )
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
