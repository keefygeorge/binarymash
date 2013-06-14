 Dim objWshShell, ls
 set objWshShell = WScript.CreateObject("WScript.Shell")
 ls = objWshShell.Run("cmd /k cd /d d:\nodejs && node binarymash\KeithWebServer\server.js", 1, false)
 set objWshShell = nothing