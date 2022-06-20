import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Input from '@mui/material/Input';
import {HiColorSwatch, HiGlobeAlt, HiMail, HiOutlineNewspaper, HiPencil, HiQuestionMarkCircle} from "react-icons/hi";
import { GoMarkGithub } from "react-icons/go";
import Modal from "@mui/material/Modal";
import { GooglePicker } from "react-color";
import SendIcon from '@mui/icons-material/Send'
import emailjs from '@emailjs/browser';
export default function Toolbox(props) {
    // state always sets drawer to the left
    const [toolboxOpen, setToolboxOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState();
    const [currentPencil, setCurrentPencil] = useState(0);
    const [openColorModal, setOpenColorModal] = useState(false);
    const [openPencilModal, setOpenPencilModal] = useState(false);
    const [openContactModal, setContactMeModal] = useState(false);

    const form = useRef()

    useEffect(() => {
        props.passPencil(currentPencil)

    }, [currentPencil])


    const ContactMe = () => {

        const [submission, setSubmission] = useState({
            waiting: true,
            success: false,
            error: false,
        })


        const handleFormSubmission = (e) => {
            e.preventDefault()

            emailjs.sendForm('service_1u0rdtf', 'template_ernl9ot', form.current, process.env.REACT_APP_EMAILJS)
                .then((result) => {
                    handleSuccess()
                    console.log(result.text);
                }, (error) => {
                    handleError()
                    console.log(error.text);
                });
        }

        const handleSuccess = () => {
            setSubmission({
                waiting: false,
                success: true,
                error: false,
            })
        }

        const handleError = () => {
            setSubmission({
                waiting: false,
                success: false,
                error: true,
            })
        }

        return (
            <>
                <div className="flex justify-center items-center position absolute w-1/2 h-3/4 bg-gray-200 rounded-md">
                    <div className='flex flex-col justify-center'>
                        <h1 className="text-center text-xl pb-4">Contact Me</h1>
                        <Container maxWidth="lg">
                            <form ref={form}>
                                <Box sx={{
                                    width: 250,
                                    height: 50,
                                    paddingBottom: 8
                                }}>
                                    <FormControl>
                                    <Input placeholder="Your Name" id="name-basic" />
                                    </FormControl>
                                </Box>
                                <Box sx={{
                                    width: 250,
                                    height: 50,
                                    paddingBottom: 8
                                }}>
                                    <FormControl>
                                        <Input placeholder="Your Email" id="email-basic" />
                                    </FormControl>
                                </Box>
                                <Box sx={{
                                    width: 250,
                                    height: 50,
                                    paddingBottom: 8
                                }}>
                                    <FormControl>
                                        <Input placeholder="Company Name (optional)" id="company-name-basic" />
                                    </FormControl>
                                </Box>
                                <Box sx={{
                                    width: 250,
                                    height: 50,
                                    paddingBottom: 4
                                }}>
                                    { submission.waiting &&
                                        <Button variant="contained"
                                                endIcon={<SendIcon />}
                                                onClick={handleFormSubmission}
                                        >Submit</Button>
                                    }
                                    { submission.success &&
                                        <Button variant="contained"
                                                color="success"
                                                endIcon={<SendIcon />}
                                                onChange={handleSuccess}
                                        >Submit</Button>
                                    }
                                    { submission.error &&
                                        <Button variant="contained"
                                                color="error"
                                                endIcon={<SendIcon />}
                                                onChange={handleError}
                                        >Submit</Button>
                                    }
                                </Box>
                            </form>
                        </Container>
                    </div>
                </div>
            </>
        )
    }

    const PencilPicker = () => {

        function passPencil(size) {
            setCurrentPencil(size)
        }

        return (
            <>
                <div
                    className="w-full h-[55%] bg-gray-200 rounded-md">
                    <div
                        className="flex justify-end hover:cursor-pointer"
                        onClick={handlePencilModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>
                    <div className="flex justify-center "><h1 className="text-black">Pencil Picker</h1></div>
                    <div className="w-full border-[0.5px] border-dashed border-black"></div>
                    <div className="w-full flex flex-col">
                        <button className="py-2 hover:text-lg" onClick={() => passPencil(1)}>Small</button>
                        <button className="py-2 hover:text-lg" onClick={() => passPencil(2)}>Medium</button>
                        <button className="py-2 hover:text-lg" onClick={() => passPencil(3)}>Large</button>
                        <button className="py-2 hover:text-lg" onClick={() => passPencil(4)}>Super Massive</button>
                    </div>
                </div>
            </>

        )
    }

    const sendCurrentColor = (color) => {
        setCurrentColor(color.hex)
        props.passColor(currentColor)
    }

    const handleColorModal = () => {
        if (openColorModal) {
            setOpenColorModal(false)
        } else {
            setOpenColorModal(true)
        }
    }

    const handlePencilModal = () => {
        if (openPencilModal) {
            setOpenPencilModal(false)
        } else {
            setOpenPencilModal(true)
        }
    }

    const handleContactMe = () => {
        if (openContactModal) {
            setContactMeModal(false)
        } else {
            setContactMeModal(true)
        }
    }


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setToolboxOpen({ toolboxOpen, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'left' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={ toggleDrawer(anchor, false) }
            onKeyDown={ toggleDrawer(anchor, false) }>
            <List>
                {['Color Picker', 'Pencil Size', 'Find Game', 'FAQ'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                            {text === 'Color Picker' &&
                                <ListItemButton
                                    onClick={handleColorModal}
                                    sx={{
                                    width: '100%',
                                    height: '100%',
                                }}>
                                    <ListItemIcon>
                                        <HiColorSwatch />
                                    </ListItemIcon>
                                    {text}
                                </ListItemButton>
                            }
                            {text === 'Pencil Size' &&
                                <ListItemButton
                                    onClick={handlePencilModal}
                                    sx={{
                                    width: '100%',
                                    height: '100%',
                                }}>

                                    <ListItemIcon>
                                        <HiPencil />
                                    </ListItemIcon>
                                    {text}
                                </ListItemButton>
                            }
                            {text === 'Find Game' &&
                                <ListItemButton sx={{
                                    width: '100%',
                                    height: '100%',
                                }}>
                                    <ListItemIcon>
                                        <HiGlobeAlt />
                                    </ListItemIcon>
                                    {text}
                                </ListItemButton>
                            }
                            {text === 'FAQ' &&
                                <ListItemButton sx={{
                                    width: '100%',
                                    height: '100%',
                                }}>
                                    <ListItemIcon>
                                        <HiQuestionMarkCircle />
                                    </ListItemIcon>
                                    {text}
                                </ListItemButton>
                            }

                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Contact Me', 'Resume', 'Github'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        {text === 'Contact Me' &&
                            <ListItemButton
                                onClick={handleContactMe}
                                sx={{
                                width: '100%',
                                height: '100%',
                            }}>
                                <ListItemIcon>
                                    <HiMail />
                                </ListItemIcon>
                                {text}
                            </ListItemButton>
                        }
                        {text === 'Resume' &&
                            <ListItemButton sx={{
                                width: '100%',
                                height: '100%',
                            }}>
                                <ListItemIcon>
                                    <HiOutlineNewspaper />
                                </ListItemIcon>
                                {text}
                            </ListItemButton>
                        }
                        {text === 'Github ' &&
                            <ListItemButton sx={{
                                width: '100%',
                                height: '100%',
                            }}>
                                <ListItemIcon>
                                    <GoMarkGithub />
                                </ListItemIcon>
                                {text}
                            </ListItemButton>
                        }
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            {
                <React.Fragment key={0}>
                    <Button
                        onClick={toggleDrawer('left', true)}>
                        Open Toolbox
                    </Button>
                    <Drawer
                        anchor={'left'}
                        open={toolboxOpen['left']}
                        onClose={toggleDrawer('left', false)}>
                        {list('left')}
                    </Drawer>
                    { openColorModal &&
                        <Modal
                            open={openColorModal}
                            onClose={handleColorModal}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="the color picker pop up"
                            className="position absolute h-full w-full flex justify-center items-center z-40">
                            <Box>
                                <GooglePicker
                                    color={currentColor}
                                    onChange={(color) => sendCurrentColor(color)}
                                />
                            </Box>
                        </Modal>
                    }
                    {openPencilModal &&
                        <Modal
                            open={openPencilModal}
                            onClose={handlePencilModal}
                            aria-labelledby="pencil-modal"
                            aria-describedby="the pencil picker pop up"
                            className="position absolute h-full w-full flex justify-center items-center z-40">
                                <Box>
                                    <PencilPicker />
                                </Box>
                        </Modal>
                    }
                    {openContactModal &&
                        <Modal
                            open={openContactModal}
                            onClose={handleContactMe}
                            aria-labelledby="contact-modal"
                            aria-describedby="the contact me modal"
                            className="flex  justify-start items-center position absolute h-full w-full justify-center z-40">
                            <Box className="flex justify-center items-center">
                                <ContactMe />
                            </Box>
                        </Modal>
                    }
                </React.Fragment>
            }
        </div>
    );
}