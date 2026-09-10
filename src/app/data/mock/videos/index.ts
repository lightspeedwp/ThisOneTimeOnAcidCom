/**
 * @fileoverview Barrel export for video mock data
 * @module data/mock/videos
 * @version 3.0.0 - Restructured from single file into directory
 */

export { videos, featuredVideo } from './entries';
export { videoCategories } from './categories';
export { videoTags, videoTagNameToSlug, findVideoTagBySlug } from './tags';
