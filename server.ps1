param(
  [int]$Port = 8080
)

$ErrorActionPreference = "Stop"
$siteRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Loopback, $Port)

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".webp" = "image/webp"
  ".mp3"  = "audio/mpeg"
  ".mp4"  = "video/mp4"
  ".ico"  = "image/x-icon"
}

function Send-Response {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$Status,
    [string]$StatusText,
    [byte[]]$Body,
    [string]$ContentType = "text/plain; charset=utf-8"
  )

  $header = "HTTP/1.1 $Status $StatusText`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`nCache-Control: no-cache`r`n`r`n"
  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
}

function Send-FileResponse {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [string]$Method,
    [string]$FilePath,
    [string]$ContentType,
    [string]$RangeHeader
  )

  $fileInfo = [System.IO.FileInfo]::new($FilePath)
  $fileLength = $fileInfo.Length
  $start = [long]0
  $end = [long]($fileLength - 1)
  $status = 200
  $statusText = "OK"
  $contentRange = ""

  if ($RangeHeader -and $RangeHeader -match "^bytes=(\d*)-(\d*)$") {
    $requestedStart = $Matches[1]
    $requestedEnd = $Matches[2]

    if ($requestedStart) {
      $start = [long]$requestedStart
      if ($requestedEnd) { $end = [Math]::Min([long]$requestedEnd, $fileLength - 1) }
    }
    elseif ($requestedEnd) {
      $suffixLength = [Math]::Min([long]$requestedEnd, $fileLength)
      $start = $fileLength - $suffixLength
    }

    if ($start -ge $fileLength -or $start -gt $end) {
      $header = "HTTP/1.1 416 Range Not Satisfiable`r`nContent-Range: bytes */$fileLength`r`nContent-Length: 0`r`nConnection: close`r`n`r`n"
      $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
      $Stream.Write($headerBytes, 0, $headerBytes.Length)
      return
    }

    $status = 206
    $statusText = "Partial Content"
    $contentRange = "Content-Range: bytes $start-$end/$fileLength`r`n"
  }

  $contentLength = $end - $start + 1
  $header = "HTTP/1.1 $status $statusText`r`nContent-Type: $ContentType`r`nContent-Length: $contentLength`r`nAccept-Ranges: bytes`r`n${contentRange}Connection: close`r`nCache-Control: no-cache`r`n`r`n"
  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)

  if ($Method -eq "HEAD") { return }

  $fileStream = [System.IO.File]::OpenRead($FilePath)
  try {
    $fileStream.Seek($start, [System.IO.SeekOrigin]::Begin) | Out-Null
    $buffer = [byte[]]::new(65536)
    $remaining = $contentLength
    while ($remaining -gt 0) {
      $bytesToRead = [int][Math]::Min($buffer.Length, $remaining)
      $bytesRead = $fileStream.Read($buffer, 0, $bytesToRead)
      if ($bytesRead -le 0) { break }
      $Stream.Write($buffer, 0, $bytesRead)
      $remaining -= $bytesRead
    }
  }
  finally {
    $fileStream.Dispose()
  }
}

Write-Output "Starting portfolio server on port $Port..."

try {
  $listener.Start()
  Write-Output "Portfolio server ready at http://127.0.0.1:$Port"

  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()

      $requestHeaders = @{}
      while ($line = $reader.ReadLine()) {
        $separator = $line.IndexOf(":")
        if ($separator -gt 0) {
          $headerName = $line.Substring(0, $separator).Trim().ToLowerInvariant()
          $requestHeaders[$headerName] = $line.Substring($separator + 1).Trim()
        }
      }

      if (-not $requestLine -or $requestLine -notmatch "^(GET|HEAD)\s+([^\s]+)") {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Bad request")
        Send-Response -Stream $stream -Status 400 -StatusText "Bad Request" -Body $body
        continue
      }

      $method = $Matches[1]
      $requestPath = [System.Uri]::UnescapeDataString(($Matches[2] -split "\?")[0])
      if ($requestPath -eq "/") { $requestPath = "/index.html" }

      $relativePath = $requestPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
      $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($siteRoot, $relativePath))

      if (-not $filePath.StartsWith($siteRoot, [System.StringComparison]::OrdinalIgnoreCase) -or -not [System.IO.File]::Exists($filePath)) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("404 - File not found")
        Send-Response -Stream $stream -Status 404 -StatusText "Not Found" -Body $body
        continue
      }

      $extension = [System.IO.Path]::GetExtension($filePath).ToLowerInvariant()
      $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { "application/octet-stream" }
      $rangeHeader = if ($requestHeaders.ContainsKey("range")) { $requestHeaders["range"] } else { "" }
      Send-FileResponse -Stream $stream -Method $method -FilePath $filePath -ContentType $contentType -RangeHeader $rangeHeader
    }
    catch {
      Write-Output "ERROR: $($_.Exception.Message)"
    }
    finally {
      if ($null -ne $client) { $client.Dispose() }
    }
  }
}
finally {
  $listener.Stop()
}
