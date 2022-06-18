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
import {GoMarkGithub} from "react-icons/go";
import Modal from "@mui/material/Modal";
import {GooglePicker} from "react-color";

export default function Toolbox(props) {
    // state always sets drawer to the left
    const [toolboxOpen, setToolboxOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState();
    const [openColorModal, setOpenColorModal] = useState(false);

    const sendCurrentColor = (color) => {
        setCurrentColor(color.hex)
        props.passColor(currentColor)
    }

    const handleColorModal = () => {
        if (openColorModal) {
            setOpenModal(false)
        } else {
            setOpenModal(true)
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
                        <ListItemButton>
                            {index === 0 &&
                                <ListItemIcon>
                                    <HiColorSwatch />
                                </ListItemIcon>
                            }
                            {index === 1 &&
                                <ListItemIcon>
                                    <HiPencil />
                                </ListItemIcon>}
                            {index === 2 &&
                                <ListItemIcon>
                                    <HiGlobeAlt />
                                </ListItemIcon>
                            }
                            {index === 3 &&
                                <ListItemIcon>
                                    <HiQuestionMarkCircle />
                                </ListItemIcon>
                            }
                            {text === 'Color Picker' &&
                                <ListItemText
                                    primary={text}
                                    onClick={handleColorModal}/>
                            }
                            {text === 'Pencil Size' &&
                                <ListItemText primary={text}/>
                            }
                            {text === 'Find Game' &&
                                <ListItemText primary={text}/>}
                            {text === 'FAQ' &&
                                <ListItemText primary={text}/>}
                        </ListItemButton>
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
                            aria-describedby="modal-modal-description"
                            className="position absolute h-full w-full flex justify-center items-center z-40">
                            <Box>
                                <GooglePicker
                                    color={currentColor}
                                    onChange={(color) => sendCurrentColor(color)}
                                />
                            </Box>
                        </Modal>
                    }
                </React.Fragment>
            }
        </div>
    );
}