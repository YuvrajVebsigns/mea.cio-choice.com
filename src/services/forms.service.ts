import { apiFetch } from './apiFetch';

export enum FormFieldType {
  SINGLE_INPUT = 'single_input',
  PARAGRAPH = 'paragraph',
  EMAIL = 'email',
  PHONE = 'phone',
  NUMBER = 'number',
  SINGLE_SELECT = 'single_select',
  RADIO = 'radio',
  MULTIPLE_CHOICE = 'multiple_choice',
  DATE = 'date',
}

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customErrorMessage?: string;
}

export interface FormQuestionPublic {
  key: string;
  label: string;
  description?: string;
  placeholder?: string;
  type: FormFieldType;
  options?: FormFieldOption[];
  validation?: FormValidationRules;
  order?: number;
  width?: 'full' | 'half';
}

export interface PublicCustomForm {
  id: string;
  name: string;
  slug: string;
  description?: string;
  settings: {
    submitButtonText?: string;
    successMessage?: string;
    redirectUrl?: string;
    captchaEnabled?: boolean;
  };
  questions: FormQuestionPublic[];
}

export interface FormSubmitPayload {
  answers: Record<string, unknown>;
  captchaToken?: string;
}

export const websiteFormsService = {
  getFormBySlug: async (slug: string): Promise<PublicCustomForm> => {
    return apiFetch<PublicCustomForm>(`/website/forms/${slug}`, {
      requireAuth: false,
    });
  },

  submitForm: async (
    slug: string,
    payload: FormSubmitPayload,
  ): Promise<{ success: boolean; message: string; submissionId?: string }> => {
    return apiFetch<{ success: boolean; message: string; submissionId?: string }>(
      `/website/forms/${slug}/submit`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        requireAuth: false,
      },
    );
  },
};
