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

      while ($reader.ReadLine()) { }

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
      $body = if ($method -eq "HEAD") { [byte[]]::new(0) } else { [System.IO.File]::ReadAllBytes($filePath) }
      Send-Response -Stream $stream -Status 200 -StatusText "OK" -Body $body -ContentType $contentType
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
