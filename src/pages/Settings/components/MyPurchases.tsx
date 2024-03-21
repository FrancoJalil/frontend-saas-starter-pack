import { Separator } from "@/components/ui/separator"
import { urlBase } from "@/utils/variables"
import axios from "axios"
import { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type Purchase = {
  id: number;
  name: string;
  price: number
  product: { name: string }
  purchased_date: string
};

export const MyPurchases = () => {

  const [userPurchases, setUserPurchases] = useState<Purchase[] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const getData = async () => {
    try {
      const response = await axios.get(urlBase + "/paypal/purchases/", {
        params: {
          page: currentPage
        }
      })
      setUserPurchases(response.data.results.user_purchases)
      setTotalPages(response.data.results.total_pages)

    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    getData()
  }, [currentPage])

  const fillEmptyRows = () => {
    const emptyRows = Math.max(5 - (userPurchases ? userPurchases.length : 0), 0);
    return Array.from({ length: emptyRows }).map((_, index) => (
      <TableRow key={`empty-row-${index}`}>
        <TableCell>-</TableCell>
        <TableCell> yyyy-mm-dd </TableCell>
        <TableCell className="text-right"> $- </TableCell>
      </TableRow>
    ))
  }

    return (
      <div className="w-full">
        <h1>My Purchases</h1>
        <Separator className="my-4" />

        <div className="flex flex-col items-start w-full sm:w-5/6 gap-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>

            {userPurchases &&
            userPurchases.map((purchase: Purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="font-medium">{purchase.product.name}</TableCell>
                <TableCell>{purchase.purchased_date}</TableCell>
                <TableCell className="text-right">${purchase.price}</TableCell>
              </TableRow>
            ))}
          {fillEmptyRows()}


            </TableBody>

          </Table>

          <div className="flex justify-end gap-4">
            <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
            <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
          </div>
        </div>


      </div>
    )
  }