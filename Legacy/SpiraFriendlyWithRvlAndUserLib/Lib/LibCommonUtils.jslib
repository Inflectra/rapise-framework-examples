
SeSRegisterLibrary(
	{
		name: 'CommonUtils',
        description: 'CommonUtils - Default user-defined library',
		include: 'Lib/LibCommonUtils/LibCommonUtils.js',
		info: null,
		load_order: 1000,   
        recording: false, // Only use in playback. If it has recording rules then set it to 'true'
		autoload: true // Always load this library for this test and each subtest
    }
);