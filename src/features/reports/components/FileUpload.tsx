import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useDropzone } from "react-dropzone"

/**
 * File upload component with drag-and-drop support.
 *
 * Features:
 * - Accepts PNG, JPG and PDF files up to 3MB
 * - Shows the uploaded file name and allows removing or replacing it
 * - Validates format and size, showing error messages when necessary
 *
 * @param onFile - Callback to pass the selected file (or null if removed/invalid)
 */


type FileUploadProps = {
  onFile: (file: File | null) => void
}

const MAX_SIZE = 3 * 1024 * 1024 
const ACCEPTED_FORMATS = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "application/pdf": [".pdf"],
}

function FileUpload({ onFile }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED_FORMATS,
    maxSize: MAX_SIZE,
    multiple: false,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        const rejection = fileRejections[0]
        if (rejection.errors.some((err) => err.code === "file-too-large")) {
          setError("El archivo excede los 3 MB")
        } else {
          setError("Formato no válido (solo PNG, JPG, PDF)")
        }
        setFileName(null)
        onFile(null)
        return
      }

      const file = acceptedFiles[0]
      setError(null)
      setFileName(file ? file.name : null)
      onFile(file || null)
    },
  })

  const handleRemove = () => {
    setFileName(null)
    setError(null)
    onFile(null)
  }

  return (
    <div className="flex flex-col">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 ${error ? "border-red-500" : "border-gray-300"
          } ${isDragActive ? "bg-blue-50" : "bg-transparent"}`}
      >
        <input {...getInputProps()} aria-label="Subir archivo" />
        <CloudUploadIcon className="text-gray-500" fontSize="large" />

        <Typography>
          <span className="text-brand font-medium">
            {fileName ? "Reemplazar archivo" : "Subir un archivo"}
          </span>{" "}
          <span className="text-gray-600">
            {fileName ? "o arrastrar y soltar" : "o arrastrar y soltar"}
          </span>
        </Typography>

        <Typography
          variant="caption"
          display="block"
          className="mt-1 text-gray-500"
        >
          PNG, JPG, PDF hasta 3MB
        </Typography>
      </div>

      {fileName && (
        <Box className="flex items-center justify-between mt-2 px-2 py-1 border rounded bg-gray-50">
          <Box className="flex items-center gap-2">
            <InsertDriveFileIcon fontSize="small" className="text-gray-500" />
            <Typography variant="body2" className="truncate max-w-[200px]">
              {fileName}
            </Typography>
          </Box>
          <Button size="small" color="error" onClick={handleRemove}>
            Quitar
          </Button>
        </Box>
      )}

      {error && (
        <Typography
          variant="caption"
          color="error"
          display="block"
          className="mt-1"
        >
          {error}
        </Typography>
      )}
    </div>
  )
}

export default FileUpload
