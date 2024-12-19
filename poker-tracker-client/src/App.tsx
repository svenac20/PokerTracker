import { Table } from 'lucide-react'
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'

function App() {
  return (
    <div className="min-h-screen bg-zinc-800">
      <div>
        <Table className="h-full w-full">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Test 21312312312</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Test</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Test 21312312312</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Test</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Test 21312312312</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Test</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Test 21312312312</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Test</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}

export default App
