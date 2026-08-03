import { useOptimistic, useState, useRef } from 'react'

type Message = {
  text: string
  sending?: boolean
}

type AddOptimisticMessage = (text: string) => void

type SendMessage = (formData: FormData) => Promise<void>

const MessageForm = ({
  addOptimisticMessage,
  sendMessage,
}: {
  addOptimisticMessage: AddOptimisticMessage
  sendMessage: SendMessage
}) => {
  // Create a reference to the form
  const formRef = useRef<HTMLFormElement>(null)

  // This function is called when the form is submitted
  const formAction = async (formData: FormData) => {
    addOptimisticMessage(String(formData.get('message')))

    // Clear the form
    formRef.current?.reset()

    await sendMessage(formData)
  }

  return (
    <form action={formAction} ref={formRef} className='flex items-center mb-5'>
      <input
        type='text'
        name='message'
        placeholder='Hello!'
        className='border border-gray-300 rounded py-1 px-2 mr-2 focus:outline-none focus:border-blue-500'
      />
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline'
      >
        Send
      </button>
    </form>
  )
}

const Thread = ({
  messages,
  sendMessage,
}: {
  messages: Message[]
  sendMessage: SendMessage
}) => {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<
    Message[],
    string
  >(messages, (state, newMessage) => [
    ...state,
    {
      text: newMessage,
      sending: true,
    },
  ])

  return (
    <>
      <MessageForm
        addOptimisticMessage={addOptimisticMessage}
        sendMessage={sendMessage}
      />
      {optimisticMessages.map((message, index) => (
        <div key={index} className='flex items-center'>
          <span>{message.text}</span>
          {message.sending && (
            <small className='ml-1 text-gray-500'>(Sending...)</small>
          )}
        </div>
      ))}
    </>
  )
}

const deliverMessage = async (message: string) => {
  await new Promise(res => setTimeout(res, 2000))
  return message
}

const MessageBox = () => {
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = async (formData: FormData) => {
    const sentMessage = await deliverMessage(String(formData.get('message')))
    setMessages(messages => [...messages, { text: sentMessage }])
  }

  return <Thread messages={messages} sendMessage={sendMessage} />
}

export { MessageBox as UseOptimisticExample }
