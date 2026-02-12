# [@baklavue/composables-v1.0.0-preview.3](https://github.com/erbilnas/baklavue/compare/@baklavue/composables-v1.0.0-preview.2...@baklavue/composables-v1.0.0-preview.3) (2026-02-12)


### Features

* add new composables ([8e5cb7e](https://github.com/erbilnas/baklavue/commit/8e5cb7eb49ed6079748d7e5e282a51042a6ee2af))
* add new composables ([fe130be](https://github.com/erbilnas/baklavue/commit/fe130be0123821e5cae0d9330f2e6709753a40b9))
* add query composable ([28101d0](https://github.com/erbilnas/baklavue/commit/28101d03b747a0b737f889e0310856c779699844))
* add zod form validation composable ([839a77f](https://github.com/erbilnas/baklavue/commit/839a77f1c42077fd2bdcf3b374f53d819a5cfa6b))

# [Unreleased]

### Features

* add useColorScheme composable - Light/dark/system color scheme with persistence
* add useThemePreset composable - Persist Baklava theme preset across sessions
* add useElementSize composable - Reactive element dimensions via ResizeObserver
* add useWindowSize composable - Reactive viewport width and height
* add useContainerScroll composable - Scroll position inside a scrollable container
* add useSticky composable - Detect when sticky element is stuck
* add useMutation composable - Mutations (POST/PUT/DELETE) with onSuccess, onError, onSettled
* add refetchInterval and refetchIntervalInBackground to useQuery - Polling with optional pause when tab hidden
* add useInfiniteQuery composable - Infinite scroll / cursor-based pagination
* add prefetchQuery to useQueryClient - Preload data before navigation
* add useLazyQuery composable - On-demand queries that fetch when execute() is called
* add usePolling composable - Polling with fetch state for non-query scenarios
* add useShare composable - Web Share API for sharing text, URLs, or files
* add useBase64 composable - Convert Blob/File/ArrayBuffer/canvas to Base64
* add usePrevious composable - Track previous value of a ref
* add useToggle composable - Simple boolean toggle
* add useDateFormat composable - Reactive locale-aware date formatting (Intl)
* add useNumberFormat composable - Reactive locale-aware number/currency formatting (Intl)
* add useSlug composable - Convert string to URL-friendly slug
* add useAsyncState composable - Generic async state (loading, error, data)
* rename csv.ts to file.ts and add useFile composable
* add multi-format support (CSV, TSV, JSON) for parse, create, and download
* add parseStream for chunked parsing of large CSV/TSV files
* add preview for parsing first N rows without full load
* add Zod schema validation option for parsed data
* add transform hook for row-level transformation/filtering
* add typed generics for parse, parseFile, and preview results
* add Excel (.xlsx, .xls) support for parseFile, preview, create, and download
* add Blob support for parseFile, preview, and parseStream (in addition to File)

# [@baklavue/composables-v1.0.0-preview.2](https://github.com/erbilnas/baklavue/compare/@baklavue/composables-v1.0.0-preview.1...@baklavue/composables-v1.0.0-preview.2) (2026-02-11)


### Features

* add new composables ([49105ea](https://github.com/erbilnas/baklavue/commit/49105eaa106f1a5b888f9e3f9638ed9776b3d55b))

# @baklavue/composables-v1.0.0-preview.1 (2026-02-11)


### Bug Fixes

* fix package version ([620618d](https://github.com/erbilnas/baklavue/commit/620618df664022f1b68859aee4b374f6586731bb))
* fix release ci ([6c22554](https://github.com/erbilnas/baklavue/commit/6c225541b182c4b8692af000e7c13ca6e546599a))
* fix release ci ([6e23d99](https://github.com/erbilnas/baklavue/commit/6e23d99cac122d033c72d6d98819e0329c92bcdc))


### Features

* add accordion and alert components ([10b8155](https://github.com/erbilnas/baklavue/commit/10b81556184432deb2772d3489c24be6115e667c))
* add info for npm package ([8ffbb9f](https://github.com/erbilnas/baklavue/commit/8ffbb9f81d108d633608ebe8d3854a2f6861475a))
* add localization guide ([0367e41](https://github.com/erbilnas/baklavue/commit/0367e41741cdffb2dfb7ec631db3cb47b12fe6cc))
* add new components ([ec926f0](https://github.com/erbilnas/baklavue/commit/ec926f0e9ba11c1a28a97c8afee4829b38ed8539))
* add theme customizer tool for docs ([70c08cf](https://github.com/erbilnas/baklavue/commit/70c08cf505ff02b1ab6c3e569055b703674bb822))
* disable npm package-lock for bun ([d91c5ca](https://github.com/erbilnas/baklavue/commit/d91c5ca0d8566aff9c021b1cad431eda86bc2d95))
* disable npm package-lock for bun ([86fd15e](https://github.com/erbilnas/baklavue/commit/86fd15ed42ded4e198ed22845acdb659cdfde191))
* initial commit ([d98b3f9](https://github.com/erbilnas/baklavue/commit/d98b3f9e6cc6e8238f197eaa117a050365987b18))
* seperate publishing packages ([e8092d8](https://github.com/erbilnas/baklavue/commit/e8092d87a6579cf6d2798053cd6150fc4ccd98a8))

# [1.0.0-preview.5](https://github.com/erbilnas/baklavue/compare/v1.0.0-preview.4...v1.0.0-preview.5) (2026-02-09)


### Features

* add github pages support ([c76dffa](https://github.com/erbilnas/baklavue/commit/c76dffa8eb32b8293aca7c7e1f5d2ee4139802b0))

# [1.0.0-preview.3](https://github.com/erbilnas/baklavue/compare/v1.0.0-preview.2...v1.0.0-preview.3) (2026-02-09)


### Features

* add new components ([22a1506](https://github.com/erbilnas/baklavue/commit/22a150681ad8587c92ad5546fbc256d9275b6d00))

# [1.0.0-preview.2](https://github.com/erbilnas/baklavue/compare/v1.0.0-preview.1...v1.0.0-preview.2) (2026-02-09)


### Features

* add accordion, alert and badge components ([b939941](https://github.com/erbilnas/baklavue/commit/b939941e469a29b10ddcc6196f97700951672f97))

# 1.0.0-preview.1 (2026-02-09)


### Bug Fixes

* fix known issue of npm@11 ([f73a8fa](https://github.com/erbilnas/baklavue/commit/f73a8fa56191c083545b0f02d0672539a8dfbfab))
* fix known issue of npm@11 ([6e90aeb](https://github.com/erbilnas/baklavue/commit/6e90aeb37bbd42c9d0e524735ec34481f0c87ecf))
* fix package version ([620618d](https://github.com/erbilnas/baklavue/commit/620618df664022f1b68859aee4b374f6586731bb))
* fix release ci ([6c22554](https://github.com/erbilnas/baklavue/commit/6c225541b182c4b8692af000e7c13ca6e546599a))
* fix release ci ([6e23d99](https://github.com/erbilnas/baklavue/commit/6e23d99cac122d033c72d6d98819e0329c92bcdc))


### Features

* add info for npm package ([8ffbb9f](https://github.com/erbilnas/baklavue/commit/8ffbb9f81d108d633608ebe8d3854a2f6861475a))
* add new feature ([771acd1](https://github.com/erbilnas/baklavue/commit/771acd19bbd730e4110f61d2df06a5f6a958a3a7))
* disable npm package-lock for bun ([d91c5ca](https://github.com/erbilnas/baklavue/commit/d91c5ca0d8566aff9c021b1cad431eda86bc2d95))
* disable npm package-lock for bun ([86fd15e](https://github.com/erbilnas/baklavue/commit/86fd15ed42ded4e198ed22845acdb659cdfde191))
* disable npm package-lock for bun ([ca4503d](https://github.com/erbilnas/baklavue/commit/ca4503d1304cacb6212c6b328426d7c51152f893))
* increase semantic release version\ ([b510944](https://github.com/erbilnas/baklavue/commit/b510944562238e02fa6ce34c1b10540e11d47f16))
* initial commit ([d98b3f9](https://github.com/erbilnas/baklavue/commit/d98b3f9e6cc6e8238f197eaa117a050365987b18))
