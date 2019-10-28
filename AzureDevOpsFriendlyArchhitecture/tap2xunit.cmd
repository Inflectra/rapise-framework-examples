@ECHO off
ECHO Converting test results...
FOR /D %%G in ("*") DO (
    IF EXIST "%%~nxG\last.tap" (
        ECHO File exists %%~nxG\last.tap
        CALL tap --no-coverage -Rxunit - < %%~nxG\last.tap > results\%%~nxG.xml
        copy %%~nxG\last.tap reports\%%~nxG.tap
    ) else (
        ECHO File not found %%~nxG\last.tap
    )
    IF EXIST "%%~nxG\%%~nxG.trp" (
        ECHO File exists %%~nxG\%%~nxG.trp
        copy %%~nxG\%%~nxG.trp reports\%%~nxG.trp
    ) else (
        ECHO File not found %%~nxG\%%~nxG.trp
    )
    IF EXIST "%%~nxG\summary.log" (
        ECHO File exists %%~nxG\summary.log
        copy %%~nxG\summary.log reports\%%~nxG.log
    ) else (
        ECHO File not found %%~nxG\summary.log
    )
)
ECHO Results converted
EXIT /b 0
