import Canvas from '../components/Canvas'
import Drawer from '../components/Drawer'
import Timer from '../components/Timer'
import { useEffect, useState } from 'react'
import Toolbox from '../components/Toolbox'
import { Snackbar } from "@mui/material";
import { useLoaderData } from "@remix-run/react";

export const loader = async() => {
    return {
        email: process.env.REACT_APP_EMAILJS,
        recaptchaClient: process.env.REACT_APP_RECAPTCHA_CLIENT,
        recaptchaServer: process.env.REACT_APP_RECAPTCHA_SERVER
    }
}


export const ReCaptcha = () => {
    let loaderData = useLoaderData()

    const client = new Grecaptcha(loaderData.recaptchaClient)

    client.verify(loaderData.recaptchaServer)
        .then( (accepted) => {
            console.log('accepted')
        })
        .then( (error) => {
            console.log(error)
        })
    const onloadCallback = () => {
        grecaptcha.render("recaptcha", {
            sitekey: loaderData.recaptchaServer,
            callback: function() {
                console.log('im loaded!')
            }
        })
    }

     fetch(`https://www.google.com/recaptcha/api.js?onload=${onloadCallback}&render=explicit`)
         .then( (resp) => resp.json())
         .catch((err) => console.log(err))
}

export default function App() {

    const [toolboxColor, setToolboxColor] = useState()
    const [toolboxPencil, setToolboxPencil] = useState()
    const [snackbar, setSnackbar] = useState({
        size: 0,
        show: false,
        message: toolboxPencil
    })

    useEffect( () => {
        setSnackbar({
            size: toolboxPencil,
            show: true,
            message: 'Pencil size changed to ' + toolboxPencil
        })
    }, [toolboxPencil])

  return (
      <div>
          {
              snackbar.show &&
              <div>
                  <Snackbar
                      open={snackbar.show}
                      autoHideDuration={2000}
                      onClose={() => setSnackbar({...snackbar, show: false})}
                      message={snackbar.message}
                  />
              </div>
          }
          <div className="overscroll-contain overflow-y-hidden h-screen w-screen">
              <Toolbox passColor={setToolboxColor} passPencil={setToolboxPencil} />
              <div className="flex items-center justify-center h-screen w-screen bg-slate-800 z-40">
                  <div className="position absolute">
                      <Drawer />
                      <Timer
                          ms='60'
                          seconds='20'
                          textColor='text-white'
                      />
                      <Canvas
                          passColor={toolboxColor}
                          passPencil={toolboxPencil}
                      />
                  </div>
              </div>
          </div>
      </div>

  )
}


