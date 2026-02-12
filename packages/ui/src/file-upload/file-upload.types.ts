/**
 * File upload size.
 */
export type FileUploadSize = "small" | "medium" | "large";

/**
 * Validation failure reason.
 */
export type FileUploadInvalidReason = "type" | "size" | "count";

/**
 * Invalid file entry emitted on validation failure.
 */
export interface FileUploadInvalidEntry {
  file: File;
  reason: FileUploadInvalidReason;
}

/**
 * Props for the FileUpload component.
 *
 * A custom file upload component with drag-and-drop, validation,
 * file list with remove, and optional preview.
 *
 * @interface FileUploadProps
 */
export interface FileUploadProps {
  /**
   * Bound files (v-model). Single file or array when multiple.
   */
  modelValue?: File | File[] | null;

  /**
   * Allow multiple files.
   */
  multiple?: boolean;

  /**
   * Accepted MIME types or extensions (e.g. `image/*`, `.pdf`, `application/pdf`).
   */
  accept?: string;

  /**
   * Maximum file size in bytes.
   */
  maxSize?: number;

  /**
   * Minimum file size in bytes.
   */
  minSize?: number;

  /**
   * Maximum number of files when multiple is true.
   */
  maxFiles?: number;

  /**
   * Disabled state.
   */
  disabled?: boolean;

  /**
   * Label for the upload area.
   */
  label?: string;

  /**
   * Helper text below the upload area.
   */
  helpText?: string;

  /**
   * Error message when validation fails.
   */
  invalidText?: string;

  /**
   * Show image previews for image files.
   */
  showPreview?: boolean;

  /**
   * Drop zone size (small, medium, large).
   *
   * @default "medium"
   */
  size?: FileUploadSize;
}
