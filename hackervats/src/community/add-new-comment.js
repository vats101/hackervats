import {
    Button,
    FormControl,
    FormLabel,
    Textarea,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
    useDisclosure,
  } from "@chakra-ui/react";
  import React, { useState , useEffect} from "react";
  import db from "../lib/firebase";
  import './comm.css'
  import { getFirestore, collection, getDocs ,doc,addDoc,updateDoc} from 'firebase/firestore/lite'
  // import { addDoc,getFirestore, collection, getDocs,updateDoc,doc } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
import post from "./Post";

  
  const AddNewComment = ({ post }) => {

    let swear = [
      'arse',
      'ass',
      'fuck',
      'hell',
      'shit',
      'maggot',
      'dumd',
      'suck',
      'dick',
      'asshole',
      'bastard',
      'bitch',
      'bollocks',
      'bugger',
      'bullshit',
      'crap',
      'damn',
      'frigger',
      ]

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [isSaving, setSaving] = useState(false);
    const [posts,setPosts]=useState([]);
    const [comments,setComments]=useState([]);
  
    const handleSubmit = async () => {
      
      let txt=`User ${localStorage.getItem('Name')} :  ${title}`

      let check=1;
      swear.map(word => {
        if(title.includes(word) === true )
        {
          check=0
          console.log(`Bad word found ${title}`) ;
        }  
      })
      if(check===1)
      {
        setSaving(true);
        const date = new Date();
        console.log(post.id);
        let temppost=post.comment;
        console.log(temppost)
        temppost.push(txt);
        //getting posts
        const docRef=doc(db,"posts",post.id);
        console.log(docRef);
        updateDoc(docRef,{
          user:localStorage.getItem('Name'),
          title: post.title,
          comment:temppost ,
          upVotesCount: 0,
          downVotesCount: 0,
          createdAt: post.createdAt,
          updatedAt: date.toUTCString(),
          isCommentVisible:false
        });
      }
      else
      {
        alert("You are using foul language!\nPlease maintain the dignity.")
      }
      onClose();
      setTitle("");
      setSaving(false);
    };
  
    return (
      <>
        <Button onClick={onOpen} colorScheme="blue" className="button-comm">
          Add new comment
        </Button>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Add new comment</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl id="post-title">
                  <FormLabel>Comment title</FormLabel>
                  <Textarea
                    type="post-title"
                    value={title}
                    
                    onChange={(e) => 
                      setTitle(e.target.value)}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <HStack spacing={4}>
                  <Button onClick={onClose}>Close</Button>
                  <Button
                    onClick={handleSubmit}
                    colorScheme="blue"
                    disabled={!title.trim()}
                    isLoading={isSaving}
                  >
                    Save
                  </Button>
                </HStack>
              </ModalFooter>
            </ModalContent>
          </ModalOverlay>
        </Modal>
      </>
    );
  };
  
  export default AddNewComment;