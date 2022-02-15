import { useEffect, useState } from "react";
import Head from "next/head";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Header from "../components/Header";
import DocumentRow from "../components/DocumentRow";
import Login from "./Login";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { userService } from "../services";
import { useRouter } from "next/router";
import { docsService } from "../services/docs.service";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [docs, setDocs] = useState([]);
  const router = useRouter();

  const getDocs = () => {
    docsService.list({ userId: userService.user.id }).then((res) => {
      setDocs(res.data);
    });
  }

  useEffect(() => {
    // redirect to home if already logged in
    if (!userService.user) {
      router.push("/Login");
    }
    getDocs();
  }, []);

  // if (!userService.user) return <Login/>

  const createDocument = () => {
    if (!input) return;

    const params = {
      userId: userService.user.id,
      fileName: input,
      editorState: {},
    };

    docsService.create(params).then((res) => {
      getDocs();
    });

    //create a document in db;

    setInput("");
    setShowModal(false);
  };

  const modal = (
    <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
      <ModalBody>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="outline-none w-full"
          placeholder="Enter name ..."
          onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>

      <ModalFooter>
        <Button
          color="blue"
          buttonType="link"
          ripple="dark"
          onClick={(e) => setShowModal(false)}
        >
          Cancel
        </Button>
        <Button color="blue" ripple="light" onClick={createDocument}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <Head>
        <title>Text Editor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      {modal}

      <section className="bg-[#f8f9fa] pb-10 px-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center py-8">
            <h2 className="text-gray-700 text-lg"> New document</h2>
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0 ml-2"
              onClick={(e) => setShowModal(true)}
            >
              <Icon name="add" size="4xl" color="gray" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-4 text-sm text-gray-700">
          <div className="flex items-center pb-5 mb-2">
            <h2 className="font-medium mr-2">My Documents</h2>
            <Icon name="folder" size="3xl" color="gray" />
          </div>

          {docs ? (
            docs.map((doc) => (
              <DocumentRow key={doc.id} id={doc.id} fileName={doc.fileName} />
            ))
          ) : (
            <></>
          )}
        </div>
      </section>
    </div>
  );
}
