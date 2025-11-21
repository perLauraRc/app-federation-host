import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export interface TableColumn<T> {
  key: keyof T
  header: string
  render?: (value: T[keyof T], item: T) => React.ReactNode
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  itemsPerPage?: number
  testId: string
}

export const Table = <T extends { id: number | string }>({
  columns,
  data,
  itemsPerPage = 10,
  testId
}: TableProps<T>) => {
  const isLGMediaQuery = useMediaQuery('(min-width: 1024px)')
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)

  const columnWidthByKey = {
    id: isLGMediaQuery ? 48 : 44,
    title: 'auto'
  }

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-x-auto">
        <table
          className="border-cerulean/50 bg-cerulean/20 w-full table-fixed border-collapse border-2"
          data-testid={`${testId}-table`}
          width="100%"
        >
          <thead>
            <tr className="border-cerulean border-b-2">
              {columns.map((column) => (
                <th
                  className="p-3 text-[0.875rem]/5 lg:text-[1rem]/6"
                  key={String(column.key)}
                  style={{
                    height: `${isLGMediaQuery ? 48 : 44}px`,
                    width:
                      columnWidthByKey[
                        column.key as keyof typeof columnWidthByKey
                      ]
                  }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr
                className="border-cerulean hover:bg-cerulean/20 border-b-1 transition-colors"
                data-testid={`table-row-${row.id}`}
                key={row.id}
              >
                {columns.map((column) => (
                  <td
                    className="p-3 text-[0.875rem]/5 lg:text-[1rem]/6"
                    key={String(column.key)}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Table pagination"
          className="flex items-center justify-between"
          data-testid="pagination"
        >
          <button
            className="bg-cerulean hover:bg-cerulean/80 rounded px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
            type="button"
          >
            Previous
          </button>

          <span className="text-sm text-white">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="bg-cerulean hover:bg-cerulean/80 rounded px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
            type="button"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  )
}
