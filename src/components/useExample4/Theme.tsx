import { createContext, useState, use } from 'react'
import type { ReactNode } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
}

type ThemeProviderProps = {
  children: ReactNode
}

// Create a context object
const ThemeContext = createContext<ThemeContextValue | null>(null)

// Create a provider component
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // State to hold the current theme
  const [theme, setTheme] = useState<Theme>('light')

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    // Provide the theme and toggleTheme function to the children
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const ThemedCard = () => {
  // Access the theme context using the use() hook
  const themeContext = use(ThemeContext)

  if (!themeContext) {
    throw new Error('ThemedCard must be rendered inside a ThemeProvider')
  }

  const { theme, toggleTheme } = themeContext

  return (
    <div
      className={`max-w-md mx-auto shadow-md rounded-lg p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}
    >
      <h1
        className={`text-2xl mb-3 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}
      >
        Themed Card
      </h1>

      <p className={theme === 'light' ? 'text-gray-800' : 'text-white'}>
        {' '}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non neque
        libero. Nullam mattis metus a sapien tempor, sit amet mollis est
        facilisis. Phasellus nec turpis nec dui venenatis vestibulum. Sed
        dapibus dapibus justo, at rhoncus risus malesuada vel. Proin eget leo id
        mi ullamcorper rhoncus.
      </p>

      {/* Toggel Button */}
      <button
        onClick={toggleTheme}
        className='mt-4 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-voilet-600'
      >
        {theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      </button>
    </div>
  )
}

const Theme = () => {
  return (
    <ThemeProvider>
      <ThemedCard />
    </ThemeProvider>
  )
}

export { Theme as UseExample4 }
