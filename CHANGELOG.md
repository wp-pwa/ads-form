## [1.1.2](https://github.com/frontity/ads-form/compare/v1.1.1...v1.1.2) (2018-10-03)


### Bug Fixes

* **styles:** add minicss default styling ([1d037e5](https://github.com/frontity/ads-form/commit/1d037e5))

## [1.1.1](https://github.com/frontity/ads-form/compare/v1.1.0...v1.1.1) (2018-08-16)


### Bug Fixes

* **formats:** dont delete ads.settings ([184a771](https://github.com/frontity/ads-form/commit/184a771))

# [1.1.0](https://github.com/frontity/ads-form/compare/v1.0.1...v1.1.0) (2018-08-16)


### Bug Fixes

* **index:** fix users not getting their sites now that users are arrays ([3e398a7](https://github.com/frontity/ads-form/commit/3e398a7))
* **types:** add up to 30 posts ([9d63b2b](https://github.com/frontity/ads-form/commit/9d63b2b))
* **validators:** zero should be an allowed number ([3ee7fab](https://github.com/frontity/ads-form/commit/3ee7fab))


### Features

* **graphql:** users are now an array in graphql ([be67e1d](https://github.com/frontity/ads-form/commit/be67e1d))

## [1.0.1](https://github.com/frontity/ads-form/compare/v1.0.0...v1.0.1) (2018-08-16)


### Bug Fixes

* **types:** add more content positions ([9174145](https://github.com/frontity/ads-form/commit/9174145))

# 1.0.0 (2018-08-14)


### Bug Fixes

* **ad-card:** add type by default ([083d456](https://github.com/frontity/ads-form/commit/083d456))
* **ad-card:** fix remove button ([c6a6a23](https://github.com/frontity/ads-form/commit/c6a6a23))
* **ad-card:** fix state initialization ([056db35](https://github.com/frontity/ads-form/commit/056db35))
* **ad-form:** remove some react warnings ([a19b103](https://github.com/frontity/ads-form/commit/a19b103))
* **ad-form:** send correct values to graphcool ([1f20ec6](https://github.com/frontity/ads-form/commit/1f20ec6))
* **ad-positions:** fix state initialization ([b5b7e44](https://github.com/frontity/ads-form/commit/b5b7e44))
* **formats:** allow ads without positions ([30ecb9b](https://github.com/frontity/ads-form/commit/30ecb9b))
* **formats:** custom was renamed to customPostType ([94ae9d2](https://github.com/frontity/ads-form/commit/94ae9d2))
* **formats:** initialize 'ads' parameter in 'postLoadFormat' function ([0c19938](https://github.com/frontity/ads-form/commit/0c19938))
* **graphcool:** add email-password template ([86ffb09](https://github.com/frontity/ads-form/commit/86ffb09))
* **graphcool:** commit before upgrade ([b8d10e7](https://github.com/frontity/ads-form/commit/b8d10e7))
* **index:** remove some react warnings ([2210974](https://github.com/frontity/ads-form/commit/2210974))
* **position:** fix style of type selector ([33ce453](https://github.com/frontity/ads-form/commit/33ce453))
* **positions:** bug where checkboxes where unselected after saving ([d17c016](https://github.com/frontity/ads-form/commit/d17c016))
* **positions:** change custom to customPostType ([c254b20](https://github.com/frontity/ads-form/commit/c254b20))
* **positions:** overwrite position when changing type ([ab0535b](https://github.com/frontity/ads-form/commit/ab0535b))
* **signup:** modify handlers to include name ([4359eb5](https://github.com/frontity/ads-form/commit/4359eb5))
* **singin:** fix react component so we can sign in again ([3714c58](https://github.com/frontity/ads-form/commit/3714c58))
* **singup:** fix react component so we can sign up again ([577bfc6](https://github.com/frontity/ads-form/commit/577bfc6))
* **site:** fix warning ([6d9992d](https://github.com/frontity/ads-form/commit/6d9992d))
* **slots:** update slot strings to match saturn ([aabb166](https://github.com/frontity/ads-form/commit/aabb166))
* **text-input:** avoid warnings in TextInput comonent ([1228687](https://github.com/frontity/ads-form/commit/1228687))


### Build System

* **now:** add alias to now configuration ([44a1098](https://github.com/frontity/ads-form/commit/44a1098))


### Features

* **ad-card:** show pointer when cursor is over ToggleContent button ([5b4e42b](https://github.com/frontity/ads-form/commit/5b4e42b))
* **ad-form:** adapt data format to database ([f0aef2b](https://github.com/frontity/ads-form/commit/f0aef2b))
* **ad-form:** add options according to the ad type and better style ([ecac75f](https://github.com/frontity/ads-form/commit/ecac75f))
* **ad-form:** add some validation and improve style ([faf550f](https://github.com/frontity/ads-form/commit/faf550f))
* **ad-form:** add styles and sortable behaviour ([0e28c5f](https://github.com/frontity/ads-form/commit/0e28c5f))
* **ad-form:** create AdForm component ([140f0bd](https://github.com/frontity/ads-form/commit/140f0bd))
* **ad-form:** create type media and change position numbers by strings ([10bd0bb](https://github.com/frontity/ads-form/commit/10bd0bb))
* **ad-form:** persist other data than 'ads' ([f106231](https://github.com/frontity/ads-form/commit/f106231))
* **ad-form:** submit changes ([fec5cf9](https://github.com/frontity/ads-form/commit/fec5cf9))
* **ad-options:** define options for AdSense and DoubleClick ([774e7a1](https://github.com/frontity/ads-form/commit/774e7a1))
* **ad-positions:** add remove button ([c2e868b](https://github.com/frontity/ads-form/commit/c2e868b))
* **ad-positions:** create AdPositions component ([c88930f](https://github.com/frontity/ads-form/commit/c88930f))
* **ad-positions:** support custom post types ([6139a3e](https://github.com/frontity/ads-form/commit/6139a3e))
* **app:** add viewport meta tag ([af7565a](https://github.com/frontity/ads-form/commit/af7565a))
* **graphcool.yml:** define a hook that add settings to new sites ([27d42bc](https://github.com/frontity/ads-form/commit/27d42bc))
* **index.js:** show sites owned by user ([17263f4](https://github.com/frontity/ads-form/commit/17263f4))
* **init-settings:** add connection settings after create a new site ([b3f3d40](https://github.com/frontity/ads-form/commit/b3f3d40))
* **select-input:** create SelectInput component ([fb3cc87](https://github.com/frontity/ads-form/commit/fb3cc87))
* **site.js:** create page `site` ([9c4244e](https://github.com/frontity/ads-form/commit/9c4244e))
* **styled-components:** add SSR ([c2b22cf](https://github.com/frontity/ads-form/commit/c2b22cf))
* **sun-media:** add SunMedia ads ([b99177b](https://github.com/frontity/ads-form/commit/b99177b))
* **text-input:** show green border when validator passes ([d2c428b](https://github.com/frontity/ads-form/commit/d2c428b))
* **types.graphql:** add field `role` to the type `User` ([3226508](https://github.com/frontity/ads-form/commit/3226508))
* **types.graphql:** add model `Site` ([abea9ff](https://github.com/frontity/ads-form/commit/abea9ff))
* **types.graphql:** add models `Package` and `Setting` ([cdc783c](https://github.com/frontity/ads-form/commit/cdc783c))


### BREAKING CHANGES

* **now:** first version finished
