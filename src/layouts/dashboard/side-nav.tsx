import PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "../../components/logo";
import { Scrollbar } from "../../components/scrollbar";
import { documentations, userTabs } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/auth-context";
import { useLocation } from "react-router-dom";
import { Tree } from 'react-arborist';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TextSnippet from '@mui/icons-material/Description'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {useParams} from "react-router-dom";

export const SideNav = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const auth = useAuthContext() as any;
  const [docTree, setDocTree] = useState() as any
  const {id, sheet: sheetId} = useParams();

  const convertDocTreeItemToData = (docTreeItem) => {
    const { itemId, name, children, itemType } = docTreeItem
    const data = {
      id: itemId,
      name,
    } as any

    if (children && children.length > 0) {
      data.children = children.map(convertDocTreeItemToData)
    }

    return data
  }
  
  useEffect(() => {
    async function getDocTree() {
      const docTreeRes = await auth.getDocTree(id)

      setDocTree(docTreeRes.tree.map(convertDocTreeItemToData))
    }

    getDocTree()
  }, [])

  function Node({ node, style, dragHandle }) {
    return (
      <ButtonBase
        style={style}
        ref={dragHandle}
        onClick={(event) => {
          event.stopPropagation()
          node.toggle()
          if (node.isLeaf) {
            window.location.href = `/${id}/${node.data.id}`
          }
        }}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...((node.isSelected || node.data.id === sheetId) && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        }}
      >
        <Box
          component="span"
          sx={{
            alignItems: 'center',
            color: 'neutral.400',
            display: 'inline-flex',
            justifyContent: 'center',
            mr: 2,
            ...((node.isSelected || node.data.id === sheetId) &&
              !node.isInternal && {
                color: 'primary.main',
              }),
          }}
        >
          {node.isInternal && node.isOpen && <ArrowDropDownIcon />}
          {node.isInternal && !node.isOpen && <ArrowRightIcon />}
          {node.isLeaf && <TextSnippet fontSize="small" />}
        </Box>
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...((node.isSelected || node.data.id === sheetId) &&
              !node.isInternal && {
                color: 'primary.main',
              }),
          }}
        >
          {node.data.name}
        </Box>
      </ButtonBase>
    )
  }

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
          Docifier
        </Box>
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            <Stack
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="inherit" variant="subtitle1">
                Doc Name
              </Typography>
            </Stack>
              <Tree initialData={docTree} openByDefault={false} width={275} height={600} indent={24} rowHeight={36} overscanCount={1} paddingTop={30} paddingBottom={10} padding={25 /* sets both */}>
                {Node as any}
              </Tree>
          </Stack>
        </Box>


      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
