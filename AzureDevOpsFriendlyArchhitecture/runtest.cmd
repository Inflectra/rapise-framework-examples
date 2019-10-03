@echo off
If /I "%Processor_Architecture%" NEQ "x86" (
%SystemRoot%\SysWoW64\cmd.exe /C %0 %*
goto :eof
)
set SES_ENGINE_HOME=c:\Work\Inflectra\Rapise\Rapise\Core\Engine
SET SMARTESTUDIO_TEST_FOLDER=%~dp0%1
pushd "%SMARTESTUDIO_TEST_FOLDER%"
echo --------------------------------
echo Engine home: %SES_ENGINE_HOME%
echo Test folder: %SMARTESTUDIO_TEST_FOLDER%
echo Parameters: %2
echo --------------------------------
cscript.exe "%SES_ENGINE_HOME%\SeSExecutor.js" "%SMARTESTUDIO_TEST_FOLDER%\%1.sstest" %2
set EXIT_CODE=%errorlevel%
echo --------------------------------
echo Error code: %EXIT_CODE%
echo --------------------------------
popd
EXIT /b %EXIT_CODE%
