// ─── Backend Utilities ───────────────────────────────
export function asyncHandler(fn: Function): Function;
export function paginate(model: any, query: object, options?: {
  page?: number;
  limit?: number;
  sort?: string;
  populate?: object;
}): Promise<any>;

export class ApiError extends Error {
  constructor(statusCode: number, message: string);
  statusCode: number;
}

export class ApiResponse {
  constructor(statusCode: number, data: any, message?: string);
  statusCode: number;
  data: any;
  message: string;
}

export function generateToken(userId: string, role?: string): string;
export function generateOTP(): string;
export function randomString(length?: number): string;
export function slugify(text: string): string;
export function capitalize(text: string): string;
export function capitalizeWords(text: string): string;
export function formatDate(date: Date | string): string;
export function timeAgo(date: Date | string): string;
export function pick(obj: object, keys: string[]): object;
export function exclude(obj: object, keys: string[]): object;
export function isEmptyObject(obj: object): boolean;
export function calculatePagination(total: number, page: number, limit: number): object;
export function validateEnv(keys: string[]): void;

// ─── Cloudinary ──────────────────────────────────────
export function uploadToCloudinary(
  buffer: Buffer, originalName: string, mimeType: string, folder?: string
): Promise<{ url: string; publicId: string; name: string }>;

export function uploadImageToCloudinary(
  buffer: Buffer, originalName: string, mimeType: string, folder?: string
): Promise<{ url: string; publicId: string; name: string }>;

export function deleteFromCloudinary(publicId: string, resourceType?: string): Promise<void>;
export function getCloudinary(): any;

// ─── Razorpay ────────────────────────────────────────
export function createOrder(amount: number, currency?: string): Promise<any>;
export function verifyPayment(orderId: string, paymentId: string, signature: string): boolean;
export function getRazorpay(): any;

// ─── Brevo ───────────────────────────────────────────
export function sendBrevo(to: string, subject: string, html: string): Promise<void>;
export function sendOTPBrevo(to: string, otp: string): Promise<void>;
export function sendWelcomeBrevo(to: string, name: string): Promise<void>;

// ─── Gmail ───────────────────────────────────────────
export function sendGmail(to: string, subject: string, html: string): Promise<void>;
export function sendOTPGmail(to: string, otp: string): Promise<void>;
export function sendWelcomeGmail(to: string, name: string): Promise<void>;

// ─── Frontend Hooks ──────────────────────────────────
export function useApi(baseURL: string): {
  get: (url: string, config?: object) => Promise<any>;
  post: (url: string, data?: object, config?: object) => Promise<any>;
  put: (url: string, data?: object, config?: object) => Promise<any>;
  patch: (url: string, data?: object, config?: object) => Promise<any>;
  del: (url: string, config?: object) => Promise<any>;
};

export function configureApi(config: {
  baseURL: string;
  token?: string;
  withCredentials?: boolean;
}): void;

export function clearToken(): void;
export function updateToken(token: string): void;

export function ApiProvider(props: {
  baseURL: string;
  children: any;
  token?: string;
  withCredentials?: boolean;
}): any;

export function useFetch(url: string): {
  data: any;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

export function useDebounce(fn: Function, delay?: number): Function;

export function useOptimistic(initialData: any[]): {
  data: any[];
  optimisticUpdate: (id: string, newData: object | null, apiFn: Function) => Promise<void>;
};

export function useInfiniteScroll(url: string, setState: Function, limit?: number): {
  loading: boolean;
  hasMore: boolean;
  lastElementRef: any;
};

export function useToggle(initial?: boolean): {
  state: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export function useClickOutside(onClose: Function, options?: object): {
  ref: any;
};
