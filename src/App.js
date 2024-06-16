import { useState } from "react"



const App = () => {
        const [value, setValue] = useState("")
        const [error, setError] = useState("")
        const [chatHistory, setChatHistory] = useState([])



        const surpriseOptions = [
            'When is Diwali celebrated?',
            'When is Robert Downeys birthday?',
            'How to make a sandwhich?'
        ]

        const surprise = () => {
            const randomValue = surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
            setValue(randomValue)
        }

        const getResponse = async() => {
            if (!value) {
                setError("Error pls ask aquestion!!")
                return
            }
            try {
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        history: chatHistory,
                        message: value
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const response = await fetch('http://localhost:8000/gemini', options)
                const data = await response.text()

                console.log(data)

                setChatHistory(oldChatHistory => [...oldChatHistory, {
                        role: "user",
                        parts: value
                    },

                    {
                        role: "model",
                        parts: data

                    }
                ])
                setValue("")
            } catch (error) {
                console.error(error)
                setError("Something went wromg,Pls try again later!")
            }

        }

        const clear = () => {
            setValue("")
            setError("")
            setChatHistory([])
        }

        return ( <
                >
                <
                div className = "app" >
                <
                p > What do you want to konw ?
                    <
                    button className = "surprise"
                onClick = { surprise }
                disabled = {!chatHistory } > Surprise me! < /button>  </p >

                <
                div className = "input-container" >


                <
                input value = { value }
                placeholder = "When is christmas....?"
                onChange = {
                    (e) => setValue(e.target.value)
                }
                /> 

                {
                    !error && < button onClick = { getResponse } > Ask me < /button >}  {
                    error && < button onClick = { clear } > Clear < /button>}

                    <
                    /div>  {
                        error && < p > { error } < /p>}   <
                            div className = "serach-result" > {
                                chatHistory.map((chatItem, _index) =>
                                    <
                                    div key = { _index } >
                                    <
                                    p className = "answer" > { chatItem.role }: { chatItem.parts } < /p>  <
                                    /div>)}   <
                                    /div>

                                    <
                                    /div> <
                                    />





                                )
                            }

                        export default App