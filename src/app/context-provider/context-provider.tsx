import { createContext, useContext, useState } from 'react';

type ContextType = {
     theme: `dark` | `light`
     toggleTheme: () => void
}

const CreateContext = createContext<ContextType>({
     theme: `light`,
     toggleTheme: () => null,
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
     const storedTheme = localStorage.getItem(`theme`)
     const currentTheme = storedTheme ? (storedTheme as `dark` | `light`) : `light`

     const [theme, setTheme] = useState(currentTheme)

     const toggleTheme = () => {
          setTheme((prevTheme) => {
               const newTheme = prevTheme === `dark` ? `light` : `dark`
               localStorage.setItem(`theme`, newTheme)
               return newTheme
          })
     }


     return (
          <CreateContext.Provider value={{ theme, toggleTheme }}>
               <main className={`${theme} text-foreground bg-background h-screen`}>
                    {children}
               </main>
          </CreateContext.Provider>
     )
}

export const useCreateContext = () => useContext(CreateContext)