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
  import React, { useState } from "react";
  import db from "../lib/firebase";
  import './comm.css'
  
// import { addDoc,getFirestore, collection, getDocs,updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js';
import { getFirestore, collection,addDoc,getDocs,updateDoc } from 'firebase/firestore/lite'
import post from "./Post";
  
  const AddNewPost = () => {
    let swear = [
      'arse',
      'sex',
      'fucking',
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
    const postRef=collection(db,"posts");
    const handleSubmit = async () => {
      let check=1;
      swear.map(word => {
        if(title.toLowerCase().includes(word) === true )
        {
          check=0;
          console.log(`Bad word found ${title}`) ;
        }  
      })
      if(check===1)
      {
        setSaving(true);
  
      const date = new Date();
      console.log(localStorage.getItem('Name'));
      
      addDoc(postRef,{
        user:localStorage.getItem('Name'),
        title: title,
        comment:[],
        upVotesCount: 0,
        downVotesCount: 0,
        createdAt: date.toUTCString(),
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
          Add new post
        </Button>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay>
            <ModalContent>
              <ModalHeader>Add new post</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl id="post-title">
                  <FormLabel>Post title</FormLabel>
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
  
  export default AddNewPost;