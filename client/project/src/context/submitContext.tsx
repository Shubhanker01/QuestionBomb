import { createContext } from 'react'
import type { SubmitContextType } from '@/types/mock'

const SubmitContext = createContext<SubmitContextType | undefined>(undefined)

export default SubmitContext