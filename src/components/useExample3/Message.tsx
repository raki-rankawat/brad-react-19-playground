import { use, useState, Suspense } from 'react'

const fetchMessage = () => {
  return new Promise<string>(resolve => setTimeout(resolve, 1000, '⚛️'))
}

type MessageProps = {
  messagePromise: Promise<string>
}

const MessageOutput = ({ messagePromise }: MessageProps) => {
  const messageContent = use(messagePromise)
  return <p>Here is the message: {messageContent}</p>
}

const MessageContainer = ({ messagePromise }: MessageProps) => {
  return (
    <Suspense fallback={<p>⌛ Downloading message...</p>}>
      <MessageOutput messagePromise={messagePromise} />
    </Suspense>
  )
}

const Message = () => {
  const [messagePromise, setMessagePromise] = useState<Promise<string> | null>(
    null,
  )
  const [show, setShow] = useState(false)

  const download = () => {
    setMessagePromise(fetchMessage())
    setShow(true)
  }

  if (show && messagePromise) {
    return <MessageContainer messagePromise={messagePromise} />
  } else {
    return (
      <button
        onClick={download}
        className='bg-violet-500 hover:bg-violet-700 text-gray-100 p-2 rounded block'
      >
        Download message
      </button>
    )
  }
}

export { Message as UseExample3 }
