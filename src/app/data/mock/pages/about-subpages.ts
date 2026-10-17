/**
 * @fileoverview Barrel re-export for all About sub-page data files.
 *
 * Original monolithic file (1,871 lines) split into per-subpage modules
 * under /data/mock/pages/about/ as part of T17 (memory reduction).
 *
 * @module data/mock/pages/about-subpages
 * @version 2.0.0
 */

/* ── Shared types ── */
export type { AboutSubpageSection, AboutSubpageData, BreadcrumbItem } from './about/types';

/* ── Page-specific types ── */
export type { BookChapterPreview, BookPageData } from './about/book';
export type { BioFact, BioPageData } from './about/bio';
export type { ProcessStep, ProcessPageData } from './about/process';
export type { TravelDestination, TravelsPageData } from './about/travels';
export type { PodcastEpisodePreview, PodcastPageData } from './about/podcast';
export type { EbookChapterSample, EbookPageData } from './about/ebook';
export type { AdhdFact, AdhdPageData } from './about/adhd';
export type { NotableRide, KitItem, CyclingPageData } from './about/cycling';
export type { AquariusTrait, AquariusThread, AquariusPageData } from './about/aquarius';
export type { MusicArtist, MusicGroup, PlaylistCardData, SoundcloudCategory, MusicPageData } from './about/music';
export type { LightSpeedTeamMember, LightSpeedStat, LightSpeedKeyPerson, LightSpeedMilestone, LightSpeedLesson, LightSpeedPageData } from './about/lightspeed';
export type { EducationEntry, EducationStat, EducationPageData } from './about/education';
export type { PartnersPageData } from './about/partners';
export type { FitnessSport, FitnessStat, FitnessTrainingDetail, FitnessIntersection, FitnessPageData } from './about/fitness';
export type { ResourceTip, ResourceBrand, ResourceKitCategory, ResourcesPageData } from './about/resources';

/* ── Data re-exports ── */
export { berlinPageData } from './about/berlin';
export { bookPageData } from './about/book';
export { bioPageData } from './about/bio';
export { processPageData } from './about/process';
export { lucyPageData } from './about/lucy';
export { travelsPageData } from './about/travels';
export { podcastPageData } from './about/podcast';
export { ebookPageData } from './about/ebook';
export { adhdPageData } from './about/adhd';
export { cyclingPageData } from './about/cycling';
export { aquariusPageData } from './about/aquarius';
export { musicPageData } from './about/music';
export { lightspeedPageData } from './about/lightspeed';
export { educationPageData } from './about/education';
export { partnersPageData } from './about/partners';
export { fitnessPageData } from './about/fitness';
export { resourcesPageData } from './about/resources';