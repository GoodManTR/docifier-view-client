import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import { loginRequest, logoutRequest } from "../api/auth";
import { createDocumentation, deleteDocumentation, getDocsRequest } from "../api/documentation";
import { getDocumentationTreeReq } from "../api/docTree";
import { getDocumentationSheetReq, saveDocumentationSheetReq } from "../api/docSheet";

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const { children } = props;

  const getDocTree = async (docId: string) => {
    const request = await getDocumentationTreeReq({ docId });

    if (request.success === false) {
      console.log(request.error.message);
    }
    
    return request.data;
  };

  const getDocSheet = async (docId: string, sheetId: string) => {
    const request = await getDocumentationSheetReq({ docId, sheetId });

    if (request.success === false) {
      console.log(request.error.message);
    }
    
    return request.data;
  };

  const saveDocSheet = async (docId: string, sheetId: string, data: string) => {
    const request = await saveDocumentationSheetReq({ docId, sheetId, data });

    if (request.success === false) {
      console.log(request.error.message);
    }
    
    return request.data;
  };

  return (
    <AuthContext.Provider
      value={{
        getDocTree,
        getDocSheet,
        saveDocSheet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};


export const useAuthContext = () => useContext(AuthContext);
