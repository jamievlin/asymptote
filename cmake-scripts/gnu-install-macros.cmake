# Only run on unix-like systems, windows does not use gnu docpath/syspath locations

if (UNIX)
    include(GNUInstallDirs)

if (CTAN_BUILD)
    set(ASYMPTOTE_SYSDIR_VALUE "")
else()
    set(ASYMPTOTE_SYSDIR_VALUE ${DATADIR}/asymptote)
endif()

    set(ASYMPTOTE_DOCDIR_VALUE ${DATADIR}/doc/asymptote)

    list(APPEND ASY_MACROS
            ASYMPTOTE_SYSDIR="${ASYMPTOTE_SYSDIR_VALUE}"
            ASYMPTOTE_DOCDIR="${ASYMPTOTE_DOCDIR_VALUE}"
    )
endif()
