# T041: Coverage manifest — reconciliation pending

**Updated:** 2026-10-26\
**Compared revision:** `4d643768551e7e18c75ae7831be2917da4026c90`\
**Baseline:** `b7c3c4413f5fc7ed2e73a50ca7462d45a8e2e1b9`\
**Status:** PENDING — row evidence recorded; T067 verification remains incomplete.

## Evidence and scope

The tables below replace the earlier unverified row inventory. G-identifiers are
assigned in the sorted path order of the [T021 baseline](./T021-baseline.sha256),
whose 116 hashes were compared with Git blobs at the baseline above. S-identifiers
follow the supporting-file order below. Approved N-identifiers and destinations
follow [CONSOLIDATION-MANIFEST.md](../CONSOLIDATION-MANIFEST.md). Deferred
proposals retain the destinations and N032 portfolio/N033 PWA labels recorded
in remote commit `7c7cc7d5be3562be9981373ef4ec2d13ddadcceb`; the conflicting
operational-manifest labels are recorded below for T067 reconciliation.

**Current SHA-256 column**: Contains individual per-file SHA-256 hashes (not baseline commit). SHA-256 values describe current file bytes, including resolved skill symlinks.
For the three absent G-paths, the hash describes the named archive copy. For
pointers, the hash describes the source pointer; Destination is its first banner
link, resolved relative to that file. These observations do not verify content
preservation, one-hop chains, archive reverse links or protected-file approvals.
A file's presence alone does not establish completion of its required content.
Deferred paths are proposals only; their existence and hashes are not required.

## Inventory summary

| Category | Rows | Observed state | Verification status |
| --- | --- | --- | --- |
| G-documents | 116 | 90 changed at original paths; 23 unchanged; 3 original paths absent with archive copies present | PENDING: preservation and dispositions |
| S-documents | 9 | Nine paths readable; six skills resolve via symlinks | PENDING: D0 approval and content checks |
| N-documents, Phase 2 | 29 | All 29 canonical destinations present; includes updates and archive pointers | PENDING: content, dependencies and pointers |
| N-documents, deferred | 4 | Proposed rows retained per D4/D8 | DEFERRED: no creation requirement |
| **Total** | **158** | **116 + 9 + 29 + 4** | **154 PENDING; 4 DEFERRED** |

The earlier “90 modified + 26 unchanged” summary counted the three absent
original G-paths as unchanged. Current observations are 90 changed + 23 unchanged
+ 3 archive candidates. Preservation of unique content still requires inspection.

## Phase 2 N-inventory reconciliation

The approved IDs below supersede the earlier mismatched N007–N019 and N027–N029
groups. Filenames and full paths appear once per ID in the row table below.
`code-quality-report.md` is not an approved destination in the consolidation
manifest and is not counted in either group. N006 is the existing Brand Voice
& Messaging guide, rather than an unspecified asset. N024/N025 are existing page
guides, N026 is an existing archive pointer, and N017 updates a baseline G-file.

| Group | IDs | Count | Observed disposition | Verification status |
| --- | --- | --- | --- | --- |
| Reference | N001–N005 | 5 | Five destination files present | PENDING |
| Organization & core guidance | N006–N018 | 13 | Thirteen destination files present; N017 updates an existing file | PENDING |
| Patterns | N019–N022 | 4 | Four destination files present | PENDING |
| Pages | N023–N025 | 3 | Three destination files present, including N024 homepage layout | PENDING |
| Reports & archive index | N026–N029 | 4 | Three archive pointers and one archive index present | PENDING |
| **Phase 2 total** | **N001–N029** | **29** | **29 destinations present; approval of scope is recorded in D4** | **Implementation verification PENDING** |

Approval of the 29-document scope is separate from implementation verification.
The deferred rows retain the remote proposals: N030/N031 archive paths, N032
`guidelines/portfolio-showcase.md` and N033 `guidelines/pwa-implementation.md`.
The operational manifest instead labels N032 PWA and N033 portfolio. This
report preserves both recorded mappings as evidence of the outstanding T067
reconciliation; it does not approve creation of any deferred document. Row
statuses use plain `PENDING`/`DEFERRED` values, with explanations in a separate
evidence column.

## Row-level observations (158 entities)

### G-documents (116)

| ID | Path | Current SHA-256 | Observed operation | Destination | Status | Evidence / remaining verification |
| --- | --- | --- | --- | --- | --- | --- |
| G001 | `guidelines/ARCHITECTURE.md` | `15a038de67cc3c68ccc84449a8215dca042ccd81878b03a2cf1540a0ef7b4a31` | Unchanged | `guidelines/ARCHITECTURE.md` | PENDING | preservation/operation approval |
| G002 | `guidelines/Guidelines.md` | `88b6bcb14e133c2638b1d9c421bf208bdc997e7aebd3af09a4d22d2b6a96cfb5` | Modified | `guidelines/Guidelines.md` | PENDING | preservation/operation approval |
| G003 | `guidelines/README.md` | `09083340ca0d14b3a9518cd1896678b9929cf548ef0bf95204a90e5d0f5b9797` | Modified | `guidelines/README.md` | PENDING | preservation/operation approval |
| G004 | `guidelines/SITEMAP.md` | `15686df433bada99d3f6b4013fd17569171bfca8c8bea7abd7d72df99116dde3` | Modified | `guidelines/SITEMAP.md` | PENDING | preservation/operation approval |
| G005 | `guidelines/accessibility-report-feb-2025.md` | `43392363cdf3979a0fcff6e1e3a415b6697108c260775651125a1c6dd8ca844b` | Modified | `guidelines/accessibility-report-feb-2025.md` | PENDING | preservation/operation approval |
| G006 | `guidelines/blocks/BlogCard.md` | `feddfefe7fc1e221e5b8b354616a6fd2de710d9b9ebca043945fc2df475027b1` | Modified | `guidelines/blocks/BlogCard.md` | PENDING | preservation/operation approval |
| G007 | `guidelines/blocks/Lightbox.md` | `b50ab8455e3347eead75a867f7a2ff38476e3b6cdd7b855cc9e09a538381ac1a` | Modified | `guidelines/blocks/Lightbox.md` | PENDING | preservation/operation approval |
| G008 | `guidelines/blocks/Pagination.md` | `d52a52a8fae82bb04fec9abaffb7d7a7b20680846224f546bb059c1c3b0a4cc1` | Modified | `guidelines/blocks/Pagination.md` | PENDING | preservation/operation approval |
| G009 | `guidelines/blocks/PortfolioCard.md` | `ba1763679f983e1ea8ea1b7370ad568671625966ee65841ba1e632234e248d76` | Modified | `guidelines/blocks/PortfolioCard.md` | PENDING | preservation/operation approval |
| G010 | `guidelines/changelog.md` | `0fc65622b117f2cad38f476b8efadd8ad02373b24231697ceb79da038aab2a45` | Modified | `guidelines/changelog.md` | PENDING | preservation/operation approval |
| G011 | `guidelines/component-dark-mode.md` | `e328c3c9a2ec213c640b67ff8191506e2298b0f0d9e4d6d2a8523da1ba2c411c` | Modified | `guidelines/component-dark-mode.md` | PENDING | preservation/operation approval |
| G012 | `guidelines/components/Accordion.md` | `913a82d38bac8b373876e975f4bbf34300aa5172684a0fb91d6dbed100d57ec2` | Unchanged | `guidelines/components/Accordion.md` | PENDING | preservation/operation approval |
| G013 | `guidelines/components/BlogCard.md` | `b81227b7d0407af36b25b10762f22acf1954375e19c879ae2289c269c76406a6` | Modified | `guidelines/components/BlogCard.md` | PENDING | preservation/operation approval |
| G014 | `guidelines/components/Breadcrumbs.md` | `3fe629ee8479c2cc0eed3b11fbe724e628d7799ac69058c04d1e045d048a3173` | Modified | `guidelines/components/Breadcrumbs.md` | PENDING | preservation/operation approval |
| G015 | `guidelines/components/CategoryFilter.md` | `134e13daa948a947bbe9a647100747f65fc808460efb1058a818e4fd2e7bbeaa` | Modified | `guidelines/components/CategoryFilter.md` | PENDING | preservation/operation approval |
| G016 | `guidelines/components/ChapterNav.md` | `c988b875b66e8b6039555e95307a336eacb61f4ac5e52125739b2ed91478d3e6` | Unchanged | `guidelines/components/ChapterNav.md` | PENDING | preservation/operation approval |
| G017 | `guidelines/components/ColorfulIcons.md` | `52933f94d87daaf8a4dbb04d14cf86d6be97868b57d39ab38a1783690ff740fd` | Modified | `guidelines/components/ColorfulIcons.md` | PENDING | preservation/operation approval |
| G018 | `guidelines/components/ContentSection.md` | `8dc838aba6647a7e0c6c206f5883b7a5eb477454482b55e0dacc315fa9254b4b` | Modified | `guidelines/components/ContentSection.md` | PENDING | preservation/operation approval |
| G019 | `guidelines/components/EbookPage.md` | `6475f0931988eb48c824fd15197ca858e06b66cd77c1c165a9272d565ce6c790` | Modified | `guidelines/components/EbookPage.md` | PENDING | preservation/operation approval |
| G020 | `guidelines/components/Footer.md` | `5e8da1e69b98f326de222fe25f0e671606544ecbc2c7c2cee95dec92692b92e4` | Modified | `guidelines/components/Footer.md` | PENDING | preservation/operation approval |
| G021 | `guidelines/components/Header.md` | `0d82565f5f2d871dbf30a6878b9aac515ca3be33e7b06fba0ab71b87739c39bc` | Modified | `guidelines/components/Header.md` | PENDING | preservation/operation approval |
| G022 | `guidelines/components/HeroSection.md` | `fe7ded2d01edb00dd1d29e931152b10c318cc02b612aa1b76468ce191f0ed64c` | Modified | `guidelines/components/HeroSection.md` | PENDING | preservation/operation approval |
| G023 | `guidelines/components/ImageGallery.md` | `72072bcf15832e5c889d3df4409a5f437668ecb258084bb046a83ec43f27cde2` | Modified | `guidelines/components/ImageGallery.md` | PENDING | preservation/operation approval |
| G024 | `guidelines/components/LayoutSwitcher.md` | `84dbc1a63ed23ee02348479f276383d17cc04ff5e7e17d1c4857e8dc8c77fd74` | Modified | `guidelines/components/LayoutSwitcher.md` | PENDING | preservation/operation approval |
| G025 | `guidelines/components/Lightbox.md` | `44c723a8dea7ac096be0f843c336a0203b5dd7b9d696cf9e5bd5bff5c5d2a9c0` | Modified | `guidelines/components/Lightbox.md` | PENDING | preservation/operation approval |
| G026 | `guidelines/components/LoadingSpinner.md` | `1bb9e530e0ac7e06e3fa095102abf52ae85480a75f8fc7c69ee5f7bedbfb1a89` | Modified | `guidelines/components/LoadingSpinner.md` | PENDING | preservation/operation approval |
| G027 | `guidelines/components/Logo.md` | `34e71128d9e6507d47b237cf67e36407c88df89fc5a66cd18c92dadc25f962d8` | Modified | `guidelines/components/Logo.md` | PENDING | preservation/operation approval |
| G028 | `guidelines/components/Modal.md` | `b1a194602a189e19a68b563bcf63bc31f5bd2ea6e996e91abf8bb31ea7ee4832` | Modified | `guidelines/components/Modal.md` | PENDING | preservation/operation approval |
| G029 | `guidelines/components/Pagination.md` | `897e7b3a63c9a8d802cf9c49d0b9e30fbd4ddcc8dde27cdaeb7a8311ab173a88` | Modified | `guidelines/components/Pagination.md` | PENDING | preservation/operation approval |
| G030 | `guidelines/components/PortfolioCard.md` | `fdbc4e1875a41e5d03bf9c77314b58a9e27213ff007eacfb0ee3690ff3bd39e8` | Modified | `guidelines/components/PortfolioCard.md` | PENDING | preservation/operation approval |
| G031 | `guidelines/components/PullQuote.md` | `22e7d7b64cc8bc5d3e23f91e766077bcbf16bf109d59cbc4789f474340e3062a` | Modified | `guidelines/components/PullQuote.md` | PENDING | preservation/operation approval |
| G032 | `guidelines/components/ReadMoreButton.md` | `975cae797289c7f7f4834a9e99585336b61cd1d0e675d065accd1dabb443627c` | Modified | `guidelines/components/ReadMoreButton.md` | PENDING | preservation/operation approval |
| G033 | `guidelines/components/ScrollDownArrow.md` | `73231b7c187a8d579e76c9c584adc9d7995a1dd93d8f5589a7c9fb1dd9ef1e0b` | Modified | `guidelines/components/ScrollDownArrow.md` | PENDING | preservation/operation approval |
| G034 | `guidelines/components/ScrollToTop.md` | `dbe88e0f852c703a1df1793d0299ca8205d56ce319a3ea86fa22f52de115e814` | Unchanged | `guidelines/components/ScrollToTop.md` | PENDING | preservation/operation approval |
| G035 | `guidelines/components/SearchBar.md` | `73156a4d85a0e89c9fc91b33bc3dd6dc15c5ebbd254e15a5b5ec5c3399d8a899` | Unchanged | `guidelines/components/SearchBar.md` | PENDING | preservation/operation approval |
| G036 | `guidelines/components/SectionCard.md` | `26f2baa0149ef496214a5733b4f57b440ec2721a32799baf1066ecadaaebfb46` | Modified | `guidelines/components/SectionCard.md` | PENDING | preservation/operation approval |
| G037 | `guidelines/components/ShareComponent.md` | `14e0645670711a2b0df0277144ba6b1728658dc050fb017cea50f3364659d85f` | Unchanged | `guidelines/components/ShareComponent.md` | PENDING | preservation/operation approval |
| G038 | `guidelines/components/SliderCard.md` | `5d5362d206b8c2a459dcdaf0a653eaf16c7d7def3c6eeff8e36638bc64415187` | Modified | `guidelines/components/SliderCard.md` | PENDING | preservation/operation approval |
| G039 | `guidelines/components/SocialLinks.md` | `682cf9eb3dc70753e95b06c2d598864c2d089c9deaaa2161953ff224701230ee` | Modified | `guidelines/components/SocialLinks.md` | PENDING | preservation/operation approval |
| G040 | `guidelines/components/SplitContent.md` | `8370e87bc087ca9875b16f8f47b2c3bb2b1866ade601f7adc9631d4cb503c3ef` | Unchanged | `guidelines/components/SplitContent.md` | PENDING | preservation/operation approval |
| G041 | `guidelines/components/StatCard.md` | `cca9e3e0a841d1e732849f85475dba6613a159ac564268a730ac0983a757fbc9` | Unchanged | `guidelines/components/StatCard.md` | PENDING | preservation/operation approval |
| G042 | `guidelines/components/Tag.md` | `5f47a893a7bc92f4b3880e1b8303bbdfb030a8359061e53af7a123f600e35889` | Modified | `guidelines/components/Tag.md` | PENDING | preservation/operation approval |
| G043 | `guidelines/components/TestimonialCard.md` | `d1f246a20cbbf1dfcab1f6ee425854bb88c1c47a434a30231244a7bb5ad12ebb` | Modified | `guidelines/components/TestimonialCard.md` | PENDING | preservation/operation approval |
| G044 | `guidelines/components/Timeline.md` | `ba7f7f9e8a30603f664bbacff1575f3a516e6efd72ebff5183ee91bd33609125` | Unchanged | `guidelines/components/Timeline.md` | PENDING | preservation/operation approval |
| G045 | `guidelines/components/TypeformEmbed.md` | `8fe50d86b4347d108d7e929f68e85d8984baed3de6fe5d0cfda66ce3ef0399c0` | Unchanged | `guidelines/components/TypeformEmbed.md` | PENDING | preservation/operation approval |
| G046 | `guidelines/content-type-colours.md` | `faf58a02cbc78e13330877b9e00b190778b2308ab01b29469e95a6aafad9d146` | Modified | `guidelines/content-type-colours.md` | PENDING | preservation/operation approval |
| G047 | `guidelines/css-architecture.md` | `424cce865e7aac4ce88dc951c131b21265d51324abac5a5f0d1eb81219b23974` | Modified | `guidelines/css-architecture.md` | PENDING | preservation/operation approval |
| G048 | `guidelines/dark-mode-implementation.md` | `5dccd4c5b0fe157b4ace273100383694fd99ee4933c175c9844a9ce3fcb1a2fc` | Pointer (observed) | `guidelines/css-architecture-reference.md` | PENDING | preservation/operation approval |
| G049 | `guidelines/dark-mode-lessons-learned.md` | `2376e390b3c30d9643d6a72bc2eec1b167bf9c9050b5feaa85dd9e89c1296891` | Pointer (observed) | `guidelines/css-architecture-reference.md` | PENDING | preservation/operation approval |
| G050 | `guidelines/data-models.md` | `4c3e10eb7fadd3c918b6aed3fa53e306a8a11acc27c834000b46fd34e52f433e` | Unchanged | `guidelines/data-models.md` | PENDING | preservation/operation approval |
| G051 | `guidelines/design-tokens/animations.md` | `ba56904abac592308c4e4498477975b694905137424833530cb9c51b2e60a305` | Pointer (observed) | `guidelines/design-tokens-reference.md` | PENDING | preservation/operation approval |
| G052 | `guidelines/design-tokens/colors.md` | `1d4211fd8d07e2e955691612cf04258e42c87b010cc3e699c8fa612de1fb0964` | Pointer (observed) | `guidelines/design-tokens-reference.md` | PENDING | preservation/operation approval |
| G053 | `guidelines/design-tokens/design-system-reference.md` | `5c32e4ee4f4477377fbb044e879af96599eaac437ea077e6c9316c7d3dacbc9b` | Modified | `guidelines/design-tokens/design-system-reference.md` | PENDING | preservation/operation approval |
| G054 | `guidelines/design-tokens/iconography.md` | `fb1c2d0fe70b63d219867673eb673ce2f9ea0c7add2d7f9d126012bde59d7504` | Pointer (observed) | `guidelines/design-tokens-reference.md` | PENDING | preservation/operation approval |
| G055 | `guidelines/design-tokens/light-dark-mode.md` | `91254b9d18ce8257c9d57d0d174dc44d248a823f1c19b1c54717940cd9511c24` | Pointer (observed) | `guidelines/design-tokens-reference.md` | PENDING | preservation/operation approval |
| G056 | `guidelines/design-tokens/neon-colors.md` | `370141e161cb07239f16cb70ca4586ecfafeb56637e2db53e57dcefd07979fe8` | Pointer (observed) | `guidelines/design-tokens-reference.md` | PENDING | preservation/operation approval |
| G057 | `guidelines/design-tokens/neon-system.md` | `af8e5f0dc4619f14c908496e7a6195788160ad812ff5c7a51ae3e4a0674668c1` | Pointer (observed) | `guidelines/design-tokens-reference.md` | PENDING | preservation/operation approval |
| G058 | `guidelines/design-tokens/portfolio-design-tokens.md` | `84eafd80669f8b05037d04638891b48fad0bf3cfc564512daf6227f36df27e1a` | Pointer (observed) | `guidelines/design-tokens-reference.md` | PENDING | preservation/operation approval |
| G059 | `guidelines/design-tokens/spacing.md` | `22c3820ec43e192ef7f4aa51fec5712b6231723ab7da31d9ecd5c91582bc6c6c` | Pointer (observed) | `guidelines/design-tokens-reference.md` | PENDING | preservation/operation approval |
| G060 | `guidelines/design-tokens/typography.md` | `a5d19ac003681377878dcc75f9de27a3d05df869c96d183cab4b9256434a870a` | Pointer (observed) | `guidelines/design-tokens-reference.md` | PENDING | preservation/operation approval |
| G061 | `guidelines/events-system.md` | `caa42a789236178ac3c9f48fd40867f55f4291dde94e90d959eb25870fb88280` | Unchanged | `guidelines/events-system.md` | PENDING | preservation/operation approval |
| G062 | `guidelines/icons/interface.md` | `182aaf263069b5dafd25f8392ed18228f8ec58cb9888587d11b7cc6dd2090498` | Pointer (observed) | `guidelines/media-guidelines.md` | PENDING | preservation/operation approval |
| G063 | `guidelines/icons/travel.md` | `fb0d7ab188ff55ada0331b7e8659547deac3a43af109298172f118633e658b6c` | Pointer (observed) | `guidelines/media-guidelines.md` | PENDING | preservation/operation approval |
| G064 | `guidelines/image-optimization.md` | `cbad4b4aa793ec25fb7ddad656389481f9984ec79ce0c6f705a7fdd03cc5be2e` | Pointer (observed) | `guidelines/media-guidelines.md` | PENDING | preservation/operation approval |
| G065 | `guidelines/interactions-accessibility.md` | `3c12f5618c3aa53fafd132546551ef4e70ad9d2a6fd508760e56d73e4b62a236` | Pointer (observed) | `guidelines/accessibility-checklist.md` | PENDING | preservation/operation approval |
| G066 | `guidelines/mobile/animations.md` | `02b9bea71e31490579d58864750b7a5c25b1af84e437f1170dfd6f3481beec04` | Modified | `guidelines/mobile/animations.md` | PENDING | preservation/operation approval |
| G067 | `guidelines/mobile/buttons.md` | `c1399b9fc43793f28a1f237e5af50ec7d076ea92d5e233cf8580d0a0dd90b2c1` | Modified | `guidelines/mobile/buttons.md` | PENDING | preservation/operation approval |
| G068 | `guidelines/mobile/forms.md` | `c3e8076e828b82016abfa9a99271b5b97abf7e59f8768724c4f715bcd9e4bc61` | Unchanged | `guidelines/mobile/forms.md` | PENDING | preservation/operation approval |
| G069 | `guidelines/mobile/images.md` | `9282f3920a2aa2973b021a13259e152ccc1c48f8b5dfeb5397b807d4fe9e3011` | Unchanged | `guidelines/mobile/images.md` | PENDING | preservation/operation approval |
| G070 | `guidelines/mobile/performance.md` | `c19eace658edb0e7b76910e1719238e699bf49747c0980981f8d052c28dc041f` | Unchanged | `guidelines/mobile/performance.md` | PENDING | preservation/operation approval |
| G071 | `guidelines/mobile/spacing.md` | `d898778f1f05f19f2e12135a22e6bc6cd50c6bcfbb461ebf3d76adf7cd2630cb` | Modified | `guidelines/mobile/spacing.md` | PENDING | preservation/operation approval |
| G072 | `guidelines/mobile/typography.md` | `09c209a5ad149dccaae119723dbf58346fc014ba4b49d8921d0cdb1b5700b406` | Modified | `guidelines/mobile/typography.md` | PENDING | preservation/operation approval |
| G073 | `guidelines/nova-news-dark-mode.md` | `3b5d904fbf9a14da57c3a7067293e6a4f9d92c2f67d2c8bb720fcbe13e5387d8` | Modified | `guidelines/nova-news-dark-mode.md` | PENDING | preservation/operation approval |
| G074 | `guidelines/overview-blocks.md` | `c5933b9dc7bc927a3b33bbd671a7d0a017391f317d67d682fcbf8c448eacc33b` | Unchanged | `guidelines/overview-blocks.md` | PENDING | preservation/operation approval |
| G075 | `guidelines/overview-blog-filtering.md` | `4082df9b460413044bb6dba93d4a959b13cfdadc2ecf57719b46f57ed73b0ef5` | Unchanged | `guidelines/overview-blog-filtering.md` | PENDING | preservation/operation approval |
| G076 | `guidelines/overview-components.md` | `3e3d9c889c933ef7e694f1c1354866cd42a6b8f9e878a0ce6ae85a66a159e97f` | Modified | `guidelines/overview-components.md` | PENDING | preservation/operation approval |
| G077 | `guidelines/overview-icons.md` | `ed7bb37908669406fbeb87f70aa75b9faac0b99c3e75a2dbced72872ea291818` | Modified | `guidelines/overview-icons.md` | PENDING | preservation/operation approval |
| G078 | `guidelines/overview-parts.md` | `f5e92eee4c025a0f4ad4df1e910e52d58de1586193d7857b48c910efb758315c` | Unchanged | `guidelines/overview-parts.md` | PENDING | preservation/operation approval |
| G079 | `guidelines/overview-patterns.md` | `51e98c0b7af49e492a53a1a3729f4bb46ee0c3fa637d8cab749e31e0d925c712` | Unchanged | `guidelines/overview-patterns.md` | PENDING | preservation/operation approval |
| G080 | `guidelines/overview-sections.md` | `605e5ac39f0cfe7642615a16e219315bb7ad456938b7d8b706b71aa8ac1816ca` | Modified | `guidelines/overview-sections.md` | PENDING | preservation/operation approval |
| G081 | `guidelines/overview-templates.md` | `5b4a8c9b93122c695a0cf52d3844bf70919f98477110201d56b51e54184a00c5` | Unchanged | `guidelines/overview-templates.md` | PENDING | preservation/operation approval |
| G082 | `guidelines/pages/sitemap-page.md` | `4425c829cb87df713a4335cecf4df61f04d9258aabd828025f9d597ec056e6ef` | Pointer (observed) | `guidelines/sitemap-navigation.md` | PENDING | preservation/operation approval |
| G083 | `guidelines/parts/Footer.md` | `2e09253e505eb9be36d3180b23baf571ebcb5a519566cb2f3541e2b5e316da0c` | Modified | `guidelines/parts/Footer.md` | PENDING | preservation/operation approval |
| G084 | `guidelines/parts/Header.md` | `7ffd64a11880bcabbdd49db20584ad85802ef1f8f8cc080093e7f7fa82389e0d` | Modified | `guidelines/parts/Header.md` | PENDING | preservation/operation approval |
| G085 | `guidelines/parts/MobileMenu.md` | `cadc93480faa577a8f5f5cd602af742d710d059fb4a31b6cfb679209f5f84b12` | Modified | `guidelines/parts/MobileMenu.md` | PENDING | preservation/operation approval |
| G086 | `guidelines/patterns/CardGridWithFilters.md` | `989d04bf64467b17ca62c719e28fdd495bcdc2c27e2a4d04ac0f198b0fd08cae` | Modified | `guidelines/patterns/CardGridWithFilters.md` | PENDING | preservation/operation approval |
| G087 | `guidelines/performance-optimization-report.md` | `f7d1b5f11b96c349d22bcbc289212228a30912f19550e7154490e6af81c514f6` | Unchanged | `guidelines/performance-optimization-report.md` | PENDING | preservation/operation approval |
| G088 | `guidelines/performance-optimization.md` | `d80a5eb45e4620ee9b93aa1780959ca0abf6862b49ef61ef85b7e5eada9030c0` | Modified | `guidelines/performance-optimization.md` | PENDING | preservation/operation approval |
| G089 | `guidelines/prefers-reduced-motion.md` | `4f706b814203a4ecd95098c861280ef497231bcf74e7dfce15f0efb2a35b07dd` | Pointer (observed) | `guidelines/accessibility-checklist.md` | PENDING | preservation/operation approval |
| G090 | `guidelines/prompt-creation-guidelines.md` | `7eebf4582102d8bda76acecae7a886abacd6eb482472f1061141d8373225ed35` | Modified | `guidelines/prompt-creation-guidelines.md` | PENDING | preservation/operation approval |
| G091 | `guidelines/pwa-implementation.md` | `bbea902623e2e56ef54aa92a8036b98e141bc7742bd7ccef0582149d0f661dac` | Modified | `guidelines/pwa-implementation.md` | PENDING | preservation/operation approval |
| G092 | `guidelines/report-creation-guidelines.md` | `ecfec03d40c8c13b67450948e74ca0c08c922fd282029ea4a11e3413aacb492f` | Modified | `guidelines/report-creation-guidelines.md` | PENDING | preservation/operation approval |
| G093 | `guidelines/responsive/README.md` | `213f7a64c7b5bc305f5d7a70c13ee6ecf854edd54323030fa7bcceabedb842b5` | Modified | `guidelines/responsive/README.md` | PENDING | preservation/operation approval |
| G094 | `guidelines/responsive/breakpoints-system.md` | `3bc5953a3f22161622efdfb7e230ed9082b016c8a1f835223e5614d149871fce` | Pointer (observed) | `guidelines/responsive-design.md` | PENDING | preservation/operation approval |
| G095 | `guidelines/responsive/interaction-modes.md` | `bbc8356dc37654dae8cb8575d8eb8a13aa5baf7ea4efaf4398f43926c7251068` | Pointer (observed) | `guidelines/responsive-design.md` | PENDING | preservation/operation approval |
| G096 | `guidelines/responsive/layout-patterns.md` | `03062d34efb639f2f37430d3078c318111818168930756468ff4fc07e05eaa47` | Pointer (observed) | `guidelines/responsive-design.md` | PENDING | preservation/operation approval |
| G097 | `guidelines/responsive/navigation-responsive.md` | `ab71efb3ddce862863e3433f18681decb197552e7e7a05e47f1654325c72131a` | Pointer (observed) | `guidelines/responsive-design.md` | PENDING | preservation/operation approval |
| G098 | `guidelines/responsive/spacing-adjustments.md` | `e1def711617cecb62935a1b1c4b1594f43b74e61a49b3ae6f46fcf71d9066e18` | Pointer (observed) | `guidelines/responsive-design.md` | PENDING | preservation/operation approval |
| G099 | `guidelines/responsive/typography-scaling.md` | `d975c041b74a6ad394d881d089934e0d49471d883e023541b97be6ca5df6532c` | Pointer (observed) | `guidelines/responsive-design.md` | PENDING | preservation/operation approval |
| G100 | `guidelines/search-system.md` | `5ff590d997444ec4c1006bcc5ae4e9d369a2f78721062497ec537e717e8347d6` | Unchanged | `guidelines/search-system.md` | PENDING | preservation/operation approval |
| G101 | `guidelines/sections/BlogPreviewSection.md` | `185ede2e8aa4b2a53626d1502a6547178f9b315f9de34b8205dd10a215fbe93a` | Modified | `guidelines/sections/BlogPreviewSection.md` | PENDING | preservation/operation approval |
| G102 | `guidelines/sections/FeaturedSection.md` | `630fefe2b000841861a482222aa88aa3ac342148952e3608d77103c4deffe251` | Modified | `guidelines/sections/FeaturedSection.md` | PENDING | preservation/operation approval |
| G103 | `guidelines/sections/HeroSection.md` | `6b8ac23d811f69a45c9aaf7ad84e5a564064824ca53dca7672dab744e9bc2b70` | Modified | `guidelines/sections/HeroSection.md` | PENDING | preservation/operation approval |
| G104 | `guidelines/sections/ThreeColumnLayout.md` | `40051ec77085d36247dbc05a14bdd557a15495ace159a9f00d5b31d61a925b77` | Modified | `guidelines/sections/ThreeColumnLayout.md` | PENDING | preservation/operation approval |
| G105 | `guidelines/sections/ThreeColumnPortfolioSection.md` | `54c87bc59f954d3b2a412aba9b2f2e09094b6f28d99c17c732f4224448673d16` | Modified | `guidelines/sections/ThreeColumnPortfolioSection.md` | PENDING | preservation/operation approval |
| G106 | `guidelines/sections/WhySection.md` | `09732aecd9921104750e59a05fc632f5258e14c1388f9ea556b5d6c97f5cefe9` | Modified | `guidelines/sections/WhySection.md` | PENDING | preservation/operation approval |
| G107 | `guidelines/sitemap-routes.md` | `8bd6c06918963ecc862d0cfdf3b2790cf9f1ea8c22c83348245a57cfe769d0b6` | Pointer (observed) | `guidelines/sitemap-navigation.md` | PENDING | preservation/operation approval |
| G108 | `guidelines/tailwind-to-bem-mapping.md` | `4cd10020bdf0c2f5523b882891b522ea7c102f3f2259efc24b035423763bdb83` | Pointer (observed) | `guidelines/css-architecture-reference.md` | PENDING | preservation/operation approval |
| G109 | `guidelines/templates/HomePage.md` | `bd04868cf7a5d08d40fa3c6e3c2968070104ad07efd1557bfaa9ef32cddf31ee` | Unchanged | `guidelines/templates/HomePage.md` | PENDING | preservation/operation approval |
| G110 | `guidelines/troubleshooting/blog-filtering-issues.md` | `48afaae567a0c33db9b1fe66ab41167bc9e1390168c6d8d9045ef6cc8314a0fd` | Modified | `guidelines/troubleshooting/blog-filtering-issues.md` | PENDING | preservation/operation approval |
| G111 | `guidelines/troubleshooting/css-issues.md` | `0947cac843a902b13d2fd23fa23c8cb9c7ee618eba286f4e1711f30670fd7c1a` | Modified | `guidelines/troubleshooting/css-issues.md` | PENDING | preservation/operation approval |
| G112 | `guidelines/troubleshooting/image-issues.md` | `d3834668446df133e83eadae4e3e4519d2b62d674178a62b597c07990e0c216d` | Modified | `guidelines/troubleshooting/image-issues.md` | PENDING | preservation/operation approval |
| G113 | `guidelines/voice-and-tone.md` | `d47896aaace5a17e9f60a42ef3a204fc055824d7fbb6deaf0051a04da5c312db` | Pointer (observed) | `guidelines/brand-voice-messaging.md` | PENDING | preservation/operation approval |
| G114 | `guidelines/wordpress-block-patterns.md` | `fb86d69eeedd342d962ac2140fd136d2860e36abf78195e8f61fda7cb3c7eda8` | Archived; original absent | `guidelines/_archive/wordpress-block-patterns.md` | PENDING | preservation/operation approval |
| G115 | `guidelines/wordpress-migration-guide.md` | `8bfdd863502ebd95d5e8bc1fede82f20bc1361e86d39714d8aa4cdb8fe4fabc1` | Archived; original absent | `guidelines/_archive/wordpress-migration-guide.md` | PENDING | preservation/operation approval |
| G116 | `guidelines/wordpress-preset-system.md` | `e9b26b2b4be255abfa514c17ecef9a40e5477c0aa9866fa336fad0245602e29b` | Archived; original absent | `guidelines/_archive/wordpress-preset-system.md` | PENDING | preservation/operation approval |

### S-documents (9)

| ID | Path | Current SHA-256 | Observed operation | Destination | Status | Evidence / remaining verification |
| --- | --- | --- | --- | --- | --- | --- |
| S001 | `AGENTS.md` | `3df757be73b2cd48093e0e73b8a3a91f34fbf6ff451f9f9592142b2bf7cebd4b` | Modified | `AGENTS.md` | PENDING | D0 approval/content verification |
| S002 | `CONTRIBUTING.md` | `7f6b1d8a3823917cc5a96905ad127f6ff32ca7425f5e7acdaee64e040ff04c8f` | Modified | `CONTRIBUTING.md` | PENDING | D0 approval/content verification |
| S003 | `.claude/skills/INVENTORY.md` | `9a3922088a74c6755a408e9f01f6335f5e2b03c1945acd9f444a1132af8280bb` | Modified | `.claude/skills/INVENTORY.md` | PENDING | D0 approval/content verification |
| S004 | `.claude/skills/branch-validation/SKILL.md` | `eec2d6edc2204638600c5da2b50f4f4536baaf3eb1dd46fee19784d9812dfaee` | Modified; resolved via symlink | `.claude/skills/branch-validation/SKILL.md` | PENDING | D0 approval/content verification |
| S005 | `.claude/skills/changelog/SKILL.md` | `09ed655ce7aa4ab2633512a9303c4247dfd79a862de814bad94c6da07d1a092f` | Modified; resolved via symlink | `.claude/skills/changelog/SKILL.md` | PENDING | D0 approval/content verification |
| S006 | `.claude/skills/labeling/SKILL.md` | `24ade0e716ade16b9ab9c3e8b71cd8e113cc81d8f401db299c8c8308d7eb67eb` | Modified; resolved via symlink | `.claude/skills/labeling/SKILL.md` | PENDING | D0 approval/content verification |
| S007 | `.claude/skills/test/SKILL.md` | `1740aabb7cde2879c41d121d2c981d7e29e128ba31b44d8298e0a6e618a7e7c3` | Modified; resolved via symlink | `.claude/skills/test/SKILL.md` | PENDING | D0 approval/content verification |
| S008 | `.claude/skills/validate/SKILL.md` | `328cac6f08dd82fd30239f052a5f75194cc098867923edcdf64011ef3c8304e6` | Modified; resolved via symlink | `.claude/skills/validate/SKILL.md` | PENDING | D0 approval/content verification |
| S009 | `.claude/skills/workflow-orchestration/SKILL.md` | `b5b8827d9d48aed8d595be32b4d46eab4f60cc14fd72661b5e9e8f482bdf3ff6` | Modified; resolved via symlink | `.claude/skills/workflow-orchestration/SKILL.md` | PENDING | D0 approval/content verification |

### N-documents (33: 29 approved, 4 deferred)

| ID | Path | Current SHA-256 | Observed operation | Destination | Status | Evidence / remaining verification |
| --- | --- | --- | --- | --- | --- | --- |
| N001 | `guidelines/design-tokens-reference.md` | `bb8ba4df4283ab25d1cd474ae74f2cbe728923b99f257adeb4e72542a6f72a51` | Created | `guidelines/design-tokens-reference.md` | PENDING | content/dependencies/pointer checks |
| N002 | `guidelines/accessibility-checklist.md` | `f799a5031f5665acd95c4b80a2608ee8db30ac0acf0815897f4a4c0c6bb12295` | Created | `guidelines/accessibility-checklist.md` | PENDING | content/dependencies/pointer checks |
| N003 | `guidelines/css-architecture-reference.md` | `b0df84741874e09358f927c96b2e3602801a6e6a7da69dbfc178ea7d54724705` | Created | `guidelines/css-architecture-reference.md` | PENDING | content/dependencies/pointer checks |
| N004 | `guidelines/media-guidelines.md` | `4a63849e6d7a6e4ea2598c21f07465756c1e14bae536bf2f5651bacf888d0620` | Created | `guidelines/media-guidelines.md` | PENDING | content/dependencies/pointer checks |
| N005 | `guidelines/component-catalog.md` | `15c2d9026bc9fa42fb62239a7f4261f9460b2868b4b1edab853a892d34f83982` | Created | `guidelines/component-catalog.md` | PENDING | content/dependencies/pointer checks |
| N006 | `guidelines/brand-voice-messaging.md` | `4dc880253aa9b7de8630eab95cc7289e4bfed503820b9b50160919269867afa3` | Created | `guidelines/brand-voice-messaging.md` | PENDING | content/dependencies/pointer checks |
| N007 | `guidelines/publishing-workflow.md` | `60a3066a235ae8a1f8b765a7cbdc839dd96838baa603bcea21f579978aa4e186` | Created | `guidelines/publishing-workflow.md` | PENDING | content/dependencies/pointer checks |
| N008 | `guidelines/accessibility-recipes.md` | `4b46407ecb9b1ade62f5af0df7dea0fbc39df5c5016321690589c8188343dd41` | Created | `guidelines/accessibility-recipes.md` | PENDING | content/dependencies/pointer checks |
| N009 | `guidelines/responsive-design.md` | `1e749c967aec12b6742d976292f8fbf7f75d69c9d8e06f9fdcb5f48bae4c57cb` | Created | `guidelines/responsive-design.md` | PENDING | content/dependencies/pointer checks |
| N010 | `guidelines/data-architecture.md` | `dce909f683db1a8ac942c2873091cc4f221c6cc098414cf1426ce57448084b96` | Created | `guidelines/data-architecture.md` | PENDING | content/dependencies/pointer checks |
| N011 | `guidelines/content-taxonomy.md` | `df87e237757c5dd7c016b52b982b6b32e0066cdad23c85f204e9792b45f5e7d6` | Created | `guidelines/content-taxonomy.md` | PENDING | content/dependencies/pointer checks |
| N012 | `guidelines/typography-spec.md` | `30b889ea5826735eb63fd8a456a60c38c1b08c378260256df9a44e5a5653d66a` | Created | `guidelines/typography-spec.md` | PENDING | content/dependencies/pointer checks |
| N013 | `guidelines/spacing-grid.md` | `843820218aa50aff37a54e5b0ae99a1972acedeaf2af87b8f296ee69e36d3361` | Created | `guidelines/spacing-grid.md` | PENDING | content/dependencies/pointer checks |
| N014 | `guidelines/color-palette.md` | `453b6915c345eaf678fb844af0f4c59414bd7137c8b99e1b31849783a3a5ad34` | Created | `guidelines/color-palette.md` | PENDING | content/dependencies/pointer checks |
| N015 | `guidelines/interactions-animations.md` | `9b85bd99142cfad574cdd9e676918966053cb53858000cd04d07207f8815cc63` | Created | `guidelines/interactions-animations.md` | PENDING | content/dependencies/pointer checks |
| N016 | `guidelines/testing-strategy.md` | `d762500d9beac4044b469730db8014a8cb6567a5a361f2949dd66bd90f01fa2a` | Created | `guidelines/testing-strategy.md` | PENDING | content/dependencies/pointer checks |
| N017 | `guidelines/performance-optimization.md` | `d80a5eb45e4620ee9b93aa1780959ca0abf6862b49ef61ef85b7e5eada9030c0` | Modified existing | `guidelines/performance-optimization.md` | PENDING | content/dependencies/pointer checks |
| N018 | `guidelines/backend-integration.md` | `ff6ae749a2375aa0d8263822fa386e0ce1263184c783a21031e3289791cb0bc9` | Created | `guidelines/backend-integration.md` | PENDING | content/dependencies/pointer checks |
| N019 | `guidelines/patterns-book-cards.md` | `5253807d763a6c67374d28a5fd372185d922dfe92d288bc513a494362b232e5b` | Created | `guidelines/patterns-book-cards.md` | PENDING | content/dependencies/pointer checks |
| N020 | `guidelines/patterns-hero.md` | `7b83de9953e4246023c3625788ad27737391ff29a1c5caae0230d6f7cb538af0` | Created | `guidelines/patterns-hero.md` | PENDING | content/dependencies/pointer checks |
| N021 | `guidelines/patterns-proposition.md` | `9b8a7c654369069d22f174b16edc9bc05fea79c5267f82684a6b68673df9a738` | Created | `guidelines/patterns-proposition.md` | PENDING | content/dependencies/pointer checks |
| N022 | `guidelines/patterns-journal-preview.md` | `3160341dd6ba4c0a237e13804039dd41baa0c36f16fd57d3eb7548f496d8fa76` | Created | `guidelines/patterns-journal-preview.md` | PENDING | content/dependencies/pointer checks |
| N023 | `guidelines/getting-started.md` | `174b0ccca288eabd7b525918b6454f69a9abd5d973da9f77cdfa1184c10d4aff` | Created | `guidelines/getting-started.md` | PENDING | content/dependencies/pointer checks |
| N024 | `guidelines/homepage-layout.md` | `2c3cc80707018bfef853b8cb45f4bc985fe971c7e92550abd6a05e9cb635294c` | Created | `guidelines/homepage-layout.md` | PENDING | content/dependencies/pointer checks |
| N025 | `guidelines/sitemap-navigation.md` | `b2beefccfac2bd8f7c6f9c81df99df9d2a005ff96f512ef57177f4995fdbfee0` | Created | `guidelines/sitemap-navigation.md` | PENDING | content/dependencies/pointer checks |
| N026 | `guidelines/_archive/accessibility-report-pointer.md` | `a0540c09753ca3a9a04b2ba9c1a58e9f51d453e951f6ebf57f12478483a1ebe2` | Pointer (observed) | `guidelines/accessibility-checklist.md` | PENDING | content/dependencies/pointer checks |
| N027 | `guidelines/_archive/performance-report-pointer.md` | `e855d400a062ba3072b9cafae57103073bb8052d76c015d6282ba05a7a3b7aed` | Pointer (observed) | `guidelines/performance-optimization.md` | PENDING | content/dependencies/pointer checks |
| N028 | `guidelines/_archive/dark-mode-report-pointer.md` | `163168e85d16d2118346cb7f3ecff067d1834d94ae8d4619e2ff2426bb6d4830` | Pointer (observed) | `guidelines/css-architecture-reference.md` | PENDING | content/dependencies/pointer checks |
| N029 | `guidelines/_archive/ARCHIVE-INDEX.md` | `4ad60a6bac549170fff59c4191039ac235e9dec7b84bdd5dd3c1b6f9740a662f` | Created | `guidelines/_archive/ARCHIVE-INDEX.md` | PENDING | content/dependencies/pointer checks |
| N030 | `guidelines/_archive/wordpress-block-patterns.md` | `N/A (deferred)` | Deferred | `guidelines/_archive/wordpress-block-patterns.md` | DEFERRED | Out of scope per D8 (React/Next.js only); creation and file existence not required |
| N031 | `guidelines/_archive/wordpress-migration-guide.md` | `N/A (deferred)` | Deferred | `guidelines/_archive/wordpress-migration-guide.md` | DEFERRED | Out of scope per D8 (React/Next.js only); creation and file existence not required |
| N032 | `guidelines/portfolio-showcase.md` | `N/A (deferred)` | Deferred | `guidelines/portfolio-showcase.md` | DEFERRED | Deferred to Phase 3 per [D8](../checklists/requirements.md#d8-wordpress--portfolio-role-resolved): no portfolio on site; proposed location per D4.a; creation and file existence not required |
| N033 | `guidelines/pwa-implementation.md` | `N/A (deferred)` | Deferred | `guidelines/pwa-implementation.md` | DEFERRED | Deferred to Phase 3 per [D4](../checklists/requirements.md#d4-documentation-destinations--n-document-approvals-resolved--implementation-guidance-recorded): N030–N033 not approved for Phase 2; tech stack not confirmed; proposed location per D4.a; creation and file existence not required |

## Completion checks

- [x] Record 158 distinct entity IDs with paths, hashes (or explicit deferred N/A), operations, destinations and statuses.
- [x] Compare all 116 baseline hashes with the named Git baseline.
- [ ] Verify G-document content preservation, archive history and operation approvals.
- [ ] Verify all nine S-document edits and D0 approval evidence.
- [ ] Verify approved N-document content and dependency resolution.
- [ ] Verify pointer destinations, one-hop chains and archive reverse links.
- [ ] Reconcile final active/archive/pointer counts without counting pointers twice.

**T041/T067 remain PENDING.** This evidence records the current inventory;
completion requires the remaining checks in [requirements.md](../checklists/requirements.md#coverage-manifest--pending-t041-t067)
and [tasks.md](../tasks.md#coverage--completeness).
