import { createContext } from "react";
import type { MockContextType } from "@/types/mock";

const MockContext = createContext<MockContextType | null>(null)

export default MockContext