Dim objWshShell, startServer, startClient
set objWshShell = WScript.CreateObject("WScript.Shell")
startServer = objWshShell.Run("cmd /k cd /d d:\nodejs && node binarymash\KeithWebServer\server.js", 1, false)
startClient = objWshShell.Run("chrome localhost:8080", 1, false)
set objWshShell = nothing