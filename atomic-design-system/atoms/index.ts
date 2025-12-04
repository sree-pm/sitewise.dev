// ============ TEXT ATOMS ============
export * from './text';
export { Text, GradientText, BadgeText } from './text';

// ============ LAYOUT ATOMS ============
export * from './layout';
export {
  Spacer,
  Divider,
  Container,
  FlexBox,
  Grid,
  AspectRatio,
  Stack,
  Surface,
} from './layout';

// ============ EXISTING ATOMS ============
export * from './button';
export * from './badge';
export * from './shortcut';
export * from './techicons';

// ============ FORM CONTROL ATOMS ============
export * from './checkbox';
export { Checkbox, CheckboxGroup } from './checkbox';

export * from './radio';
export { Radio, RadioGroup, RadioCard } from './radio';

export * from './toggle';
export { Toggle, ToggleGroup } from './toggle';

export * from './select';
export { Select, CustomSelect } from './select';

export * from './fileupload';
export { FileUpload, FileUploadDropzone, FileUploadButton, FileUploadAvatar } from './fileupload';

export * from './slider';
export { Slider, RangeSlider } from './slider';

export * from './textarea';
export { Textarea, AutoResizeTextarea } from './textarea';

export * from './datepicker';
export { DatePicker, DateRangePicker } from './datepicker';

export * from './timepicker';
export { TimePicker } from './timepicker';

export * from './colorpicker';
export { ColorPicker } from './colorpicker';

export * from './rating';
export { Rating, LabeledRating, EmojiRating } from './rating';

export * from './otpinput';
export { OTPInput, OTPInputWithTimer } from './otpinput';

export * from './passwordinput';
export { PasswordInput } from './passwordinput';

export * from './searchinput';
export { SearchInput, SearchWithSuggestions } from './searchinput';

export * from './numberinput';
export { NumberInput, CurrencyInput, PercentageInput } from './numberinput';

// ============ LEGACY INPUT ATOMS (DEPRECATED) ============
export * from './inputs';
export {
  Input,
  Loader,
  ProgressBar,
} from './inputs';

// ============ FEEDBACK ATOMS ============
export * from './alert';
export { Alert } from './alert';

export * from './toast';
export { Toast, ToastContainer, useToast } from './toast';

export * from './spinner';
export { Spinner, DotsSpinner, PulseSpinner, FullPageSpinner } from './spinner';

export * from './skeleton';
export { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard, SkeletonTable, SkeletonList } from './skeleton';

export * from './tooltip';
export { Tooltip, SimpleTooltip } from './tooltip';

export * from './avatar';
export { Avatar, AvatarGroup } from './avatar';

export * from './progress';
export { Progress, CircularProgress, StatusDot } from './progress';

// ============ DISPLAY ATOMS (PHASE 2) ============
export * from './icon';
export { Icon, IconButton, CloseButton } from './icon';

export * from './image';
export { Image, AvatarImage, LogoImage } from './image';

export * from './video';
export { Video, SimpleVideo } from './video';

export * from './codeblock';
export { CodeBlock, InlineCode } from './codeblock';

export * from './kbd';
export { Kbd, KeyboardShortcut, PlatformShortcut } from './kbd';

export * from './link';
export { Link as AtomLink, NavLink, BreadcrumbLink, SocialLink } from './link';

// ============ INTERACTIVE ATOMS (PHASE 2) ============
export * from './modal';
export { Modal, ConfirmDialog } from './modal';

export * from './tabs';
export { Tabs, VerticalTabs } from './tabs';

export * from './accordion';
export { Accordion, FAQAccordion } from './accordion';

export * from './drawer';
export { Drawer, SimpleDrawer } from './drawer';

export * from './popover';
export { Popover, MenuPopover } from './popover';

export * from './dropdown';
export { Dropdown, MultiDropdown } from './dropdown';

export * from './breadcrumbs';
export { Breadcrumbs, SimpleBreadcrumbs } from './breadcrumbs';

export * from './pagination';
export { Pagination, SimplePagination } from './pagination';

export * from './audio';
export { Audio, SimpleAudio } from './audio';

export * from './timeline';
export { Timeline, ProcessTimeline } from './timeline';

export * from './chart';
export { Chart, SimpleChart } from './chart';

export * from './typography';
export { Heading, Paragraph, Blockquote, Caption, Label, Code, Strong, Em, Small, Mark } from './typography';

export * from './table';
export { Table, SimpleTable } from './table';

export * from './list';
export { List, OrderedList, UnorderedList, DescriptionList } from './list';

// Phase 4 - Foundational Atoms
export * from './chip';
export { Chip, ChipGroup } from './chip';

export * from './stepper';
export { Stepper, VerticalStepper } from './stepper';

export * from './switch';
export { Switch, SwitchGroup } from './switch';

export * from './divider';
export { Divider, SectionDivider } from './divider';

export * from './container-grid';
export { Container, Grid, GridItem, Section } from './container-grid';

// Phase 5 - Advanced Form & Navigation Atoms
export * from './autocomplete';
export { Autocomplete } from './autocomplete';

export * from './transfer-list';
export { TransferList } from './transfer-list';

export * from './menu';
export { Menu, ContextMenu } from './menu';

export * from './command-palette';
export { CommandPalette } from './command-palette';

// Phase 6 - Enhanced Feedback Atoms
export * from './empty-state';
export { EmptyState, LoadingOverlay, StateMessage } from './empty-state';

export * from './notification';
export { NotificationProvider, useNotification, SnackbarProvider, useSnackbar } from './notification';

// Phase 7 - Utility Atoms
export * from './utilities';
export {
  Portal,
  FocusTrap,
  ClickOutside,
  ResizeObserverComponent,
  useResizeObserver,
  IntersectionObserverComponent,
  useIntersectionObserver,
  useMediaQuery,
  MediaQuery
} from './utilities';

// Phase 5-6 Completion - Advanced Inputs & Navigation
export * from './mention-input';
export { MentionInput } from './mention-input';

export * from './phone-input';
export { PhoneInput } from './phone-input';

export * from './address-input';
export { AddressInput } from './address-input';

export * from './credit-card-input';
export { CreditCardInput } from './credit-card-input';

export * from './navigation-bar';
export { NavigationBar } from './navigation-bar';

export * from './bottom-navigation';
export { BottomNavigation } from './bottom-navigation';

export * from './confetti';
export { Confetti } from './confetti';
