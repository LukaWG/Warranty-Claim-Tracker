NOTE:
 -  {Set-Alias -Name git -Value C:\Users\wilsl\Documents\Standalone\git-v2.54.0.windows.1\bin\git.exe}
 -  {$env:PATH="C:\Users\wilsl\Documents\Standalone\node-v24.15.0;$env:PATH"}

CHANGES made to run on Hendy laptop:
 -  Changed databaseclint back to old file (new file is now called databaseClientNew.js)
 -  Line 41, App.jsx commented out navigate to log in page
 -  Comment out auth Auth.ts and wrote mock functions to allow app to run