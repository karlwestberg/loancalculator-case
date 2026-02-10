import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoanCalculator from "./components/LoanCalculator";

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full max-w-96 min-w-24 p-2'>
        <div className='mb-4'>
          <h1 className='font-bold'>Frauda</h1>
          <p>We are legit, we promise</p>
        </div>
        <LoanCalculator className='w-full' />
      </div>
    </QueryClientProvider>
  )
}
