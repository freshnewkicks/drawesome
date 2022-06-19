import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {HiColorSwatch, HiGlobeAlt, HiMail, HiOutlineNewspaper, HiPencil, HiQuestionMarkCircle} from "react-icons/hi";
import { GoMarkGithub } from "react-icons/go";
import Modal from "@mui/material/Modal";
import { GooglePicker } from "react-color";

export default function Toolbox(props) {
    // state always sets drawer to the left
    const [toolboxOpen, setToolboxOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState();
    const [currentPencil, setCurrentPencil] = useState(0);
    const [openColorModal, setOpenColorModal] = useState(false);
    const [openPencilModal, setOpenPencilModal] = useState(false);

    useEffect(() => {
        props.passPencil(currentPencil)
    }, [currentPencil])

    const PencilPicker = () => {

        function passPencil(size) {
            setCurrentPencil(size)
            return
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
                                    fullWidth={true}
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
                                    fullWidth={true}
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
                                <ListItemButton fullWidth={true} sx={{
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
                                <ListItemButton fullWidth={true} sx={{
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
                        <ListItemButton>
                            <ListItemIcon>
                                {index === 0 && <HiMail />}
                                {index === 1 && <HiOutlineNewspaper />}
                                {index === 2 && <GoMarkGithub />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
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
                </React.Fragment>
            }
        </div>
    );
}