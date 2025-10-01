"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Download, Filter, Search, ChevronDown, User, ChevronUp } from "lucide-react"

// Mock data - replace with actual database queries
const mockStats = {
  totalFiles: 1247,
  fileTypes: [
    { type: ".pdf", count: 456 },
    { type: ".docx", count: 321 },
    { type: ".xlsx", count: 234 },
    { type: ".txt", count: 156 },
    { type: ".png", count: 80 },
  ],
  aiUsage: [
    { name: "GPT-4", uses: 892 },
    { name: "Claude", uses: 567 },
    { name: "Gemini", uses: 234 },
    { name: "LLaMA", uses: 123 },
  ],
  mostUsedAI: "GPT-4",
}

const mockFiles = [
  {
    id: 1,
    dateCreated: "2024-01-15",
    fileName: "quarterly-report.pdf",
    fileType: ".pdf",
    usedAI: "GPT-4",
  },
  {
    id: 2,
    dateCreated: "2024-01-14",
    fileName: "meeting-notes.docx",
    fileType: ".docx",
    usedAI: "Claude",
  },
  {
    id: 3,
    dateCreated: "2024-01-13",
    fileName: "data-analysis.xlsx",
    fileType: ".xlsx",
    usedAI: "GPT-4",
  },
  {
    id: 4,
    dateCreated: "2024-01-12",
    fileName: "project-proposal.pdf",
    fileType: ".pdf",
    usedAI: "Gemini",
  },
  {
    id: 5,
    dateCreated: "2024-01-11",
    fileName: "customer-feedback.txt",
    fileType: ".txt",
    usedAI: "Claude",
  },
]

type SortField = "dateCreated" | "fileName" | "fileType" | "usedAI"
type SortDirection = "asc" | "desc"

export default function FileHistoryPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortField, setSortField] = useState<SortField>("dateCreated")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const currentUser = "john.doe@example.com"

  const filteredFiles = mockFiles.filter((file) => file.fileName.toLowerCase().includes(searchTerm.toLowerCase()))

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    if (sortField === "dateCreated") {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent hover:drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300">
                ZOMJEED
              </h1>
            </div>

            {/* User Account */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Current User: <span className="font-medium text-gray-900">{currentUser}</span>
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:border-pink-300 transition-all duration-300"
                  >
                    <User className="h-4 w-4" />
                    Account
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Files */}
          <Card className="border-2 border-transparent bg-gradient-to-r from-pink-500 to-orange-500 p-0.5 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300">
            <div className="bg-white rounded-lg p-6 h-full">
              <CardHeader className="pb-2 px-0">
                <CardTitle className="text-sm font-medium text-gray-600">Total Files</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                  {mockStats.totalFiles.toLocaleString()}
                </div>
              </CardContent>
            </div>
          </Card>

          {/* File Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">File Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockStats.fileTypes.slice(0, 3).map((type) => (
                  <div key={type.type} className="flex justify-between text-sm">
                    <span className="text-gray-600">{type.type}</span>
                    <span className="font-medium">{type.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">AI Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {mockStats.aiUsage.slice(0, 3).map((ai) => (
                  <div key={ai.name} className="flex justify-between text-sm">
                    <span className="text-gray-600">{ai.name}</span>
                    <span className="font-medium">{ai.uses}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Most Used AI */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600">Most Used AI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                {mockStats.mostUsedAI}
              </div>
              <p className="text-sm text-gray-500 mt-1">{mockStats.aiUsage[0].uses} uses</p>
            </CardContent>
          </Card>
        </div>

        {/* File History Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl font-semibold">File History</CardTitle>

              {/* Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="gap-2 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:border-pink-300 transition-all duration-300"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Filter Options (hidden by default) */}
            {showFilters && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <Input type="date" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">File Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">All Types</option>
                      <option value=".pdf">PDF</option>
                      <option value=".docx">DOCX</option>
                      <option value=".xlsx">XLSX</option>
                      <option value=".txt">TXT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">AI Used</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">All AIs</option>
                      <option value="GPT-4">GPT-4</option>
                      <option value="Claude">Claude</option>
                      <option value="Gemini">Gemini</option>
                      <option value="LLaMA">LLaMA</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* File History Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:shadow-[0_0_10px_rgba(236,72,153,0.2)] transition-all duration-300 select-none"
                      onClick={() => handleSort("dateCreated")}
                    >
                      <div className="flex items-center gap-1">
                        Date Created
                        {sortField === "dateCreated" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:shadow-[0_0_10px_rgba(236,72,153,0.2)] transition-all duration-300 select-none"
                      onClick={() => handleSort("fileName")}
                    >
                      <div className="flex items-center gap-1">
                        File Name
                        {sortField === "fileName" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:shadow-[0_0_10px_rgba(236,72,153,0.2)] transition-all duration-300 select-none"
                      onClick={() => handleSort("fileType")}
                    >
                      <div className="flex items-center gap-1">
                        File Type
                        {sortField === "fileType" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:shadow-[0_0_10px_rgba(236,72,153,0.2)] transition-all duration-300 select-none"
                      onClick={() => handleSort("usedAI")}
                    >
                      <div className="flex items-center gap-1">
                        Used AI
                        {sortField === "usedAI" &&
                          (sortDirection === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          ))}
                      </div>
                    </TableHead>
                    <TableHead className="text-center">Download</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.dateCreated}</TableCell>
                      <TableCell>{file.fileName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{file.fileType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white border-0 hover:shadow-[0_0_10px_rgba(236,72,153,0.4)] transition-all duration-300"
                        >
                          {file.usedAI}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] transition-all duration-300"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {sortedFiles.length === 0 && (
              <div className="text-center py-8 text-gray-500">No files found matching your search criteria.</div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
