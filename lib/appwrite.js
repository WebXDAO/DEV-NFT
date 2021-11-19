import { Appwrite } from "appwrite";

let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    const appwrite = new Appwrite();
    appwrite
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT);
    api.sdk = appwrite;
    return appwrite;
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createAnonymousSession();
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (collectionId, data, read, write) => {
    return api
      .provider()
      .database.createDocument(collectionId, data, read, write);
  },

  listDocuments: (collectionId) => {
    return api.provider().database.listDocuments(collectionId);
  },

  getDocument: (collectionId, documentId) => {
    return api.provider().database.getDocument(collectionId, documentId);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api
      .provider()
      .database.updateDocument(collectionId, documentId, data, read, write);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },

  createFile: (file) => {
    return api.provider().storage.createFile(file, ["*"], ["*"]);
  },

  getFileView: (id) => {
    return api.provider().storage.getFileView(id);
  }
};

export default api;