export declare enum CodeType {
    HTML = "HTML",
    REACT = "REACT"
}
export declare enum AIModelProvider {
    GEMINI = "GEMINI",
    QWEN = "QWEN"
}
export declare class ColorSchemeDto {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
}
export declare class GenerateWebsiteDto {
    companyName: string;
    industry: string;
    websiteType: string;
    designStyle: string;
    colorScheme: ColorSchemeDto;
    codeType?: CodeType;
    aiModel?: AIModelProvider;
}
export interface GenerationProgress {
    projectId: string;
    status: 'processing' | 'validating' | 'completed' | 'failed';
    progress: number;
    currentStep: string;
    message: string;
    files?: Record<string, string>;
    error?: string;
}
export declare class EditIntentDto {
    projectId: string;
    instruction: string;
    targetFile?: string;
}
