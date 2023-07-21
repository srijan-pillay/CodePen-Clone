//sandbox = helps prevents various malicious activities by preventing the iframe to access other stuff

import React, {useEffect, useState} from 'react'
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'

const App = () => {
  const [html, setHTML] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')

  //srcDoc is used for rendering all the code into the iframe
  const [srcDoc, setSrcDoc] = useState('')


  //we have used useEffect here bcoz hum jab editor me type kar rhe the to code immediately display ho rha tha in the iframe
  //but we wanted a delay. isiliye useEffect and setTimeout use hua hai
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
        `)
    },250)

    return () => clearTimeout(timeout) // this will clear the timeout which was set by setTimeout
  },[html, css, js])

  

  return (
      <>
        <div className='pane top-pane'>
          <Editor 
            language = 'xml'
            displayName = 'HTML'
            value = {html}
            onChange = {setHTML}
          />
          <Editor 
            language = 'css'
            displayName = 'CSS'
            value = {css}
            onChange = {setCss}
          />
          <Editor 
            language = 'javascript'
            displayName = 'JAVASCRIPT'
            value = {js}
            onChange = {setJs}
          />
        </div>
        <div className='pane'>
          <iframe
            srcDoc={srcDoc}
            title='output'
            sandbox='allow-scripts'
            border='none'
            width="100%"
            height="100%"
          />
        </div>
        </>
  )
}

export default App