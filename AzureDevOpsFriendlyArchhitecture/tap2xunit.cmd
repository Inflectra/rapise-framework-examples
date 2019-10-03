@ECHO off
ECHO Converting test results...
FOR /D %%G in ("*") DO (
    IF EXIST "%%~nxG\last.tap" (
        ECHO File exists %%~nxG\last.tap
        CALL tap --no-coverage -Rxunit - < %%~nxG\last.tap > results\%%~nxG.xml
    ) else (
        ECHO File not found %%~nxG\last.tap
    )
)
ECHO Results converted
EXIT /b 0
