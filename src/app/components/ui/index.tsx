/**
 * @fileoverview Barrel export file for UI components
 * 
 * Centralizes exports for all UI components to enable cleaner imports
 * across the application.
 * 
 * Usage:
 * ```tsx
 * // Before
 * import { Breadcrumbs } from './Breadcrumbs';
 * import { Button } from './button';
 * 
 * // After
 * import { Breadcrumbs, Button } from './';
 * ```
 * 
 * @version 1.0.0
 * @created 2026-03-11
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CUSTOM UI COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { Accordion } from './Accordion';
export { ArchiveFilters } from './ArchiveFilters';
export { Breadcrumbs } from './Breadcrumbs';
export { ChapterNav } from './ChapterNav';
export { ColorCopyButton } from './ColorCopyButton';
export { EbookSettingsModal } from './EbookSettingsModal';
export { EnhancedLightbox } from './EnhancedLightbox';
export { Hero } from './Hero';
export { ImageGallery } from './ImageGallery';
export { OptimizedImage } from './OptimizedImage';
export { PaletteDemoModal } from './PaletteDemoModal';
export { PaletteNavigation } from './PaletteNavigation';
export { PortfolioCard } from './PortfolioCard';
export { PortfolioImage } from './PortfolioImage';
export { PullQuote } from './PullQuote';
export { ReadMoreButton } from './ReadMoreButton';
export { ResponsiveGridSlider } from './ResponsiveGridSlider';
export { ScrollDownArrow } from './ScrollDownArrow';
export { ScrollToTop } from './ScrollToTop';
export { SearchInput } from './SearchInput';
export { SectionCard } from './SectionCard';
export { ShareComponent } from './ShareComponent';
export { SliderCard } from './SliderCard';
export { StatCard } from './StatCard';
export { StickerLightbox } from './StickerLightbox';
export { Timeline } from './Timeline';
export { VideoPlayer } from './VideoPlayer';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SHADCN/UI PRIMITIVE COMPONENTS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { Alert, AlertDescription, AlertTitle } from './alert';
export { AlertDialog } from './alert-dialog';
export { AspectRatio } from './aspect-ratio';
export { Avatar, AvatarImage, AvatarFallback } from './avatar';
export { Badge, badgeVariants } from './badge';
export { Breadcrumb } from './breadcrumb';
export { Button, buttonVariants } from './button';
export { Calendar } from './calendar';
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './card';
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './carousel';
export { Chart } from './chart';
export { Checkbox } from './checkbox';
export { Collapsible, CollapsibleTrigger, CollapsibleContent } from './collapsible';
export { Command } from './command';
export { ContextMenu } from './context-menu';
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from './dialog';
export { Drawer } from './drawer';
export { DropdownMenu } from './dropdown-menu';
export { Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField } from './form';
export { HoverCard, HoverCardTrigger, HoverCardContent } from './hover-card';
export { Input } from './input';
export { InputOTP } from './input-otp';
export { Label } from './label';
export { Menubar } from './menubar';
export { NavigationMenu } from './navigation-menu';
export { Pagination } from './pagination';
export { Popover, PopoverTrigger, PopoverContent } from './popover';
export { Progress } from './progress';
export { RadioGroup, RadioGroupItem } from './radio-group';
export { Resizable } from './resizable';
export { ScrollArea } from './scroll-area';
export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './select';
export { Separator } from './separator';
export { Sheet } from './sheet';
export { Sidebar } from './sidebar';
export { Skeleton } from './skeleton';
export { Slider } from './slider';
export { Sonner } from './sonner';
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './table';
export { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs';
export { Textarea } from './textarea';
export { Toggle } from './toggle';
export { ToggleGroup } from './toggle-group';
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './tooltip';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HOOKS AND UTILITIES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export { useMobile } from './use-mobile';
export { cn } from './utils';
