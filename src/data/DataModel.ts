import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB6qzZOmdGdmgvmMy_nhbQAnTSEmzvAhOk",
  authDomain: "note-mgmt-v0.firebaseapp.com",
  databaseURL: "https://note-mgmt-v0.firebaseio.com",
  projectId: "note-mgmt-v0",
  storageBucket: "note-mgmt-v0.appspot.com",
  messagingSenderId: "50994080053",
  appId: "1:50994080053:web:6282c01defb385f9e2847c",
};

firebase.initializeApp(firebaseConfig);

const DBConfig = {
  basePath: "test/editors",
};
export type EditorDataType = {
  content: string;
  title: string;
};
export type EditorRenderType = {
  visible: boolean;
  fold: boolean;
};

export type EditorType = {
  data: EditorDataType;
  render: EditorRenderType;
  id: string;
};

export type EditorListType = EditorType[];
type EditorMapType = {
  [index: string]: EditorType;
};
const onEditorsAdd = () => {
  const newEditorRef = firebase.database().ref(DBConfig.basePath).push();
  newEditorRef.set({
    data: {
      content: "",
      title: "",
    },
    render: {
      visible: true,
      fold: false,
    },
    id: newEditorRef.key,
  } as EditorType);
};
const onSingleEditorChange: (
  id: string,
  path: string
) => firebase.database.Reference = (id: string, path: string) => {
  return firebase.database().ref(DBConfig.basePath + "/" + id + "/" + path);
};
const onEditorDataContentChange = (val: string, id: string) => {
  onSingleEditorChange(id, "data/content").set(val);
};
const onEditorDataTitleChange = (val: string, id: string) => {
  onSingleEditorChange(id, "data/title").set(val);
};
const onEditorRenderFoldChange = (val: boolean, id: string) => {
  onSingleEditorChange(id, "render/fold").set(val);
};
const onEditorRenderVisibleChange = (val: boolean, id: string) => {
  onSingleEditorChange(id, "render/visible").set(val);
};

type SetStateEditorsData = React.Dispatch<React.SetStateAction<EditorListType>>;
const subscribeEditorsValueChange = (setState: SetStateEditorsData) => {
  const databaseRef = firebase.database().ref(DBConfig.basePath);
  databaseRef.on(
    "value",
    (snap) => {
      const fbValues = snap.val() as EditorMapType | null;
      if (fbValues == null) {
        // if new DB instance, bootstrap w/ 1 object
        onEditorsAdd();
        return;
      }
      console.log("[subscribe] firebase value ");
      // no sorting for now
      const values = Object.values(fbValues);
      console.log(values);
      setState(values);
    },
    (err: Error) => {
      console.error(err.message);
      console.error(err);
    }
  );
};
export {
  onEditorsAdd,
  onEditorDataContentChange,
  onEditorDataTitleChange,
  onEditorRenderFoldChange,
  onEditorRenderVisibleChange,
  subscribeEditorsValueChange,
};
